--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7
-- Dumped by pg_dump version 16.3

-- Started on 2025-05-04 22:35:45

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
-- TOC entry 3406 (class 1262 OID 32795)
-- Name: muebles; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE muebles WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';


ALTER DATABASE muebles OWNER TO postgres;

\connect muebles

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
-- TOC entry 222 (class 1259 OID 33782)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id_customer integer NOT NULL,
    name character varying(50) NOT NULL,
    lastname character varying(50),
    email character varying(30),
    phone character varying(15)
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 33781)
-- Name: customers_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_customer_id_seq OWNER TO postgres;

--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 221
-- Name: customers_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.id_customer;


--
-- TOC entry 230 (class 1259 OID 42123)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id_payment integer NOT NULL,
    payment character varying(50) NOT NULL
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 42122)
-- Name: payments_id_payment_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_payment_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_payment_seq OWNER TO postgres;

--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 229
-- Name: payments_id_payment_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_payment_seq OWNED BY public.payments.id_payment;


--
-- TOC entry 224 (class 1259 OID 33789)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id_product integer NOT NULL,
    id_type integer NOT NULL,
    name character varying(50) NOT NULL,
    stock integer,
    price integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 33788)
-- Name: products_id_product_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_product_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_product_seq1 OWNER TO postgres;

--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 223
-- Name: products_id_product_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_product_seq1 OWNED BY public.products.id_product;


--
-- TOC entry 216 (class 1259 OID 33756)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id_role integer NOT NULL,
    role character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 33755)
-- Name: roles_id_role_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_role_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_role_seq1 OWNER TO postgres;

--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_id_role_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_role_seq1 OWNED BY public.roles.id_role;


--
-- TOC entry 228 (class 1259 OID 33830)
-- Name: saledetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saledetails (
    id_saledetail integer NOT NULL,
    id_product integer NOT NULL,
    id_sale integer NOT NULL,
    quantity integer,
    subtotal integer
);


ALTER TABLE public.saledetails OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 33829)
-- Name: saledetails_id_saledetail_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saledetails_id_saledetail_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saledetails_id_saledetail_seq1 OWNER TO postgres;

--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 227
-- Name: saledetails_id_saledetail_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saledetails_id_saledetail_seq1 OWNED BY public.saledetails.id_saledetail;


--
-- TOC entry 226 (class 1259 OID 33813)
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales (
    id_sale integer NOT NULL,
    id_customer integer NOT NULL,
    id_user integer NOT NULL,
    date date NOT NULL,
    total integer,
    id_payment integer NOT NULL
);


ALTER TABLE public.sales OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 33812)
-- Name: sales_id_sale_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sales_id_sale_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sales_id_sale_seq1 OWNER TO postgres;

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 225
-- Name: sales_id_sale_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sales_id_sale_seq1 OWNED BY public.sales.id_sale;


--
-- TOC entry 220 (class 1259 OID 33775)
-- Name: types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.types (
    id_type integer NOT NULL,
    type character varying(50) NOT NULL
);


ALTER TABLE public.types OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 33774)
-- Name: types_id_type_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.types_id_type_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.types_id_type_seq1 OWNER TO postgres;

--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 219
-- Name: types_id_type_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.types_id_type_seq1 OWNED BY public.types.id_type;


--
-- TOC entry 218 (class 1259 OID 33763)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    id_role integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(30),
    phone character varying(15),
    password character varying(30) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 33762)
-- Name: users_id_user_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_user_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_user_seq1 OWNER TO postgres;

--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_user_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_user_seq1 OWNED BY public.users.id_user;


--
-- TOC entry 214 (class 1259 OID 33639)
-- Name: users_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_seq OWNER TO postgres;

--
-- TOC entry 3212 (class 2604 OID 33785)
-- Name: customers id_customer; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id_customer SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);


--
-- TOC entry 3216 (class 2604 OID 42126)
-- Name: payments id_payment; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id_payment SET DEFAULT nextval('public.payments_id_payment_seq'::regclass);


--
-- TOC entry 3213 (class 2604 OID 33792)
-- Name: products id_product; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id_product SET DEFAULT nextval('public.products_id_product_seq1'::regclass);


--
-- TOC entry 3209 (class 2604 OID 33759)
-- Name: roles id_role; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id_role SET DEFAULT nextval('public.roles_id_role_seq1'::regclass);


--
-- TOC entry 3215 (class 2604 OID 33833)
-- Name: saledetails id_saledetail; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saledetails ALTER COLUMN id_saledetail SET DEFAULT nextval('public.saledetails_id_saledetail_seq1'::regclass);


--
-- TOC entry 3214 (class 2604 OID 33816)
-- Name: sales id_sale; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales ALTER COLUMN id_sale SET DEFAULT nextval('public.sales_id_sale_seq1'::regclass);


