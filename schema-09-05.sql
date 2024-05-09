--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Postgres.app)
-- Dumped by pg_dump version 16.1

-- Started on 2024-05-09 22:49:55 MSK

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
-- TOC entry 216 (class 1259 OID 16745)
-- Name: attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attachment (
    id integer NOT NULL,
    task_id integer NOT NULL,
    path character varying(1024) NOT NULL
);


ALTER TABLE public.attachment OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16744)
-- Name: attachment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attachment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attachment_id_seq OWNER TO postgres;

--
-- TOC entry 3719 (class 0 OID 0)
-- Dependencies: 215
-- Name: attachment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attachment_id_seq OWNED BY public.attachment.id;


--
-- TOC entry 233 (class 1259 OID 16887)
-- Name: directs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directs (
    user_id integer NOT NULL,
    project_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.directs OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16775)
-- Name: group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."group" (
    id integer NOT NULL,
    project_id integer NOT NULL,
    name character varying(256) NOT NULL,
    icon character varying(1024)
);


ALTER TABLE public."group" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16774)
-- Name: group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.group_id_seq OWNER TO postgres;

--
-- TOC entry 3720 (class 0 OID 0)
-- Dependencies: 223
-- Name: group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.group_id_seq OWNED BY public."group".id;


--
-- TOC entry 218 (class 1259 OID 16754)
-- Name: mark; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mark (
    id integer NOT NULL,
    task_id integer NOT NULL,
    name character varying(128) NOT NULL,
    color character varying(8) NOT NULL
);


ALTER TABLE public.mark OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16753)
-- Name: mark_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mark_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mark_id_seq OWNER TO postgres;

--
-- TOC entry 3721 (class 0 OID 0)
-- Dependencies: 217
-- Name: mark_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mark_id_seq OWNED BY public.mark.id;


--
-- TOC entry 232 (class 1259 OID 16819)
-- Name: participates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.participates (
    team_id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.participates OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16812)
-- Name: performs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.performs (
    task_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.performs OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16784)
-- Name: project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project (
    id integer NOT NULL,
    team_id integer NOT NULL,
    name character varying(256) NOT NULL,
    date_create date NOT NULL,
    photo character varying(1024)
);


ALTER TABLE public.project OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16783)
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.project_id_seq OWNER TO postgres;

--
-- TOC entry 3722 (class 0 OID 0)
-- Dependencies: 225
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.project_id_seq OWNED BY public.project.id;


--
-- TOC entry 235 (class 1259 OID 16914)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16913)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNER TO postgres;

--
-- TOC entry 3723 (class 0 OID 0)
-- Dependencies: 234
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 220 (class 1259 OID 16761)
-- Name: subtask; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subtask (
    id integer NOT NULL,
    task_id integer NOT NULL,
    name character varying(256) NOT NULL,
    status character varying(128) NOT NULL
);


ALTER TABLE public.subtask OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16760)
-- Name: subtask_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subtask_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subtask_id_seq OWNER TO postgres;

--
-- TOC entry 3724 (class 0 OID 0)
-- Dependencies: 219
-- Name: subtask_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subtask_id_seq OWNED BY public.subtask.id;


--
-- TOC entry 222 (class 1259 OID 16768)
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    id integer NOT NULL,
    project_id integer NOT NULL,
    column_id integer NOT NULL,
    name character varying(128) NOT NULL,
    date_create date NOT NULL,
    date_end date,
    color character varying(8),
    is_template boolean
);


ALTER TABLE public.task OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16767)
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task_id_seq OWNER TO postgres;

--
-- TOC entry 3725 (class 0 OID 0)
-- Dependencies: 221
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- TOC entry 228 (class 1259 OID 16793)
-- Name: team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.team (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(256) NOT NULL,
    photo character varying(1024),
    "participatesUserId" integer,
    "participatesTeamId" integer,
    "participatesRoleId" integer
);


ALTER TABLE public.team OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16792)
-- Name: team_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.team_id_seq OWNER TO postgres;

--
-- TOC entry 3726 (class 0 OID 0)
-- Dependencies: 227
-- Name: team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.team_id_seq OWNED BY public.team.id;


