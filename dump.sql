--
-- PostgreSQL database cluster dump
--

\restrict SqWHCKTSyDImsNahMVcrJtztGgnKHf21IhaSqef2aN5bMZd7at5DcpGbGSfdDvi

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE nextjs_db;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:BGYwhxa2LoVo6PIR+b6y4Q==$ZyHkHE20uTIu9fnw/G6fqbO6Lc2IZya1peAKUotDnig=:8BllrRUEDJms2wmTDhlmOPO2/6AGjZQQWuqU2aqeI5o=';

--
-- User Configurations
--








\unrestrict SqWHCKTSyDImsNahMVcrJtztGgnKHf21IhaSqef2aN5bMZd7at5DcpGbGSfdDvi

--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

\restrict 6jqRJt9voXSfFjpFutqm9dJcRIYyiK2C2iqXu7GJJwwMJqbeImYWMaJvA2W9lfV

-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\unrestrict 6jqRJt9voXSfFjpFutqm9dJcRIYyiK2C2iqXu7GJJwwMJqbeImYWMaJvA2W9lfV
\connect template1
\restrict 6jqRJt9voXSfFjpFutqm9dJcRIYyiK2C2iqXu7GJJwwMJqbeImYWMaJvA2W9lfV

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\unrestrict 6jqRJt9voXSfFjpFutqm9dJcRIYyiK2C2iqXu7GJJwwMJqbeImYWMaJvA2W9lfV
\connect template1
\restrict 6jqRJt9voXSfFjpFutqm9dJcRIYyiK2C2iqXu7GJJwwMJqbeImYWMaJvA2W9lfV

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict 6jqRJt9voXSfFjpFutqm9dJcRIYyiK2C2iqXu7GJJwwMJqbeImYWMaJvA2W9lfV

--
-- Database "nextjs_db" dump
--

--
-- PostgreSQL database dump
--

\restrict TjaxtJjktUukqhkQHiCSuoEYod606VCWUQ23TCw9gh2UD12ZL2yv0yLY4KDRz5c

-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: nextjs_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE nextjs_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE nextjs_db OWNER TO postgres;

\unrestrict TjaxtJjktUukqhkQHiCSuoEYod606VCWUQ23TCw9gh2UD12ZL2yv0yLY4KDRz5c
\connect nextjs_db
\restrict TjaxtJjktUukqhkQHiCSuoEYod606VCWUQ23TCw9gh2UD12ZL2yv0yLY4KDRz5c

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: anh_hang_phong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anh_hang_phong (
    "ID_ANH_HANG_PHONG" character varying(10) NOT NULL,
    "URL_ANH" character varying(100) NOT NULL,
    "ID_HANG_PHONG" character varying(10) NOT NULL
);


ALTER TABLE public.anh_hang_phong OWNER TO postgres;

--
-- Name: bo_phan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bo_phan (
    "ID_BP" character varying(10) NOT NULL,
    "TEN_BP" character varying(50) NOT NULL
);


ALTER TABLE public.bo_phan OWNER TO postgres;

--
-- Name: ct_dich_vu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ct_dich_vu (
    "ID_CT_PT" integer NOT NULL,
    "ID_DV" character varying(10) NOT NULL,
    "NGAY_SU_DUNG" date NOT NULL,
    "DON_GIA" numeric(10,2) NOT NULL,
    "SO_LUONG" integer NOT NULL,
    "TT_THANH_TOAN" character varying(20) NOT NULL,
    "ID_HD" character varying(10)
);


ALTER TABLE public.ct_dich_vu OWNER TO postgres;

--
-- Name: ct_khach_o; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ct_khach_o (
    "ID_CT_PT" integer NOT NULL,
    "CMND" character varying(20) NOT NULL
);


ALTER TABLE public.ct_khach_o OWNER TO postgres;

--
-- Name: ct_phieu_thue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ct_phieu_thue (
    "ID_CT_PT" integer NOT NULL,
    "NGAY_DEN" date NOT NULL,
    "GIO_DEN" time without time zone,
    "NGAY_DI" date,
    "DON_GIA" numeric(10,2) NOT NULL,
    "TT_THANH_TOAN" character varying(20) NOT NULL,
    "ID_PT" character varying(10) NOT NULL,
    "SO_PHONG" character varying(10) NOT NULL,
    "ID_HD" character varying(10)
);


ALTER TABLE public.ct_phieu_thue OWNER TO postgres;

--
-- Name: ct_phu_thu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ct_phu_thu (
    "ID_PHU_THU" character varying(10) NOT NULL,
    "ID_CT_PT" integer NOT NULL,
    "TT_THANH_TOAN" character varying(20) NOT NULL,
    "DON_GIA" numeric(10,2) NOT NULL,
    "SO_LUONG" integer NOT NULL,
    "ID_HD" character varying(10)
);


ALTER TABLE public.ct_phu_thu OWNER TO postgres;

