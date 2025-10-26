package generator

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

type FieldInfo struct {
	Name     string
	Type     string
	Optional bool
}

type ModelInfo struct {
	Name   string
	Fields []FieldInfo
}

// Extract model info from Prisma schema
func ExtractModelFromSchema(schemaPath string, modelName string) (*ModelInfo, error) {
	file, err := os.Open(schemaPath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	inModel := false
	modelInfo := &ModelInfo{Name: modelName}

	// Regex patterns
	modelPattern := regexp.MustCompile(`^model\s+` + modelName + `\s*{`)
	fieldPattern := regexp.MustCompile(`^\s*(\w+)\s+(\w+)(\??)`)

	for scanner.Scan() {
		line := scanner.Text()

		// Check if entering target model
		if modelPattern.MatchString(line) {
			inModel = true
			continue
		}

		// Check if leaving model
		if inModel && strings.TrimSpace(line) == "}" {
			break
		}

		// Extract fields
		if inModel {
			matches := fieldPattern.FindStringSubmatch(line)
			if len(matches) >= 3 {
				fieldName := matches[1]
				fieldType := matches[2]
				optional := matches[3] == "?"

				// Skip relation fields (capitalized type names)
				if fieldType[0] >= 'A' && fieldType[0] <= 'Z' {
					continue
				}

				// Skip @@id, @@map, etc.
				if strings.HasPrefix(fieldName, "@@") {
					continue
				}

				tsType := prismaTypeToTS(fieldType)
				modelInfo.Fields = append(modelInfo.Fields, FieldInfo{
					Name:     fieldName,
					Type:     tsType,
					Optional: optional,
				})
			}
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return modelInfo, nil
}

func prismaTypeToTS(prismaType string) string {
	switch prismaType {
	case "String":
		return "string"
	case "Int":
		return "number"
	case "Float", "Decimal":
		return "number"
	case "Boolean":
		return "boolean"
	case "DateTime":
		return "Date | string"
	case "Json":
		return "any"
	default:
		return "any"
	}
}

func (g *Generator) GenerateServiceWithTypes(model Model, basePath string, schemaPath string) error {
	config, exists := modelConfigs[model]
	if !exists {
		return fmt.Errorf("model config not found for %s", model)
	}

	// Extract model info from schema
	modelInfo, err := ExtractModelFromSchema(schemaPath, string(model))
	if err != nil {
		return fmt.Errorf("failed to extract model info: %w", err)
	}

	g.sb.Reset()

	modelKebab := toKebabCase(string(model))
	modelCamel := toPrismaCamelCase(string(model))

	// Generate interface with actual fields
	g.sb.WriteString(fmt.Sprintf(`// lib/services/%s.service.ts

export interface %s {
`, modelKebab, modelInfo.Name))

	for _, field := range modelInfo.Fields {
		optional := ""
		if field.Optional {
			optional = "?"
		}
		g.sb.WriteString(fmt.Sprintf("  %s%s: %s\n", field.Name, optional, field.Type))
	}

	g.sb.WriteString(`}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

`)

	// Rest of service generation (same as before)
	hasCompositeKey := len(config.CompositeKey) > 0
	pkField := config.PrimaryKey
	pkType := "string"

	g.sb.WriteString(fmt.Sprintf(`class %sService {
  private baseUrl = '/api/%s'

  async getAll(): Promise<%s[]> {
    const response = await fetch(this.baseUrl)
    if (!response.ok) throw new Error('Failed to fetch')
    const result: ApiResponse<%s[]> = await response.json()
    return result.data || []
  }
`, modelInfo.Name, modelKebab, modelInfo.Name, modelInfo.Name))

	if !hasCompositeKey && pkField != "" {
		// Find the type of primary key field
		for _, field := range modelInfo.Fields {
			if field.Name == pkField {
				pkType = field.Type
				break
			}
		}

		g.sb.WriteString(fmt.Sprintf(`
  async getById(%s: %s): Promise<%s> {
    const response = await fetch(${"${this.baseUrl}/${%s}"})
    if (!response.ok) throw new Error('Failed to fetch')
    const result: ApiResponse<%s> = await response.json()
    if (!result.data) throw new Error('Not found')
    return result.data
  }

  async create(data: %s): Promise<%s> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create')
    }
    const result: ApiResponse<%s> = await response.json()
    if (!result.data) throw new Error('Failed to create')
    return result.data
  }

  async update(%s: %s, data: Partial<%s>): Promise<%s> {
    const response = await fetch(${"${this.baseUrl}/${%s}"}, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update')
    }
    const result: ApiResponse<%s> = await response.json()
    if (!result.data) throw new Error('Failed to update')
    return result.data
  }

  async delete(%s: %s): Promise<void> {
    const response = await fetch(${"${this.baseUrl}/${%s}"}, {
      method: 'DELETE',
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to delete')
    }
  }
`, pkField, pkType, modelInfo.Name, pkField, modelInfo.Name,
			modelInfo.Name, modelInfo.Name, modelInfo.Name,
			pkField, pkType, modelInfo.Name, modelInfo.Name, pkField,
			modelInfo.Name, pkField, pkType, pkField))
	} else {
		g.sb.WriteString(fmt.Sprintf(`
  async create(data: %s): Promise<%s> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create')
    }
    const result: ApiResponse<%s> = await response.json()
    if (!result.data) throw new Error('Failed to create')
    return result.data
  }
`, modelInfo.Name, modelInfo.Name, modelInfo.Name))
	}

	g.sb.WriteString(fmt.Sprintf(`}

export const %sService = new %sService()
`, modelCamel, modelInfo.Name))

	// Write file
	servicesDir := filepath.Join(basePath, "lib", "services")
	if err := os.MkdirAll(servicesDir, 0755); err != nil {
		return err
	}

	filename := filepath.Join(servicesDir, fmt.Sprintf("%s.service.ts", modelKebab))
	if err := os.WriteFile(filename, []byte(g.sb.String()), 0644); err != nil {
		return err
	}

	fmt.Printf("✓ Generated service with types for %s\n", model)
	return nil
}
