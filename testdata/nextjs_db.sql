-- -------------------------------------------------------------
-- TablePlus 6.1.8(574)
--
-- https://tableplus.com/
--
-- Database: nextjs_db
-- Generation Time: 2025-11-06 23:31:43.9000
-- -------------------------------------------------------------


INSERT INTO "bo_phan" ("ID_BP", "TEN_BP") VALUES
('BP1', 'Le tan');

INSERT INTO "hang_phong" ("ID_HANG_PHONG", "ID_KP", "ID_LP") VALUES
('HP01', 'KP01', 'LP01');

INSERT INTO "kieu_phong" ("ID_KP", "TEN_KP", "MO_TA", "SO_LUONG_KHACH") VALUES
('KP01', 'VIP 1', 'VIP', 10);

INSERT INTO "loai_phong" ("ID_LP", "TEN_LP", "MO_TA") VALUES
('LP01', 'VIP 1', 'VIP');

INSERT INTO "nhan_vien" ("ID_NV", "HO", "TEN", "PHAI", "NGAY_SINH", "DIA_CHI", "SDT", "EMAIL", "HINH", "USERNAME", "PASSWORD", "ID_BP", "ID_NQ") VALUES
('NV1', 'Quoka', 'Ka', 'NAM', '2025-10-27', 'Test', '0901111111', 'admin@qkhotel.com', NULL, 'admin@qkhotel.com', 'test', '1', 'NQ1'),
('NVJOKVE8', '', 'hello', '', NULL, '', '09090909', 'nobelang78@gmail.com', NULL, 'nobelang78@gmail.com', 'Rq54$1I^4j2W4yX6', '1', 'NQ1'),
('NVOA6N80', '', 'qqq', '', NULL, '', '098765432', 'nobelang77@gmail.com', NULL, '', 'Rq54$1I^4j2W4yX6', '1', 'NQ1');

INSERT INTO "nhom_quyen" ("ID_NQ", "TEN_NC") VALUES
('NQ1', 'NhanVien');

INSERT INTO "phong" ("SOPHONG", "TANG", "ID_HANG_PHONG", "ID_TT") VALUES
('P01', 2, 'HP01', 'TT01'),
('P02', 2, 'HP01', 'TT01');

INSERT INTO "trang_thai" ("ID_TT", "TEN_TRANG_THAI") VALUES
('TT01', 'Trống');