--
-- Name: ctkhuyenmai; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ctkhuyenmai (
    "ID_KM" character varying(10) NOT NULL,
    "ID_HANG_PHONG" character varying(10) NOT NULL,
    "PHAN_TRAM_GIAM" numeric(5,2) NOT NULL
);


ALTER TABLE public.ctkhuyenmai OWNER TO postgres;

--
-- Name: ctphieudat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ctphieudat (
    "ID_PD" character varying(10) NOT NULL,
    "ID_HANG_PHONG" character varying(10) NOT NULL,
    "SO_LUONG_PHONG_O" integer NOT NULL,
    "DON_GIA" numeric(10,2) NOT NULL
);


ALTER TABLE public.ctphieudat OWNER TO postgres;

--
-- Name: cttiennghi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cttiennghi (
    "ID_TN" character varying(10) NOT NULL,
    "ID_HANG_PHONG" character varying(10) NOT NULL,
    "SO_LUONG" integer NOT NULL
);


ALTER TABLE public.cttiennghi OWNER TO postgres;

--
-- Name: dich_vu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dich_vu (
    "ID_DV" character varying(10) NOT NULL,
    "TEN_DV" character varying(50) NOT NULL,
    "MO_TA" character varying(100),
    "DON_VI_TINH" character varying(20) NOT NULL
);


ALTER TABLE public.dich_vu OWNER TO postgres;

--
-- Name: doiphong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doiphong (
    "ID_CT_PT" integer NOT NULL,
    "SOPHONGMOI" character varying(10) NOT NULL,
    "NGAY_DEN" date NOT NULL,
    "NGAY_DI" date,
    "SOPHONGCU" character varying(10)
);


ALTER TABLE public.doiphong OWNER TO postgres;

--
-- Name: gia_dich_vu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gia_dich_vu (
    "ID_DV" character varying(10) NOT NULL,
    "NGAY_AP_DUNG" date NOT NULL,
    "GIA" numeric(10,2) NOT NULL,
    "ID_NV" character varying(10) NOT NULL
);


ALTER TABLE public.gia_dich_vu OWNER TO postgres;

--
-- Name: gia_hang_phong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gia_hang_phong (
    "ID_HANG_PHONG" character varying(10) NOT NULL,
    "NGAYAPDUNG" date NOT NULL,
    "GIA" numeric(10,2) NOT NULL,
    "NGAY_THIET_LAP" date NOT NULL,
    "ID_NV" character varying(10) NOT NULL
);


ALTER TABLE public.gia_hang_phong OWNER TO postgres;

--
-- Name: giaphuthu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.giaphuthu (
    "ID_PHU_THU" character varying(10) NOT NULL,
    "NGAY_AP_DUNG" date NOT NULL,
    "GIA" numeric(10,2) NOT NULL,
    "ID_NV" character varying(10) NOT NULL
);


ALTER TABLE public.giaphuthu OWNER TO postgres;

--
-- Name: hang_phong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hang_phong (
    "ID_HANG_PHONG" character varying(10) NOT NULL,
    "ID_KP" character varying(10) NOT NULL,
    "ID_LP" character varying(10) NOT NULL
);


ALTER TABLE public.hang_phong OWNER TO postgres;

--
-- Name: hoa_don; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hoa_don (
    "ID_HD" character varying(10) NOT NULL,
    "NGAY_LAP" date NOT NULL,
    "ID_NV" character varying(10) NOT NULL,
    "ID_PT" character varying(10) NOT NULL,
    "TONG_TIEN" numeric(10,2) NOT NULL,
    "TRANG_THAI" character varying(20) NOT NULL,
    "SOTIENGIAM" numeric(10,2)
);


ALTER TABLE public.hoa_don OWNER TO postgres;

--
-- Name: khach_hang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.khach_hang (
    "CCCD" character varying(20) NOT NULL,
    "HO" character varying(50) NOT NULL,
    "TEN" character varying(50) NOT NULL,
    "SDT" character varying(15),
    "EMAIL" character varying(50),
    "DIA_CHI" character varying(100),
    "MA_SO_THUE" character varying(20),
    "MAT_KHAU" character varying(255)
);


ALTER TABLE public.khach_hang OWNER TO postgres;

--
-- Name: khuyenmai; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.khuyenmai (
    "ID_KM" character varying(10) NOT NULL,
    "MO_TA_KM" character varying(100) NOT NULL,
    "NGAY_BAT_DAU" date NOT NULL,
    "NGAY_KET_THUC" date NOT NULL
);


ALTER TABLE public.khuyenmai OWNER TO postgres;

--
-- Name: kieu_phong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kieu_phong (
    "ID_KP" character varying(10) NOT NULL,
    "TEN_KP" character varying(50) NOT NULL,
    "MO_TA" character varying(100),
    "SO_LUONG_KHACH" integer
);


