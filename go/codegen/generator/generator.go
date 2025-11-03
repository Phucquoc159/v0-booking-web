package generator

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"unicode"
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
	CTTienNghi   Model = "CTTienNghi"
	KhuyenMai    Model = "KhuyenMai"
	CTKhuyenMai  Model = "CTKhuyenMai"
	PhieuDat     Model = "PhieuDat"
	CTPhieuDat   Model = "CTPhieuDat"
	PhieuThue    Model = "PhieuThue"
	CTPhieuThue  Model = "CTPhieuThue"
	HoaDon       Model = "HoaDon"
	CTKhachO     Model = "CTKhachO"
	DoiPhong     Model = "DoiPhong"
	DichVu       Model = "DichVu"
	GiaDichVu    Model = "GiaDichVu"
	CTDichVu     Model = "CTDichVu"
	PhuThu       Model = "PhuThu"
	GiaPhuThu    Model = "GiaPhuThu"
	CTPhuThu     Model = "CTPhuThu"
)

type ModelConfig struct {
	Model        Model
	PrimaryKey   string
	CompositeKey []string
	RouteParam   string
	Relations    []string // Relations to always include
}

type Generator struct {
	sb strings.Builder
}

type GenerateRequest struct {
	Models          []Model
	Path            string
	GenerateService bool
}

