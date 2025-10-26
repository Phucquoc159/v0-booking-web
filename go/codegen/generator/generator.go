package generator

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

var Models = []Model{
	KhachHang,
	BoPhan,
	NhomQuyen,
	NhanVien,
	QuanLy,
	LoaiPhong,
	KieuPhong,
	HangPhong,
	AnhHangPhong,
	TrangThai,
	Phong,
	TienNghi,
	CTTienNghi,
	KhuyenMai,
	CTKhuyenMai,
	PhieuDat,
	CTPhieuDat,
	PhieuThue,
	CTPhieuThue,
	HoaDon,
	CTKhachO,
	DoiPhong,
	DichVu,
	GiaDichVu,
	CTDichVu,
	PhuThu,
	GiaPhuThu,
	CTPhuThu,
}

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
	Models []Model
	Path   string
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

	g.sb.WriteString(fmt.Sprintf(`import { NextRequest, NextResponse } from 'next/server'
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

	g.sb.WriteString(fmt.Sprintf(`import { NextRequest, NextResponse } from 'next/server'
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