ALTER TABLE public.kieu_phong OWNER TO postgres;

--
-- Name: loai_phong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loai_phong (
    "ID_LP" character varying(10) NOT NULL,
    "TEN_LP" character varying(50) NOT NULL,
    "MO_TA" character varying(100)
);


ALTER TABLE public.loai_phong OWNER TO postgres;

--
-- Name: nhan_vien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nhan_vien (
    "ID_NV" character varying(10) NOT NULL,
    "HO" character varying(50) NOT NULL,
    "TEN" character varying(10) NOT NULL,
    "PHAI" character varying(10),
    "NGAY_SINH" date,
    "DIA_CHI" character varying(100),
    "SDT" character varying(15) NOT NULL,
    "EMAIL" character varying(50) NOT NULL,
    "HINH" character varying(100),
    "USERNAME" character varying(50) NOT NULL,
    "PASSWORD" character varying(255) NOT NULL,
    "ID_BP" character varying(10) NOT NULL,
    "ID_NQ" character varying(10) NOT NULL
);


ALTER TABLE public.nhan_vien OWNER TO postgres;

--
-- Name: nhom_quyen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nhom_quyen (
    "ID_NQ" character varying(10) NOT NULL,
    "TEN_NC" character varying(50) NOT NULL
);


ALTER TABLE public.nhom_quyen OWNER TO postgres;

--
-- Name: phieudat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phieudat (
    "ID_PD" character varying(10) NOT NULL,
    "NGAY_DAT" date NOT NULL,
    "NGAY_BD_THUE" date NOT NULL,
    "NGAY_DI" date NOT NULL,
    "TRANG_THAI" character varying(20) NOT NULL,
    "SO_TIEN_COC" numeric(10,2) NOT NULL,
    "CCCD" character varying(20) NOT NULL,
    "ID_NV" character varying(10)
);


ALTER TABLE public.phieudat OWNER TO postgres;

--
-- Name: phieuthue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phieuthue (
    "ID_PT" character varying(10) NOT NULL,
    "NGAY_LAP" date NOT NULL,
    "ID_NV" character varying(10) NOT NULL,
    "CCCD" character varying(20) NOT NULL,
    "ID_PD" character varying(10)
);


ALTER TABLE public.phieuthue OWNER TO postgres;

--
-- Name: phong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phong (
    "SOPHONG" character varying(10) NOT NULL,
    "TANG" integer NOT NULL,
    "ID_HANG_PHONG" character varying(10) NOT NULL,
    "ID_TT" character varying(10) NOT NULL
);


ALTER TABLE public.phong OWNER TO postgres;

--
-- Name: phu_thu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phu_thu (
    "ID_PHU_THU" character varying(10) NOT NULL,
    "TEN_PHU_THU" character varying(50) NOT NULL,
    "LY_DO" character varying(100)
);


ALTER TABLE public.phu_thu OWNER TO postgres;

--
-- Name: quan_ly; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quan_ly (
    "ID_BP" character varying(10) NOT NULL,
    "MANV" character varying(10) NOT NULL,
    "NGAYBDQL" date NOT NULL
);


ALTER TABLE public.quan_ly OWNER TO postgres;

--
-- Name: tien_nghi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tien_nghi (
    "ID_TN" character varying(10) NOT NULL,
    "TEN_TN" character varying(50) NOT NULL,
    "ICON" character varying(100),
    "MO_TA" character varying(100)
);


ALTER TABLE public.tien_nghi OWNER TO postgres;

--
-- Name: trang_thai; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trang_thai (
    "ID_TT" character varying(10) NOT NULL,
    "TEN_TRANG_THAI" character varying(50) NOT NULL
);


ALTER TABLE public.trang_thai OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
2c18be74-2444-4150-a076-73310451e892	bfa8e0de5011b4cfd5362303d15340c3f8c4405cd3ce1a9f7bc4e834d98da312	2025-11-08 10:46:25.692969+00	20251108101630_init_hotel_schema	\N	\N	2025-11-08 10:46:25.628959+00	1
\.


--
-- Data for Name: anh_hang_phong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.anh_hang_phong ("ID_ANH_HANG_PHONG", "URL_ANH", "ID_HANG_PHONG") FROM stdin;
\.


--
-- Data for Name: bo_phan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bo_phan ("ID_BP", "TEN_BP") FROM stdin;
1	Le tan
BP1	Le tan
\.


--
-- Data for Name: ct_dich_vu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ct_dich_vu ("ID_CT_PT", "ID_DV", "NGAY_SU_DUNG", "DON_GIA", "SO_LUONG", "TT_THANH_TOAN", "ID_HD") FROM stdin;
\.


--
-- Data for Name: ct_khach_o; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ct_khach_o ("ID_CT_PT", "CMND") FROM stdin;
\.