// Complete model configurations with relations
var modelConfigs = map[Model]ModelConfig{
	KhachHang: {
		Model:      KhachHang,
		PrimaryKey: "cccd",
		RouteParam: "cccd",
		Relations:  []string{},
	},
	BoPhan: {
		Model:      BoPhan,
		PrimaryKey: "idBp",
		RouteParam: "id",
		Relations:  []string{"nhanViens", "quanLys"},
	},
	NhomQuyen: {
		Model:      NhomQuyen,
		PrimaryKey: "idNq",
		RouteParam: "id",
		Relations:  []string{"nhanViens"},
	},
	NhanVien: {
		Model:      NhanVien,
		PrimaryKey: "idNv",
		RouteParam: "id",
		Relations:  []string{"boPhan", "nhomQuyen"},
	},
	LoaiPhong: {
		Model:      LoaiPhong,
		PrimaryKey: "idLp",
		RouteParam: "id",
		Relations:  []string{"hangPhongs"},
	},
	KieuPhong: {
		Model:      KieuPhong,
		PrimaryKey: "idKp",
		RouteParam: "id",
		Relations:  []string{"hangPhongs"},
	},
	HangPhong: {
		Model:      HangPhong,
		PrimaryKey: "idHp",
		RouteParam: "id",
		Relations:  []string{"kieuPhong", "loaiPhong", "giaHangPhongs", "anhHangPhongs", "phongs", "ctTienNghis"},
	},
	AnhHangPhong: {
		Model:      AnhHangPhong,
		PrimaryKey: "idAhp",
		RouteParam: "id",
		Relations:  []string{"hangPhong"},
	},
	TrangThai: {
		Model:      TrangThai,
		PrimaryKey: "idTt",
		RouteParam: "id",
		Relations:  []string{"phongs"},
	},
	Phong: {
		Model:      Phong,
		PrimaryKey: "soPhong",
		RouteParam: "soPhong",
		Relations:  []string{"hangPhong", "trangThai"},
	},
	TienNghi: {
		Model:      TienNghi,
		PrimaryKey: "idTn",
		RouteParam: "id",
		Relations:  []string{"ctTienNghis"},
	},
	KhuyenMai: {
		Model:      KhuyenMai,
		PrimaryKey: "idKm",
		RouteParam: "id",
		Relations:  []string{"ctKhuyenMais"},
	},
	PhieuDat: {
		Model:      PhieuDat,
		PrimaryKey: "idPd",
		RouteParam: "id",
		Relations:  []string{"khachHang", "nhanVien", "ctPhieuDats", "phieuThues"},
	},
	PhieuThue: {
		Model:      PhieuThue,
		PrimaryKey: "idPt",
		RouteParam: "id",
		Relations:  []string{"nhanVien", "khachHang", "phieuDat", "hoaDons", "cTPhieuThues"},
	},
	HoaDon: {
		Model:      HoaDon,
		PrimaryKey: "idHd",
		RouteParam: "id",
		Relations:  []string{"nhanVien", "phieuThue", "cTPhieuThues", "cTDichVus", "cTPhuThus"},
	},
	CTPhieuThue: {
		Model:      CTPhieuThue,
		PrimaryKey: "idCtpt",
		RouteParam: "id",
		Relations:  []string{"phieuThue", "phong", "hoaDon", "cTKhachOs", "doiPhongs"},
	},
	DichVu: {
		Model:      DichVu,
		PrimaryKey: "idDv",
		RouteParam: "id",
		Relations:  []string{"giaDichVus", "ctDichVus"},
	},
	PhuThu: {
		Model:      PhuThu,
		PrimaryKey: "idPt",
		RouteParam: "id",
		Relations:  []string{"giaPhuThus", "ctPhuThus"},
	},

	// Composite key models
	QuanLy: {
		Model:        QuanLy,
		CompositeKey: []string{"idBp", "manv"},
		Relations:    []string{"boPhan", "nhanVien"},
	},
	CTTienNghi: {
		Model:        CTTienNghi,
		CompositeKey: []string{"idTn", "idHp"},
		Relations:    []string{"tienNghi", "hangPhong"},
	},
	CTKhuyenMai: {
		Model:        CTKhuyenMai,
		CompositeKey: []string{"idKm", "idHp"},
		Relations:    []string{"khuyenMai", "hangPhong"},
	},
	CTPhieuDat: {
		Model:        CTPhieuDat,
		CompositeKey: []string{"idPd", "idHp"},
		Relations:    []string{"phieuDat", "hangPhong"},
	},
	CTKhachO: {
		Model:        CTKhachO,
		CompositeKey: []string{"idCtpt", "cmnd"},
		Relations:    []string{"ctPhieuThue", "khachHang"},
	},
	DoiPhong: {
		Model:        DoiPhong,
		CompositeKey: []string{"idCtpt", "soPhongMoi"},
		Relations:    []string{"cTPhieuThue", "phongMoi"},
	},
	CTDichVu: {
		Model:        CTDichVu,
		CompositeKey: []string{"idCtpt", "idDv", "ngaySuDung"},
		Relations:    []string{"cTPhieuThue", "dichVu", "hoaDon"},
	},
	CTPhuThu: {
		Model:        CTPhuThu,
		CompositeKey: []string{"idPt", "idCtpt"},
		Relations:    []string{"phuThu", "cTPhieuThue", "hoaDon"},
	},
	GiaHangPhong: {
		Model:        GiaHangPhong,
		CompositeKey: []string{"idHp", "ngayApDung"},
		Relations:    []string{"hangPhong", "nhanVien"},
	},
	GiaDichVu: {
		Model:        GiaDichVu,
		CompositeKey: []string{"idDv", "ngayApDung"},
		Relations:    []string{"dichVu", "nhanVien"},
	},
	GiaPhuThu: {
		Model:        GiaPhuThu,
		CompositeKey: []string{"idPt", "ngayApDung"},
		Relations:    []string{"phuThu", "nhanVien"},
	},
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

	modelKebab := toKebabCase(string(model))
	apiDir := filepath.Join(basePath, "app", "api", modelKebab)
	if err := os.MkdirAll(apiDir, 0755); err != nil {
		return err
	}

	if err := g.generateMainRoute(config, apiDir); err != nil {
		return err
	}

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
	includeClause := g.generateIncludeClause(config.Relations)

	g.sb.WriteString(fmt.Sprintf(`// This file is auto-generated by codegen
// Do not modify it directly
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get list of %s
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const idsParam = searchParams.get('ids')

    const whereClause = idsParam
      ? { id%s: { in: idsParam.split(',') } }
      : {}

    const %ss = await prisma.%s.findMany({
      where: whereClause,
      %s
    })

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
      %s
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
`, config.Model, toAbbreviation(string(config.Model)), modelCamel, modelCamel, includeClause,
		modelCamel, modelCamel, config.Model,
		config.Model, modelCamel, includeClause, string(config.Model), config.Model))

	filename := filepath.Join(dir, "route.ts")
	return os.WriteFile(filename, []byte(g.sb.String()), 0644)
}

