package generator

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type Model string

const (
	KhachHang    Model = "KhachHang"
	BoPhan       Model = "BoPhan"
	NhomQuyen    Model = "NhomQuyen"
	NhanVien     Model = "NhanVien"
	QuanLy       Model = "QuanLy"
	LoaiPhong    Model = "LoaiPhong"
	KieuPhong    Model = "KieuPhong"
	HangPhong    Model = "HangPhong"
	GiaHangPhong Model = "GiaHangPhong"
	AnhHangPhong Model = "AnhHangPhong"
	TrangThai    Model = "TrangThai"
	Phong        Model = "Phong"
	TienNghi     Model = "TienNghi"
	CTTienNghi   Model = "CtTienNghi"
	KhuyenMai    Model = "KhuyenMai"
	CTKhuyenMai  Model = "CtKhuyenMai"
	PhieuDat     Model = "PhieuDat"
	CTPhieuDat   Model = "CtPhieuDat"
	PhieuThue    Model = "PhieuThue"
	CTPhieuThue  Model = "CtPhieuThue"
	HoaDon       Model = "HoaDon"
	CTKhachO     Model = "CtKhachO"
	DoiPhong     Model = "DoiPhong"
	DichVu       Model = "DichVu"
	GiaDichVu    Model = "GiaDichVu"
	CTDichVu     Model = "CtDichVu"
	PhuThu       Model = "PhuThu"
	GiaPhuThu    Model = "GiaPhuThu"
	CTPhuThu     Model = "CtPhuThu"
)

type ModelConfig struct {
	Model        Model
	PrimaryKey   string   // Single primary key field
	CompositeKey []string // Composite primary key fields
	RouteParam   string   // URL parameter name
}

type Generator struct {
	sb strings.Builder
}

type GenerateRequest struct {
	Models          []Model
	Path            string
	GenerateService bool // Generate service files
}

// Model configurations with primary key info
var modelConfigs = map[Model]ModelConfig{
	KhachHang:    {Model: KhachHang, PrimaryKey: "cccd", RouteParam: "cccd"},
	BoPhan:       {Model: BoPhan, PrimaryKey: "idBp", RouteParam: "id"},
	NhomQuyen:    {Model: NhomQuyen, PrimaryKey: "idNq", RouteParam: "id"},
	NhanVien:     {Model: NhanVien, PrimaryKey: "idNv", RouteParam: "id"},
	LoaiPhong:    {Model: LoaiPhong, PrimaryKey: "idLp", RouteParam: "id"},
	KieuPhong:    {Model: KieuPhong, PrimaryKey: "idKp", RouteParam: "id"},
	HangPhong:    {Model: HangPhong, PrimaryKey: "idHangPhong", RouteParam: "id"},
	AnhHangPhong: {Model: AnhHangPhong, PrimaryKey: "idAnhHangPhong", RouteParam: "id"},
	TrangThai:    {Model: TrangThai, PrimaryKey: "idTt", RouteParam: "id"},
	Phong:        {Model: Phong, PrimaryKey: "soPhong", RouteParam: "soPhong"},
	TienNghi:     {Model: TienNghi, PrimaryKey: "idTn", RouteParam: "id"},
	KhuyenMai:    {Model: KhuyenMai, PrimaryKey: "idKm", RouteParam: "id"},
	PhieuDat:     {Model: PhieuDat, PrimaryKey: "idPd", RouteParam: "id"},
	PhieuThue:    {Model: PhieuThue, PrimaryKey: "idPt", RouteParam: "id"},
	HoaDon:       {Model: HoaDon, PrimaryKey: "idHd", RouteParam: "id"},
	CTPhieuThue:  {Model: CTPhieuThue, PrimaryKey: "idCtPt", RouteParam: "id"},
	DichVu:       {Model: DichVu, PrimaryKey: "idDv", RouteParam: "id"},
	PhuThu:       {Model: PhuThu, PrimaryKey: "idPhuThu", RouteParam: "id"},

	// Composite key models
	QuanLy:       {Model: QuanLy, CompositeKey: []string{"idBp", "manv"}},
	CTTienNghi:   {Model: CTTienNghi, CompositeKey: []string{"idTn", "idHangPhong"}},
	CTKhuyenMai:  {Model: CTKhuyenMai, CompositeKey: []string{"idKm", "idHangPhong"}},
	CTPhieuDat:   {Model: CTPhieuDat, CompositeKey: []string{"idPd", "idHangPhong"}},
	CTKhachO:     {Model: CTKhachO, CompositeKey: []string{"idCtPt", "cmnd"}},
	DoiPhong:     {Model: DoiPhong, CompositeKey: []string{"idCtPt", "soPhongMoi"}},
	CTDichVu:     {Model: CTDichVu, CompositeKey: []string{"idCtPt", "idDv", "ngaySuDung"}},
	CTPhuThu:     {Model: CTPhuThu, CompositeKey: []string{"idPhuThu", "idCtPt"}},
	GiaHangPhong: {Model: GiaHangPhong, CompositeKey: []string{"idHangPhong", "ngayApDung"}},
	GiaDichVu:    {Model: GiaDichVu, CompositeKey: []string{"idDv", "ngayApDung"}},
	GiaPhuThu:    {Model: GiaPhuThu, CompositeKey: []string{"idPhuThu", "ngayApDung"}},
}

