-- -------------------------------------------------------------
-- TablePlus 6.1.8(574)
--
-- https://tableplus.com/
--
-- Database: nextjs_db
-- Generation Time: 2025-11-06 23:31:43.9000
-- -------------------------------------------------------------
INSERT INTO "trang_thai" ("ID_TT", "TEN_TRANG_THAI") VALUES
('TT1', 'Trống');
('TT2', 'Đã Đặt'),
('TT3', 'Đang Dọn'),
('TT4', 'Đã Giữ'),
('TT5', 'Bảo Trì'),

INSERT INTO "kieu_phong" ("ID_KP", "TEN_KP", "MO_TA", "SO_LUONG_KHACH") VALUES
('KP1', 'VIP 1', 'VIP', 10);

INSERT INTO "loai_phong" ("ID_LP", "TEN_LP", "MO_TA") VALUES
('LP1', 'VIP 1', 'VIP');

INSERT INTO "bo_phan" ("ID_BP", "TEN_BP") VALUES
('BP1', 'Le tan');

INSERT INTO "hang_phong" ("ID_HANG_PHONG", "ID_KP", "ID_LP") VALUES
('HP1', 'KP1', 'LP1');

INSERT INTO "nhom_quyen" ("ID_NQ", "TEN_NC") VALUES
('NQ1', 'NhanVien');

INSERT INTO "nhan_vien" ("ID_NV", "HO", "TEN", "PHAI", "NGAY_SINH", "DIA_CHI", "SDT", "EMAIL", "HINH", "USERNAME", "PASSWORD", "ID_BP", "ID_NQ") 
VALUES ('NV1', 'Quoka', 'Ka', 'NAM', '2025-10-27', 'Test', '0901111111', 'admin@qkhotel.com', NULL, 'admin@qkhotel.com', 'test', '1', 'NQ1');


INSERT INTO "phong" ("SOPHONG", "TANG", "ID_HANG_PHONG", "ID_TT") VALUES
('P1', 2, 'HP1', 'TT1'),
('P2', 2, 'HP1', 'TT1');