func (g *Generator) generateDetailRoute(config ModelConfig, dir string) error {
	g.sb.Reset()

	modelCamel := toPrismaCamelCase(string(config.Model))
	paramName := config.RouteParam
	pkField := config.PrimaryKey
	includeClause := g.generateIncludeClause(config.Relations)

	g.sb.WriteString(fmt.Sprintf(`// This file is auto-generated by codegen
// Do not modify it directly
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
      where: { %s: %s },
      %s
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
      where: { %s: %s },
      data: body,
      %s
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
      where: { %s: %s },
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
`, config.Model, pkField, paramName, paramName, modelCamel, modelCamel, pkField, paramName, includeClause,
		modelCamel, modelCamel, modelCamel,
		config.Model, pkField, paramName, paramName, string(config.Model), modelCamel, pkField, paramName, includeClause,
		string(config.Model), config.Model,
		config.Model, pkField, paramName, paramName, modelCamel, pkField, paramName, modelCamel))

	filename := filepath.Join(dir, "route.ts")
	return os.WriteFile(filename, []byte(g.sb.String()), 0644)
}

func (g *Generator) generateIncludeClause(relations []string) string {
	if len(relations) == 0 {
		return ""
	}

	var includes []string
	for _, rel := range relations {
		includes = append(includes, fmt.Sprintf("        %s: true", rel))
	}

	return fmt.Sprintf(`include: {
%s,
      }`, strings.Join(includes, ",\n"))
}

// Service generation
func (g *Generator) GenerateServices(request *GenerateRequest) error {
	for _, model := range request.Models {
		if err := g.generateService(model, request.Path); err != nil {
			return fmt.Errorf("failed to generate service for %s: %w", model, err)
		}
	}

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

	servicesDir := filepath.Join(basePath, "lib", "services")
	if err := os.MkdirAll(servicesDir, 0755); err != nil {
		return err
	}

	g.sb.Reset()

	modelKebab := toKebabCase(string(model))
	typeName := string(model)

	g.sb.WriteString(fmt.Sprintf(`// This file is auto-generated by codegen
// Do not modify it directly
import { %s } from '@/lib/generated/prisma'

const API_URL = '/api/%s'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

`, typeName, modelKebab))

	// GET list
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

	// GET list by IDs
	g.sb.WriteString(fmt.Sprintf(`// Get list of %s by ids
export async function getList%sByIds(ids: string[]): Promise<ApiResponse<%s[]>> {
  try {
    const response = await fetch(`+"`${API_URL}?ids=${ids.join(',')}`"+`)
    return await response.json()
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

`, typeName, typeName, typeName))

	// Detail functions for single PK models
	if config.PrimaryKey != "" {
		routeParam := config.RouteParam

		// GET by ID
		g.sb.WriteString(fmt.Sprintf(`// Get %s by %s
export async function get%s(%s: string): Promise<ApiResponse<%s>> {
  try {
    const response = await fetch(`+"`${API_URL}/${%s}`"+`)
    return await response.json()
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

`, typeName, config.PrimaryKey, typeName, routeParam, typeName, routeParam))

		// UPDATE
		g.sb.WriteString(fmt.Sprintf(`// Update %s
export async function update%s(
  %s: string,
  data: Partial<Omit<%s, '%s'>>
): Promise<ApiResponse<%s>> {
  try {
    const response = await fetch(`+"`${API_URL}/${%s}`"+`, {
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

`, typeName, typeName, routeParam, typeName, config.PrimaryKey, typeName, routeParam))

		// DELETE
		g.sb.WriteString(fmt.Sprintf(`// Delete %s
export async function delete%s(%s: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`+"`${API_URL}/${%s}`"+`, {
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

`, typeName, typeName, routeParam, routeParam))
	}

	// CREATE
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

	if len(config.CompositeKey) > 0 {
		fields := make([]string, len(config.CompositeKey))
		for i, field := range config.CompositeKey {
			fields[i] = fmt.Sprintf("'%s'", field)
		}
		return strings.Join(fields, " | ")
	}

	return "'id'"
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

func toPrismaCamelCase(s string) string {
	if len(s) == 0 {
		return s
	}

	if strings.HasPrefix(s, "CT") && len(s) > 2 {
		return "cT" + s[2:]
	}

	return strings.ToLower(s[:1]) + s[1:]
}

func toAbbreviation(str string) string {
	str = strings.Replace(str, "CT", "", 1)

	var capitals []rune

	for _, char := range str {
		if unicode.IsUpper(char) {
			capitals = append(capitals, char)
		}
	}

	if len(capitals) == 0 {
		return strings.ToLower(str)
	}

	result := string(capitals[0])
	for i := 1; i < len(capitals); i++ {
		result += string(unicode.ToLower(capitals[i]))
	}

	return result
}