func (g *Generator) Generate(request *GenerateRequest) error {
	for _, model := range request.Models {
		if err := g.generateModel(model, request.Path); err != nil {
			return fmt.Errorf("failed to generate %s: %w", model, err)
		}
	}

	if request.GenerateService {
		if err := g.GenerateServices(request); err != nil {
			return fmt.Errorf("failed to generate services: %w", err)
		}
	}

	return nil
}

func (g *Generator) generateModel(model Model, basePath string) error {
	config, exists := modelConfigs[model]
	if !exists {
		return fmt.Errorf("model config not found for %s", model)
	}

	// Convert model name to kebab-case for URL
	modelKebab := toKebabCase(string(model))

	// Create directory structure
	apiDir := filepath.Join(basePath, "app", "api", modelKebab)
	if err := os.MkdirAll(apiDir, 0755); err != nil {
		return err
	}

	// Generate main route file (GET all, POST)
	if err := g.generateMainRoute(config, apiDir); err != nil {
		return err
	}

	// Generate detail route only for models with single primary key
	if config.PrimaryKey != "" {
		paramName := config.RouteParam
		detailDir := filepath.Join(apiDir, fmt.Sprintf("[%s]", paramName))
		if err := os.MkdirAll(detailDir, 0755); err != nil {
			return err
		}

		if err := g.generateDetailRoute(config, detailDir); err != nil {
			return err
		}
	}

	fmt.Printf("✓ Generated API for %s at %s\n", model, modelKebab)
	return nil
}

func (g *Generator) generateMainRoute(config ModelConfig, dir string) error {
	g.sb.Reset()

	modelCamel := toPrismaCamelCase(string(config.Model))

	g.sb.WriteString(fmt.Sprintf(`// this file is auto-generated by codegen
// do not modify it directly
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of %s
export async function GET(request: NextRequest) {
  try {
    const %ss = await prisma.%s.findMany()
    
    return NextResponse.json({
      success: true,
      data: %ss,
    })
  } catch (error) {
    console.error('Error fetching %s:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new %s
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const new%s = await prisma.%s.create({
      data: body,
    })
    
    return NextResponse.json(
      { success: true, data: new%s },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating %s:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
`, config.Model, modelCamel, modelCamel, modelCamel, modelCamel, config.Model,
		config.Model, string(config.Model), string(config.Model), string(config.Model)))

	filename := filepath.Join(dir, "route.ts")
	return os.WriteFile(filename, []byte(g.sb.String()), 0644)
}

func (g *Generator) generateDetailRoute(config ModelConfig, dir string) error {
	g.sb.Reset()

	modelCamel := toPrismaCamelCase(string(config.Model))
	paramName := config.RouteParam
	pkField := config.PrimaryKey

	g.sb.WriteString(fmt.Sprintf(`// this file is auto-generated by codegen
// do not modify it directly
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get single %s by %s
export async function GET(
  request: NextRequest,
  { params }: { params: { %s: string } }
) {
  try {
    const { %s } = params
    
    const %s = await prisma.%s.findUnique({
      where: { %s },
    })
    
    if (!%s) {
      return NextResponse.json(
        { success: false, message: 'Not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: %s,
    })
  } catch (error) {
    console.error('Error fetching %s:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update %s by %s
export async function PUT(
  request: NextRequest,
  { params }: { params: { %s: string } }
) {
  try {
    const { %s } = params
    const body = await request.json()
    
    const updated%s = await prisma.%s.update({
      where: { %s },
      data: body,
    })
    
    return NextResponse.json({
      success: true,
      data: updated%s,
    })
  } catch (error) {
    console.error('Error updating %s:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete %s by %s
export async function DELETE(
  request: NextRequest,
  { params }: { params: { %s: string } }
) {
  try {
    const { %s } = params
    
    await prisma.%s.delete({
      where: { %s },
    })
    
    return NextResponse.json({
      success: true,
      message: 'Deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting %s:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
`, config.Model, pkField, paramName, paramName, modelCamel, modelCamel, pkField,
		modelCamel, modelCamel, modelCamel,
		config.Model, pkField, paramName, paramName, string(config.Model), modelCamel, pkField,
		string(config.Model), config.Model,
		config.Model, pkField, paramName, paramName, modelCamel, pkField, modelCamel))

	filename := filepath.Join(dir, "route.ts")
	return os.WriteFile(filename, []byte(g.sb.String()), 0644)
}

// Helper functions
func toKebabCase(s string) string {
	var result strings.Builder
	for i, r := range s {
		if i > 0 && r >= 'A' && r <= 'Z' {
			result.WriteRune('-')
		}
		result.WriteRune(r)
	}
	return strings.ToLower(result.String())
}