--
-- TOC entry 3211 (class 2604 OID 33778)
-- Name: types id_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types ALTER COLUMN id_type SET DEFAULT nextval('public.types_id_type_seq1'::regclass);


--
-- TOC entry 3210 (class 2604 OID 33766)
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq1'::regclass);


--
-- TOC entry 3392 (class 0 OID 33782)
-- Dependencies: 222
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id_customer, name, lastname, email, phone) FROM stdin;
\.


--
-- TOC entry 3400 (class 0 OID 42123)
-- Dependencies: 230
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id_payment, payment) FROM stdin;
\.


--
-- TOC entry 3394 (class 0 OID 33789)
-- Dependencies: 224
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id_product, id_type, name, stock, price) FROM stdin;
\.


--
-- TOC entry 3386 (class 0 OID 33756)
-- Dependencies: 216
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id_role, role) FROM stdin;
\.


--
-- TOC entry 3398 (class 0 OID 33830)
-- Dependencies: 228
-- Data for Name: saledetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saledetails (id_saledetail, id_product, id_sale, quantity, subtotal) FROM stdin;
\.


--
-- TOC entry 3396 (class 0 OID 33813)
-- Dependencies: 226
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sales (id_sale, id_customer, id_user, date, total, id_payment) FROM stdin;
\.


--
-- TOC entry 3390 (class 0 OID 33775)
-- Dependencies: 220
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.types (id_type, type) FROM stdin;
\.


--
-- TOC entry 3388 (class 0 OID 33763)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, id_role, name, email, phone, password) FROM stdin;
\.


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 221
-- Name: customers_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_customer_id_seq', 1, false);


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 229
-- Name: payments_id_payment_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_payment_seq', 1, false);


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 223
-- Name: products_id_product_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_product_seq1', 1, false);


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_id_role_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_role_seq1', 1, false);


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 227
-- Name: saledetails_id_saledetail_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saledetails_id_saledetail_seq1', 1, false);


--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 225
-- Name: sales_id_sale_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_id_sale_seq1', 1, false);


--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 219
-- Name: types_id_type_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.types_id_type_seq1', 1, false);


--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_user_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq1', 1, false);


--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_seq', 101, true);


--
-- TOC entry 3224 (class 2606 OID 33787)
-- Name: customers customers_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pk PRIMARY KEY (id_customer);


--
-- TOC entry 3234 (class 2606 OID 42128)
-- Name: payments payments_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pk PRIMARY KEY (id_payment);


--
-- TOC entry 3226 (class 2606 OID 33794)
-- Name: products products_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pk PRIMARY KEY (id_product);


--
-- TOC entry 3218 (class 2606 OID 33761)
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (id_role);


--
-- TOC entry 3230 (class 2606 OID 33835)
-- Name: saledetails saledetails_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saledetails
    ADD CONSTRAINT saledetails_pk PRIMARY KEY (id_saledetail);


--
-- TOC entry 3232 (class 2606 OID 33837)
-- Name: saledetails saledetails_uq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saledetails
    ADD CONSTRAINT saledetails_uq UNIQUE (id_sale, id_product);


--
-- TOC entry 3228 (class 2606 OID 33818)
-- Name: sales sales_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pk PRIMARY KEY (id_sale);


--
-- TOC entry 3222 (class 2606 OID 33780)
-- Name: types types_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pk PRIMARY KEY (id_type);


--
-- TOC entry 3220 (class 2606 OID 33768)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id_user);


--
-- TOC entry 3236 (class 2606 OID 33800)
-- Name: products products_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_fk FOREIGN KEY (id_type) REFERENCES public.types(id_type) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3240 (class 2606 OID 33838)
-- Name: saledetails saledetails_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saledetails
    ADD CONSTRAINT saledetails_fk FOREIGN KEY (id_product) REFERENCES public.products(id_product) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3241 (class 2606 OID 33843)
-- Name: saledetails saledetails_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saledetails
    ADD CONSTRAINT saledetails_fk2 FOREIGN KEY (id_sale) REFERENCES public.sales(id_sale) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3237 (class 2606 OID 33819)
-- Name: sales sales_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_fk FOREIGN KEY (id_customer) REFERENCES public.customers(id_customer) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3238 (class 2606 OID 33824)
-- Name: sales sales_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_fk2 FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3239 (class 2606 OID 42129)
-- Name: sales sales_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_fk3 FOREIGN KEY (id_payment) REFERENCES public.payments(id_payment) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3235 (class 2606 OID 33769)
-- Name: users users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_fk FOREIGN KEY (id_role) REFERENCES public.roles(id_role) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-05-04 22:35:45

--
-- PostgreSQL database dump complete
--