--
-- TOC entry 230 (class 1259 OID 16802)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    login character varying(256) NOT NULL,
    password character varying(60) NOT NULL,
    name character varying(256) NOT NULL,
    mail character varying(256) NOT NULL,
    photo character varying(1024)
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16801)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 3727 (class 0 OID 0)
-- Dependencies: 229
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 3517 (class 2604 OID 16748)
-- Name: attachment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachment ALTER COLUMN id SET DEFAULT nextval('public.attachment_id_seq'::regclass);


--
-- TOC entry 3521 (class 2604 OID 16778)
-- Name: group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group" ALTER COLUMN id SET DEFAULT nextval('public.group_id_seq'::regclass);


--
-- TOC entry 3518 (class 2604 OID 16757)
-- Name: mark id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mark ALTER COLUMN id SET DEFAULT nextval('public.mark_id_seq'::regclass);


--
-- TOC entry 3522 (class 2604 OID 16787)
-- Name: project id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project ALTER COLUMN id SET DEFAULT nextval('public.project_id_seq'::regclass);


--
-- TOC entry 3525 (class 2604 OID 16917)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 3519 (class 2604 OID 16764)
-- Name: subtask id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtask ALTER COLUMN id SET DEFAULT nextval('public.subtask_id_seq'::regclass);


--
-- TOC entry 3520 (class 2604 OID 16771)
-- Name: task id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- TOC entry 3523 (class 2604 OID 16796)
-- Name: team id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team ALTER COLUMN id SET DEFAULT nextval('public.team_id_seq'::regclass);


--
-- TOC entry 3524 (class 2604 OID 16805)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3529 (class 2606 OID 16759)
-- Name: mark PK_0c6d4afd73cc2b4eee5a926aafc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mark
    ADD CONSTRAINT "PK_0c6d4afd73cc2b4eee5a926aafc" PRIMARY KEY (id);


--
-- TOC entry 3551 (class 2606 OID 16942)
-- Name: directs PK_148551814f57ec26a145db362ed; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directs
    ADD CONSTRAINT "PK_148551814f57ec26a145db362ed" PRIMARY KEY (user_id, project_id, role_id);


--
-- TOC entry 3535 (class 2606 OID 16782)
-- Name: group PK_256aa0fda9b1de1a73ee0b7106b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY (id);


--
-- TOC entry 3537 (class 2606 OID 16791)
-- Name: project PK_4d68b1358bb5b766d3e78f32f57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY (id);


--
-- TOC entry 3549 (class 2606 OID 16949)
-- Name: participates PK_890e64e175d1c051d113025bb94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participates
    ADD CONSTRAINT "PK_890e64e175d1c051d113025bb94" PRIMARY KEY (team_id, user_id, role_id);


--
-- TOC entry 3547 (class 2606 OID 16816)
-- Name: performs PK_9c3a46e236e12f21932d1bf19d6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performs
    ADD CONSTRAINT "PK_9c3a46e236e12f21932d1bf19d6" PRIMARY KEY (task_id, user_id);


--
-- TOC entry 3553 (class 2606 OID 16921)
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- TOC entry 3541 (class 2606 OID 16809)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 3527 (class 2606 OID 16752)
-- Name: attachment PK_d2a80c3a8d467f08a750ac4b420; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachment
    ADD CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY (id);


--
-- TOC entry 3531 (class 2606 OID 16766)
-- Name: subtask PK_e0cda44ad38dba885bd8ab1afd3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtask
    ADD CONSTRAINT "PK_e0cda44ad38dba885bd8ab1afd3" PRIMARY KEY (id);


--
-- TOC entry 3539 (class 2606 OID 16800)
-- Name: team PK_f57d8293406df4af348402e4b74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY (id);


--
-- TOC entry 3533 (class 2606 OID 16773)
-- Name: task PK_fb213f79ee45060ba925ecd576e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);


--
-- TOC entry 3543 (class 2606 OID 16811)
-- Name: user UQ_66168135dd55f8246ecd8803b08; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_66168135dd55f8246ecd8803b08" UNIQUE (login, mail);


--
-- TOC entry 3544 (class 1259 OID 16818)
-- Name: IDX_72c5294769d5ca1a273b10a8cb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_72c5294769d5ca1a273b10a8cb" ON public.performs USING btree (user_id);


--
-- TOC entry 3545 (class 1259 OID 16817)
-- Name: IDX_b35c9da637f3a57aadb8d974eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_b35c9da637f3a57aadb8d974eb" ON public.performs USING btree (task_id);