// Convert to Prisma's camelCase naming
// CTKhachO -> ctKhachO
// KhachHang -> khachHang
func toPrismaCamelCase(s string) string {
	if len(s) == 0 {
		return s
	}

	// Handle special cases like CT prefix
	if strings.HasPrefix(s, "CT") && len(s) > 2 {
		// CTKhachO -> ctKhachO
		return "ct" + s[2:]
	}

	// Regular camelCase: KhachHang -> khachHang
	return strings.ToLower(s[:1]) + s[1:]
}

func (g *Generator) GenerateServices(request *GenerateRequest) error {
	for _, model := range request.Models {
		if err := g.generateService(model, request.Path); err != nil {
			return fmt.Errorf("failed to generate service for %s: %w", model, err)
		}
	}

	// Generate index file
	if err := g.generateServicesIndex(request.Models, request.Path); err != nil {
		return fmt.Errorf("failed to generate services index: %w", err)
	}

	return nil
}

func (g *Generator) generateService(model Model, basePath string) error {
	config, exists := modelConfigs[model]
	if !exists {
		return fmt.Errorf("model config not found for %s", model)
	}

	// Create services directory
	servicesDir := filepath.Join(basePath, "lib", "services")
	if err := os.MkdirAll(servicesDir, 0755); err != nil {
		return err
	}

	g.sb.Reset()

	modelKebab := toKebabCase(string(model))
	typeName := string(model)
	apiUrl := fmt.Sprintf("/api/%s", modelKebab)

	// Import and type definition
	g.sb.WriteString(fmt.Sprintf(`// this file is auto-generated by codegen
// do not modify it directly
import { %s } from '@/lib/generated/prisma'

const API_URL = '/api/%s'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

`, typeName, modelKebab))

	// GET list function
	g.sb.WriteString(fmt.Sprintf(`// Get list of %s
export async function getList%s(): Promise<ApiResponse<%s[]>> {
  try {
    const response = await fetch(API_URL)
    return await response.json()
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

`, typeName, typeName, typeName))

	// If model has single primary key, generate detail functions
	if config.PrimaryKey != "" {
		pkField := config.PrimaryKey
		routeParam := config.RouteParam

		// GET by ID
		g.sb.WriteString(fmt.Sprintf(`// Get %s by %s
export async function get%s(%s: string): Promise<ApiResponse<%s>> {
  try {
    const response = await fetch(`+"`%s/${%s}`"+`)
    return await response.json()
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
`, typeName, pkField, typeName, routeParam, typeName, apiUrl, routeParam))

		// UPDATE
		g.sb.WriteString(fmt.Sprintf(`// Update %s
export async function update%s(
  %s: string,
  data: Partial<Omit<%s, '%s'>>
): Promise<ApiResponse<%s>> {
  try {
    const response = await fetch(`+"`%s/${%s}`"+`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

`, typeName, typeName, routeParam, typeName, pkField, typeName, apiUrl, routeParam))

		// DELETE
		g.sb.WriteString(fmt.Sprintf(`// Delete %s
export async function delete%s(%s: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`+"`%s/${%s}`"+`), {
      method: 'DELETE',
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

`, typeName, typeName, routeParam, apiUrl, routeParam))
	}

	// CREATE function
	g.sb.WriteString(fmt.Sprintf(`// Create new %s
export async function create%s(
  data: Omit<%s, %s>
): Promise<ApiResponse<%s>> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
`, typeName, typeName, typeName, getOmitFields(config), typeName))

	filename := filepath.Join(servicesDir, fmt.Sprintf("%s.service.ts", modelKebab))
	if err := os.WriteFile(filename, []byte(g.sb.String()), 0644); err != nil {
		return err
	}

	fmt.Printf("✓ Generated service for %s at lib/services/%s.service.ts\n", model, modelKebab)
	return nil
}

func (g *Generator) generateServicesIndex(models []Model, basePath string) error {
	g.sb.Reset()

	g.sb.WriteString("// Auto-generated service exports\n\n")

	for _, model := range models {
		modelKebab := toKebabCase(string(model))
		g.sb.WriteString(fmt.Sprintf("export * from './%s.service'\n", modelKebab))
	}

	servicesDir := filepath.Join(basePath, "lib", "services")
	filename := filepath.Join(servicesDir, "index.ts")

	if err := os.WriteFile(filename, []byte(g.sb.String()), 0644); err != nil {
		return err
	}

	fmt.Println("✓ Generated services index at lib/services/index.ts")
	return nil
}

func getOmitFields(config ModelConfig) string {
	if config.PrimaryKey != "" {
		return fmt.Sprintf("'%s'", config.PrimaryKey)
	}

	// For composite keys, omit all key fields
	if len(config.CompositeKey) > 0 {
		fields := make([]string, len(config.CompositeKey))
		for i, field := range config.CompositeKey {
			fields[i] = fmt.Sprintf("'%s'", field)
		}
		return strings.Join(fields, " | ")
	}

	return "'id'"
}