--
-- Data for Name: ct_phieu_thue; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ct_phieu_thue ("ID_CT_PT", "NGAY_DEN", "GIO_DEN", "NGAY_DI", "DON_GIA", "TT_THANH_TOAN", "ID_PT", "SO_PHONG", "ID_HD") FROM stdin;
\.


--
-- Data for Name: ct_phu_thu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ct_phu_thu ("ID_PHU_THU", "ID_CT_PT", "TT_THANH_TOAN", "DON_GIA", "SO_LUONG", "ID_HD") FROM stdin;
\.


--
-- Data for Name: ctkhuyenmai; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ctkhuyenmai ("ID_KM", "ID_HANG_PHONG", "PHAN_TRAM_GIAM") FROM stdin;
\.


--
-- Data for Name: ctphieudat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ctphieudat ("ID_PD", "ID_HANG_PHONG", "SO_LUONG_PHONG_O", "DON_GIA") FROM stdin;
PD1	HP01	2	100000.00
PD2	HP01	3	100000.00
PD3	HP01	2	100000.00
PD4	HP01	2	100000.00
\.


--
-- Data for Name: cttiennghi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cttiennghi ("ID_TN", "ID_HANG_PHONG", "SO_LUONG") FROM stdin;
\.


--
-- Data for Name: dich_vu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dich_vu ("ID_DV", "TEN_DV", "MO_TA", "DON_VI_TINH") FROM stdin;
\.


--
-- Data for Name: doiphong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doiphong ("ID_CT_PT", "SOPHONGMOI", "NGAY_DEN", "NGAY_DI", "SOPHONGCU") FROM stdin;
\.


--
-- Data for Name: gia_dich_vu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gia_dich_vu ("ID_DV", "NGAY_AP_DUNG", "GIA", "ID_NV") FROM stdin;
\.


--
-- Data for Name: gia_hang_phong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gia_hang_phong ("ID_HANG_PHONG", "NGAYAPDUNG", "GIA", "NGAY_THIET_LAP", "ID_NV") FROM stdin;
\.


--
-- Data for Name: giaphuthu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.giaphuthu ("ID_PHU_THU", "NGAY_AP_DUNG", "GIA", "ID_NV") FROM stdin;
\.


--
-- Data for Name: hang_phong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hang_phong ("ID_HANG_PHONG", "ID_KP", "ID_LP") FROM stdin;
HP01	KP01	LP01
HP1	KP1	LP1
\.


--
-- Data for Name: hoa_don; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hoa_don ("ID_HD", "NGAY_LAP", "ID_NV", "ID_PT", "TONG_TIEN", "TRANG_THAI", "SOTIENGIAM") FROM stdin;
\.


--
-- Data for Name: khach_hang; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.khach_hang ("CCCD", "HO", "TEN", "SDT", "EMAIL", "DIA_CHI", "MA_SO_THUE", "MAT_KHAU") FROM stdin;
CCCD1	test	test	09090909	\N	\N	\N	\N
CCCD2	quoooka	quooka	09090909	\N	\N	\N	\N
CCC3	test	test	09090909	test@gmail.com	test	test	1212
\.


--
-- Data for Name: khuyenmai; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.khuyenmai ("ID_KM", "MO_TA_KM", "NGAY_BAT_DAU", "NGAY_KET_THUC") FROM stdin;
\.


--
-- Data for Name: kieu_phong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kieu_phong ("ID_KP", "TEN_KP", "MO_TA", "SO_LUONG_KHACH") FROM stdin;
KP01	VIP 1	VIP	10
KP1	VIP 1	VIP	10
\.


--
-- Data for Name: loai_phong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.loai_phong ("ID_LP", "TEN_LP", "MO_TA") FROM stdin;
LP01	VIP 1	VIP
PD2	VIP2	\N
PD3	VIP3	\N
PD5	VIP5	Quokka
LP1	VIP 1	VIP
\.


--
-- Data for Name: nhan_vien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nhan_vien ("ID_NV", "HO", "TEN", "PHAI", "NGAY_SINH", "DIA_CHI", "SDT", "EMAIL", "HINH", "USERNAME", "PASSWORD", "ID_BP", "ID_NQ") FROM stdin;
NV1	Quoka	Ka	NAM	2025-10-27	Test	0901111111	admin@qkhotel.com	\N	admin@qkhotel.com	test	1	NQ1
NVJOKVE8		hello		\N		09090909	nobelang78@gmail.com	\N	nobelang78@gmail.com	Rq54$1I^4j2W4yX6	1	NQ1
NVOA6N80		qqq		\N		098765432	nobelang77@gmail.com	\N		Rq54$1I^4j2W4yX6	1	NQ1
NV04983315	test	test	\N	\N	\N		test@gmail.com	\N	test@gmail.com	$2b$10$dYPgoc4YjFQdCxdqqoEJq.IToXbSJENBhhrW2vLtZyFAlViKTMeue	BP1	NQ1
\.


