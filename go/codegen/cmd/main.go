package main

import "codegen/generator"

var Models = []generator.Model{
	generator.KhachHang,
	generator.BoPhan,
	generator.NhomQuyen,
	generator.NhanVien,
	generator.QuanLy,
	generator.LoaiPhong,
	generator.KieuPhong,
	generator.HangPhong,
	generator.AnhHangPhong,
	generator.TrangThai,
	generator.Phong,
	generator.TienNghi,
	generator.CTTienNghi,
	generator.KhuyenMai,
	generator.CTKhuyenMai,
	generator.PhieuDat,
	generator.CTPhieuDat,
	generator.PhieuThue,
	generator.CTPhieuThue,
	generator.HoaDon,
	generator.CTKhachO,
	generator.DoiPhong,
	generator.DichVu,
	generator.GiaDichVu,
	generator.CTDichVu,
	generator.PhuThu,
	generator.GiaPhuThu,
	generator.CTPhuThu,
}

func main() {
	g := generator.Generator{}
	g.Generate(&generator.GenerateRequest{
		Models:          Models,
		Path:            "../../../",
		GenerateService: true,
		GenerateAuth:    true,
	})
}