--
-- TOC entry 3565 (class 2606 OID 16965)
-- Name: participates FK_004bf5c1bc864e624651dff54d3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participates
    ADD CONSTRAINT "FK_004bf5c1bc864e624651dff54d3" FOREIGN KEY (team_id) REFERENCES public.team(id);


--
-- TOC entry 3566 (class 2606 OID 16955)
-- Name: participates FK_05f6bf97606d61438ea87eec815; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participates
    ADD CONSTRAINT "FK_05f6bf97606d61438ea87eec815" FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- TOC entry 3557 (class 2606 OID 16846)
-- Name: task FK_1f53e7ffe94530f9e0221224d29; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY (project_id) REFERENCES public.project(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3568 (class 2606 OID 16943)
-- Name: directs FK_320491599cff3111aac5610f8d6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directs
    ADD CONSTRAINT "FK_320491599cff3111aac5610f8d6" FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- TOC entry 3559 (class 2606 OID 16851)
-- Name: group FK_39ffd256313564be7a61805e7e5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT "FK_39ffd256313564be7a61805e7e5" FOREIGN KEY (project_id) REFERENCES public.project(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3555 (class 2606 OID 16831)
-- Name: mark FK_3b247b9030cef31756676c3a70b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mark
    ADD CONSTRAINT "FK_3b247b9030cef31756676c3a70b" FOREIGN KEY (task_id) REFERENCES public.task(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3569 (class 2606 OID 16936)
-- Name: directs FK_409ca135fe48679fd4dbf61cc9f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directs
    ADD CONSTRAINT "FK_409ca135fe48679fd4dbf61cc9f" FOREIGN KEY (project_id) REFERENCES public.project(id);


--
-- TOC entry 3558 (class 2606 OID 16841)
-- Name: task FK_4a2a36bbbaf0cfd82029c9c84d6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_4a2a36bbbaf0cfd82029c9c84d6" FOREIGN KEY (column_id) REFERENCES public."group"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3563 (class 2606 OID 16871)
-- Name: performs FK_72c5294769d5ca1a273b10a8cbb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performs
    ADD CONSTRAINT "FK_72c5294769d5ca1a273b10a8cbb" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3560 (class 2606 OID 16856)
-- Name: project FK_835c1b4e2d9550981b437ffa848; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "FK_835c1b4e2d9550981b437ffa848" FOREIGN KEY (team_id) REFERENCES public.team(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3567 (class 2606 OID 16881)
-- Name: participates FK_a6be138732e5438292d77ee31b6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participates
    ADD CONSTRAINT "FK_a6be138732e5438292d77ee31b6" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3561 (class 2606 OID 16861)
-- Name: team FK_add64c4bdc53d926d9c0992bccc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT "FK_add64c4bdc53d926d9c0992bccc" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3562 (class 2606 OID 16960)
-- Name: team FK_b256cea50231b8c1dc9249d9128; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT "FK_b256cea50231b8c1dc9249d9128" FOREIGN KEY ("participatesUserId", "participatesTeamId", "participatesRoleId") REFERENCES public.participates(user_id, team_id, role_id);


--
-- TOC entry 3564 (class 2606 OID 16866)
-- Name: performs FK_b35c9da637f3a57aadb8d974eb5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performs
    ADD CONSTRAINT "FK_b35c9da637f3a57aadb8d974eb5" FOREIGN KEY (task_id) REFERENCES public.task(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3570 (class 2606 OID 16929)
-- Name: directs FK_d943fce97ac59dc51fba3ad254e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directs
    ADD CONSTRAINT "FK_d943fce97ac59dc51fba3ad254e" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3556 (class 2606 OID 16836)
-- Name: subtask FK_e84f91c650ae89d4f2ce008ce39; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtask
    ADD CONSTRAINT "FK_e84f91c650ae89d4f2ce008ce39" FOREIGN KEY (task_id) REFERENCES public.task(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3554 (class 2606 OID 16826)
-- Name: attachment FK_f7c799f3a6a9bd023612b0cafed; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachment
    ADD CONSTRAINT "FK_f7c799f3a6a9bd023612b0cafed" FOREIGN KEY (task_id) REFERENCES public.task(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


-- Completed on 2024-05-09 22:49:55 MSK

--
-- PostgreSQL database dump complete
--