--
-- Data for Name: nhom_quyen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nhom_quyen ("ID_NQ", "TEN_NC") FROM stdin;
NQ1	NhanVien
\.


--
-- Data for Name: phieudat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phieudat ("ID_PD", "NGAY_DAT", "NGAY_BD_THUE", "NGAY_DI", "TRANG_THAI", "SO_TIEN_COC", "CCCD", "ID_NV") FROM stdin;
PD3	2025-11-14	2025-05-20	2025-10-20	pending	50000.00	CCCD2	NV1
PD4	2025-11-14	2025-10-20	2025-10-20	pending	50000.00	CCC3	NV1
PD1	2025-11-10	2025-02-25	2025-10-25	cancelled	50000.00	CCCD1	NV1
PD2	2025-11-10	2025-02-20	2025-12-20	cancelled	50000.00	CCCD2	NV1
\.


--
-- Data for Name: phieuthue; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phieuthue ("ID_PT", "NGAY_LAP", "ID_NV", "CCCD", "ID_PD") FROM stdin;
\.


--
-- Data for Name: phong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phong ("SOPHONG", "TANG", "ID_HANG_PHONG", "ID_TT") FROM stdin;
P02	2	HP01	TT01
P03	1	HP01	TT01
P04	1	HP01	TT01
P05	1	HP01	TT01
P06	2	HP01	TT01
P07	2	HP01	TT01
P08	1	HP01	TT01
P09	3	HP01	TT01
P01	3	HP01	TT01
P1	2	HP1	TT1
P2	2	HP1	TT1
\.


--
-- Data for Name: phu_thu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phu_thu ("ID_PHU_THU", "TEN_PHU_THU", "LY_DO") FROM stdin;
\.


--
-- Data for Name: quan_ly; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quan_ly ("ID_BP", "MANV", "NGAYBDQL") FROM stdin;
\.


--
-- Data for Name: tien_nghi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tien_nghi ("ID_TN", "TEN_TN", "ICON", "MO_TA") FROM stdin;
\.


--
-- Data for Name: trang_thai; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trang_thai ("ID_TT", "TEN_TRANG_THAI") FROM stdin;
TT01	Trống
TT1	Trống
TT2	Đã Đặt
TT3	Đang Dọn
TT4	Đã Giữ
TT5	Bảo Trì
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: anh_hang_phong anh_hang_phong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anh_hang_phong
    ADD CONSTRAINT anh_hang_phong_pkey PRIMARY KEY ("ID_ANH_HANG_PHONG");


--
-- Name: bo_phan bo_phan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bo_phan
    ADD CONSTRAINT bo_phan_pkey PRIMARY KEY ("ID_BP");


--
-- Name: ct_dich_vu ct_dich_vu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_dich_vu
    ADD CONSTRAINT ct_dich_vu_pkey PRIMARY KEY ("ID_CT_PT", "ID_DV", "NGAY_SU_DUNG");


--
-- Name: ct_khach_o ct_khach_o_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_khach_o
    ADD CONSTRAINT ct_khach_o_pkey PRIMARY KEY ("ID_CT_PT", "CMND");


--
-- Name: ct_phieu_thue ct_phieu_thue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_phieu_thue
    ADD CONSTRAINT ct_phieu_thue_pkey PRIMARY KEY ("ID_CT_PT");


--
-- Name: ct_phu_thu ct_phu_thu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_phu_thu
    ADD CONSTRAINT ct_phu_thu_pkey PRIMARY KEY ("ID_PHU_THU", "ID_CT_PT");


--
-- Name: ctkhuyenmai ctkhuyenmai_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctkhuyenmai
    ADD CONSTRAINT ctkhuyenmai_pkey PRIMARY KEY ("ID_KM", "ID_HANG_PHONG");


--
-- Name: ctphieudat ctphieudat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctphieudat
    ADD CONSTRAINT ctphieudat_pkey PRIMARY KEY ("ID_PD", "ID_HANG_PHONG");


--
-- Name: cttiennghi cttiennghi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cttiennghi
    ADD CONSTRAINT cttiennghi_pkey PRIMARY KEY ("ID_TN", "ID_HANG_PHONG");


--
-- Name: dich_vu dich_vu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dich_vu
    ADD CONSTRAINT dich_vu_pkey PRIMARY KEY ("ID_DV");


--
-- Name: doiphong doiphong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doiphong
    ADD CONSTRAINT doiphong_pkey PRIMARY KEY ("ID_CT_PT", "SOPHONGMOI");


--
-- Name: gia_dich_vu gia_dich_vu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gia_dich_vu
    ADD CONSTRAINT gia_dich_vu_pkey PRIMARY KEY ("ID_DV", "NGAY_AP_DUNG");


--
-- Name: gia_hang_phong gia_hang_phong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gia_hang_phong
    ADD CONSTRAINT gia_hang_phong_pkey PRIMARY KEY ("ID_HANG_PHONG", "NGAYAPDUNG");


--
-- Name: giaphuthu giaphuthu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.giaphuthu
    ADD CONSTRAINT giaphuthu_pkey PRIMARY KEY ("ID_PHU_THU", "NGAY_AP_DUNG");


--
-- Name: hang_phong hang_phong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hang_phong
    ADD CONSTRAINT hang_phong_pkey PRIMARY KEY ("ID_HANG_PHONG");


--
-- Name: hoa_don hoa_don_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoa_don
    ADD CONSTRAINT hoa_don_pkey PRIMARY KEY ("ID_HD");


--
-- Name: khach_hang khach_hang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.khach_hang
    ADD CONSTRAINT khach_hang_pkey PRIMARY KEY ("CCCD");


--
-- Name: khuyenmai khuyenmai_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.khuyenmai
    ADD CONSTRAINT khuyenmai_pkey PRIMARY KEY ("ID_KM");


--
-- Name: kieu_phong kieu_phong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kieu_phong
    ADD CONSTRAINT kieu_phong_pkey PRIMARY KEY ("ID_KP");


--
-- Name: loai_phong loai_phong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loai_phong
    ADD CONSTRAINT loai_phong_pkey PRIMARY KEY ("ID_LP");


--
-- Name: nhan_vien nhan_vien_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien
    ADD CONSTRAINT nhan_vien_pkey PRIMARY KEY ("ID_NV");


--
-- Name: nhom_quyen nhom_quyen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhom_quyen
    ADD CONSTRAINT nhom_quyen_pkey PRIMARY KEY ("ID_NQ");


--
-- Name: phieudat phieudat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phieudat
    ADD CONSTRAINT phieudat_pkey PRIMARY KEY ("ID_PD");


--
-- Name: phieuthue phieuthue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phieuthue
    ADD CONSTRAINT phieuthue_pkey PRIMARY KEY ("ID_PT");


--
-- Name: phong phong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phong
    ADD CONSTRAINT phong_pkey PRIMARY KEY ("SOPHONG");


--
-- Name: phu_thu phu_thu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phu_thu
    ADD CONSTRAINT phu_thu_pkey PRIMARY KEY ("ID_PHU_THU");


--
-- Name: quan_ly quan_ly_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quan_ly
    ADD CONSTRAINT quan_ly_pkey PRIMARY KEY ("ID_BP", "MANV");


--
-- Name: tien_nghi tien_nghi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tien_nghi
    ADD CONSTRAINT tien_nghi_pkey PRIMARY KEY ("ID_TN");


--
-- Name: trang_thai trang_thai_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trang_thai
    ADD CONSTRAINT trang_thai_pkey PRIMARY KEY ("ID_TT");


--
-- Name: khach_hang_EMAIL_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "khach_hang_EMAIL_key" ON public.khach_hang USING btree ("EMAIL");


--
-- Name: nhan_vien_EMAIL_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "nhan_vien_EMAIL_key" ON public.nhan_vien USING btree ("EMAIL");


--
-- Name: nhan_vien_USERNAME_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "nhan_vien_USERNAME_key" ON public.nhan_vien USING btree ("USERNAME");


--
-- Name: anh_hang_phong anh_hang_phong_ID_HANG_PHONG_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anh_hang_phong
    ADD CONSTRAINT "anh_hang_phong_ID_HANG_PHONG_fkey" FOREIGN KEY ("ID_HANG_PHONG") REFERENCES public.hang_phong("ID_HANG_PHONG") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ct_dich_vu ct_dich_vu_ID_CT_PT_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_dich_vu
    ADD CONSTRAINT "ct_dich_vu_ID_CT_PT_fkey" FOREIGN KEY ("ID_CT_PT") REFERENCES public.ct_phieu_thue("ID_CT_PT") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ct_dich_vu ct_dich_vu_ID_DV_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_dich_vu
    ADD CONSTRAINT "ct_dich_vu_ID_DV_fkey" FOREIGN KEY ("ID_DV") REFERENCES public.dich_vu("ID_DV") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ct_dich_vu ct_dich_vu_ID_HD_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_dich_vu
    ADD CONSTRAINT "ct_dich_vu_ID_HD_fkey" FOREIGN KEY ("ID_HD") REFERENCES public.hoa_don("ID_HD") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ct_khach_o ct_khach_o_CMND_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_khach_o
    ADD CONSTRAINT "ct_khach_o_CMND_fkey" FOREIGN KEY ("CMND") REFERENCES public.khach_hang("CCCD") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ct_khach_o ct_khach_o_ID_CT_PT_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_khach_o
    ADD CONSTRAINT "ct_khach_o_ID_CT_PT_fkey" FOREIGN KEY ("ID_CT_PT") REFERENCES public.ct_phieu_thue("ID_CT_PT") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ct_phieu_thue ct_phieu_thue_ID_HD_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_phieu_thue
    ADD CONSTRAINT "ct_phieu_thue_ID_HD_fkey" FOREIGN KEY ("ID_HD") REFERENCES public.hoa_don("ID_HD") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ct_phieu_thue ct_phieu_thue_ID_PT_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_phieu_thue
    ADD CONSTRAINT "ct_phieu_thue_ID_PT_fkey" FOREIGN KEY ("ID_PT") REFERENCES public.phieuthue("ID_PT") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ct_phieu_thue ct_phieu_thue_SO_PHONG_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_phieu_thue
    ADD CONSTRAINT "ct_phieu_thue_SO_PHONG_fkey" FOREIGN KEY ("SO_PHONG") REFERENCES public.phong("SOPHONG") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ct_phu_thu ct_phu_thu_ID_CT_PT_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_phu_thu
    ADD CONSTRAINT "ct_phu_thu_ID_CT_PT_fkey" FOREIGN KEY ("ID_CT_PT") REFERENCES public.ct_phieu_thue("ID_CT_PT") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ct_phu_thu ct_phu_thu_ID_HD_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_phu_thu
    ADD CONSTRAINT "ct_phu_thu_ID_HD_fkey" FOREIGN KEY ("ID_HD") REFERENCES public.hoa_don("ID_HD") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ct_phu_thu ct_phu_thu_ID_PHU_THU_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ct_phu_thu
    ADD CONSTRAINT "ct_phu_thu_ID_PHU_THU_fkey" FOREIGN KEY ("ID_PHU_THU") REFERENCES public.phu_thu("ID_PHU_THU") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ctkhuyenmai ctkhuyenmai_ID_HANG_PHONG_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctkhuyenmai
    ADD CONSTRAINT "ctkhuyenmai_ID_HANG_PHONG_fkey" FOREIGN KEY ("ID_HANG_PHONG") REFERENCES public.hang_phong("ID_HANG_PHONG") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ctkhuyenmai ctkhuyenmai_ID_KM_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctkhuyenmai
    ADD CONSTRAINT "ctkhuyenmai_ID_KM_fkey" FOREIGN KEY ("ID_KM") REFERENCES public.khuyenmai("ID_KM") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ctphieudat ctphieudat_ID_HANG_PHONG_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctphieudat
    ADD CONSTRAINT "ctphieudat_ID_HANG_PHONG_fkey" FOREIGN KEY ("ID_HANG_PHONG") REFERENCES public.hang_phong("ID_HANG_PHONG") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ctphieudat ctphieudat_ID_PD_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ctphieudat
    ADD CONSTRAINT "ctphieudat_ID_PD_fkey" FOREIGN KEY ("ID_PD") REFERENCES public.phieudat("ID_PD") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cttiennghi cttiennghi_ID_HANG_PHONG_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cttiennghi
    ADD CONSTRAINT "cttiennghi_ID_HANG_PHONG_fkey" FOREIGN KEY ("ID_HANG_PHONG") REFERENCES public.hang_phong("ID_HANG_PHONG") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cttiennghi cttiennghi_ID_TN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cttiennghi
    ADD CONSTRAINT "cttiennghi_ID_TN_fkey" FOREIGN KEY ("ID_TN") REFERENCES public.tien_nghi("ID_TN") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: doiphong doiphong_ID_CT_PT_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doiphong
    ADD CONSTRAINT "doiphong_ID_CT_PT_fkey" FOREIGN KEY ("ID_CT_PT") REFERENCES public.ct_phieu_thue("ID_CT_PT") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: doiphong doiphong_SOPHONGMOI_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doiphong
    ADD CONSTRAINT "doiphong_SOPHONGMOI_fkey" FOREIGN KEY ("SOPHONGMOI") REFERENCES public.phong("SOPHONG") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: gia_dich_vu gia_dich_vu_ID_DV_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gia_dich_vu
    ADD CONSTRAINT "gia_dich_vu_ID_DV_fkey" FOREIGN KEY ("ID_DV") REFERENCES public.dich_vu("ID_DV") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: gia_dich_vu gia_dich_vu_ID_NV_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gia_dich_vu
    ADD CONSTRAINT "gia_dich_vu_ID_NV_fkey" FOREIGN KEY ("ID_NV") REFERENCES public.nhan_vien("ID_NV") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: gia_hang_phong gia_hang_phong_ID_HANG_PHONG_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gia_hang_phong
    ADD CONSTRAINT "gia_hang_phong_ID_HANG_PHONG_fkey" FOREIGN KEY ("ID_HANG_PHONG") REFERENCES public.hang_phong("ID_HANG_PHONG") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: gia_hang_phong gia_hang_phong_ID_NV_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gia_hang_phong
    ADD CONSTRAINT "gia_hang_phong_ID_NV_fkey" FOREIGN KEY ("ID_NV") REFERENCES public.nhan_vien("ID_NV") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: giaphuthu giaphuthu_ID_NV_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.giaphuthu
    ADD CONSTRAINT "giaphuthu_ID_NV_fkey" FOREIGN KEY ("ID_NV") REFERENCES public.nhan_vien("ID_NV") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: giaphuthu giaphuthu_ID_PHU_THU_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.giaphuthu
    ADD CONSTRAINT "giaphuthu_ID_PHU_THU_fkey" FOREIGN KEY ("ID_PHU_THU") REFERENCES public.phu_thu("ID_PHU_THU") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: hang_phong hang_phong_ID_KP_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hang_phong
    ADD CONSTRAINT "hang_phong_ID_KP_fkey" FOREIGN KEY ("ID_KP") REFERENCES public.kieu_phong("ID_KP") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: hang_phong hang_phong_ID_LP_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hang_phong
    ADD CONSTRAINT "hang_phong_ID_LP_fkey" FOREIGN KEY ("ID_LP") REFERENCES public.loai_phong("ID_LP") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: hoa_don hoa_don_ID_NV_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoa_don
    ADD CONSTRAINT "hoa_don_ID_NV_fkey" FOREIGN KEY ("ID_NV") REFERENCES public.nhan_vien("ID_NV") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: hoa_don hoa_don_ID_PT_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hoa_don
    ADD CONSTRAINT "hoa_don_ID_PT_fkey" FOREIGN KEY ("ID_PT") REFERENCES public.phieuthue("ID_PT") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nhan_vien nhan_vien_ID_BP_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien
    ADD CONSTRAINT "nhan_vien_ID_BP_fkey" FOREIGN KEY ("ID_BP") REFERENCES public.bo_phan("ID_BP") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nhan_vien nhan_vien_ID_NQ_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien
    ADD CONSTRAINT "nhan_vien_ID_NQ_fkey" FOREIGN KEY ("ID_NQ") REFERENCES public.nhom_quyen("ID_NQ") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: phieudat phieudat_CCCD_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phieudat
    ADD CONSTRAINT "phieudat_CCCD_fkey" FOREIGN KEY ("CCCD") REFERENCES public.khach_hang("CCCD") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: phieudat phieudat_ID_NV_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phieudat
    ADD CONSTRAINT "phieudat_ID_NV_fkey" FOREIGN KEY ("ID_NV") REFERENCES public.nhan_vien("ID_NV") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: phieuthue phieuthue_CCCD_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phieuthue
    ADD CONSTRAINT "phieuthue_CCCD_fkey" FOREIGN KEY ("CCCD") REFERENCES public.khach_hang("CCCD") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: phieuthue phieuthue_ID_NV_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phieuthue
    ADD CONSTRAINT "phieuthue_ID_NV_fkey" FOREIGN KEY ("ID_NV") REFERENCES public.nhan_vien("ID_NV") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: phieuthue phieuthue_ID_PD_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phieuthue
    ADD CONSTRAINT "phieuthue_ID_PD_fkey" FOREIGN KEY ("ID_PD") REFERENCES public.phieudat("ID_PD") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: phong phong_ID_HANG_PHONG_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phong
    ADD CONSTRAINT "phong_ID_HANG_PHONG_fkey" FOREIGN KEY ("ID_HANG_PHONG") REFERENCES public.hang_phong("ID_HANG_PHONG") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: phong phong_ID_TT_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phong
    ADD CONSTRAINT "phong_ID_TT_fkey" FOREIGN KEY ("ID_TT") REFERENCES public.trang_thai("ID_TT") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: quan_ly quan_ly_ID_BP_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quan_ly
    ADD CONSTRAINT "quan_ly_ID_BP_fkey" FOREIGN KEY ("ID_BP") REFERENCES public.bo_phan("ID_BP") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: quan_ly quan_ly_MANV_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quan_ly
    ADD CONSTRAINT "quan_ly_MANV_fkey" FOREIGN KEY ("MANV") REFERENCES public.nhan_vien("ID_NV") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict TjaxtJjktUukqhkQHiCSuoEYod606VCWUQ23TCw9gh2UD12ZL2yv0yLY4KDRz5c

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

\restrict CNITDsRVzX1DDz7kTv6AfPANY2DFUwlqHQeePiFl57TaftyFklToIVMKb9O8bvI

-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\unrestrict CNITDsRVzX1DDz7kTv6AfPANY2DFUwlqHQeePiFl57TaftyFklToIVMKb9O8bvI
\connect postgres
\restrict CNITDsRVzX1DDz7kTv6AfPANY2DFUwlqHQeePiFl57TaftyFklToIVMKb9O8bvI

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

\unrestrict CNITDsRVzX1DDz7kTv6AfPANY2DFUwlqHQeePiFl57TaftyFklToIVMKb9O8bvI

--
-- PostgreSQL database cluster dump complete
--

