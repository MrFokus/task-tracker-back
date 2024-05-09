/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     21.11.2023 21:05:46                          */
/*==============================================================*/


drop index HAS_FK;

drop index ATTACHMENT_PK;

drop table attachment;

drop index HAS_FK4;

drop index COLUMN_PK;

drop table "column";

drop index DIRECTS_FK3;

drop index DIRECTS_FK2;

drop index DIRECTS_PK;

drop table directs;

drop index HAS_FK2;

drop index MARK_PK;

drop table mark;

drop index PARTICIPATES_FK2;

drop index PARTICIPATES_FK;

drop index PARTICIPATES_PK;

drop table participates;

drop index PERFORMS_FK2;

drop index PERFORMS_FK;

drop index PERFORMS_PK;

drop table performs;

drop index ONGOING_FK;

drop index PROJECT_PK;

drop table project;

drop index HAS_FK3;

drop index SUBTASK_PK;

drop table subtask;

drop index CONTAIN_FK;

drop index CONTAINS_FK;

drop index TASK_PK;

drop table task;

drop index DIRECTS_FK;

drop index TEAM_PK;

drop table team;

drop index USER_PK;

drop table "user";

/*==============================================================*/
/* Table: attachment                                            */
/*==============================================================*/
create table attachment (
   id                   INT4                 not null,
   task_id              INT4                 not null,
   path                 VARCHAR(1024)        not null,
   constraint PK_ATTACHMENT primary key (id)
);

/*==============================================================*/
/* Index: ATTACHMENT_PK                                         */
/*==============================================================*/
create unique index ATTACHMENT_PK on attachment (
id
);

/*==============================================================*/
/* Index: HAS_FK                                                */
/*==============================================================*/
create  index HAS_FK on attachment (
task_id
);

/*==============================================================*/
/* Table: "column"                                              */
/*==============================================================*/
create table "column" (
   id                   INT4                 not null,
   project_id           INT4                 not null,
   name                 VARCHAR(256)         not null,
   icon                 VARCHAR(1024)        null,
   constraint PK_COLUMN primary key (id)
);

/*==============================================================*/
/* Index: COLUMN_PK                                             */
/*==============================================================*/
create unique index COLUMN_PK on "column" (
id
);

/*==============================================================*/
/* Index: HAS_FK4                                               */
/*==============================================================*/
create  index HAS_FK4 on "column" (
project_id
);

/*==============================================================*/
/* Table: directs                                               */
/*==============================================================*/
create table directs (
   project_id           INT4                 not null,
   user_id              INT4                 not null,
   constraint PK_DIRECTS primary key (project_id, user_id)
);

/*==============================================================*/
/* Index: DIRECTS_PK                                            */
/*==============================================================*/
create unique index DIRECTS_PK on directs (
project_id,
user_id
);

/*==============================================================*/
/* Index: DIRECTS_FK2                                           */
/*==============================================================*/
create  index DIRECTS_FK2 on directs (
user_id
);

/*==============================================================*/
/* Index: DIRECTS_FK3                                           */
/*==============================================================*/
create  index DIRECTS_FK3 on directs (
project_id
);

/*==============================================================*/
/* Table: mark                                                  */
/*==============================================================*/
create table mark (
   id                   INT4                 not null,
   task_id              INT4                 not null,
   name                 VARCHAR(128)         not null,
   color                VARCHAR(8)           not null,
   constraint PK_MARK primary key (id)
);

/*==============================================================*/
/* Index: MARK_PK                                               */
/*==============================================================*/
create unique index MARK_PK on mark (
id
);

/*==============================================================*/
/* Index: HAS_FK2                                               */
/*==============================================================*/
create  index HAS_FK2 on mark (
task_id
);

/*==============================================================*/
/* Table: participates                                          */
/*==============================================================*/
create table participates (
   team_id              INT4                 not null,
   user_id              INT4                 not null,
   constraint PK_PARTICIPATES primary key (team_id, user_id)
);

/*==============================================================*/
/* Index: PARTICIPATES_PK                                       */
/*==============================================================*/
create unique index PARTICIPATES_PK on participates (
team_id,
user_id
);

/*==============================================================*/
/* Index: PARTICIPATES_FK                                       */
/*==============================================================*/
create  index PARTICIPATES_FK on participates (
user_id
);

/*==============================================================*/
/* Index: PARTICIPATES_FK2                                      */
/*==============================================================*/
create  index PARTICIPATES_FK2 on participates (
team_id
);

/*==============================================================*/
/* Table: performs                                              */
/*==============================================================*/
create table performs (
   task_id              INT4                 not null,
   user_id              INT4                 not null,
   constraint PK_PERFORMS primary key (task_id, user_id)
);

/*==============================================================*/
/* Index: PERFORMS_PK                                           */
/*==============================================================*/
create unique index PERFORMS_PK on performs (
task_id,
user_id
);

/*==============================================================*/
/* Index: PERFORMS_FK                                           */
/*==============================================================*/
create  index PERFORMS_FK on performs (
user_id
);

/*==============================================================*/
/* Index: PERFORMS_FK2                                          */
/*==============================================================*/
create  index PERFORMS_FK2 on performs (
task_id
);

/*==============================================================*/
/* Table: project                                               */
/*==============================================================*/
create table project (
   id                   INT4                 not null,
   team_id              INT4                 not null,
   name                 VARCHAR(256)         not null,
   date_create          DATE                 not null,
   photo                VARCHAR(1024)        null,
   constraint PK_PROJECT primary key (id)
);

/*==============================================================*/
/* Index: PROJECT_PK                                            */
/*==============================================================*/
create unique index PROJECT_PK on project (
id
);

/*==============================================================*/
/* Index: ONGOING_FK                                            */
/*==============================================================*/
create  index ONGOING_FK on project (
team_id
);

/*==============================================================*/
/* Table: subtask                                               */
/*==============================================================*/
create table subtask (
   id                   INT4                 not null,
   task_id              INT4                 not null,
   name                 VARCHAR(256)         not null,
   status               VARCHAR(128)         not null,
   constraint PK_SUBTASK primary key (id)
);

/*==============================================================*/
/* Index: SUBTASK_PK                                            */
/*==============================================================*/
create unique index SUBTASK_PK on subtask (
id
);

/*==============================================================*/
/* Index: HAS_FK3                                               */
/*==============================================================*/
create  index HAS_FK3 on subtask (
task_id
);

/*==============================================================*/
/* Table: task                                                  */
/*==============================================================*/
create table task (
   id                   INT4                 not null,
   project_id           INT4                 not null,
   column_id            INT4                 not null,
   name                 VARCHAR(128)         not null,
   date_create          DATE                 not null,
   date_end             DATE                 null,
   color                VARCHAR(8)           null,
   is_template          BOOL                 null,
   constraint PK_TASK primary key (id)
);

/*==============================================================*/
/* Index: TASK_PK                                               */
/*==============================================================*/
create unique index TASK_PK on task (
id
);

/*==============================================================*/
/* Index: CONTAINS_FK                                           */
/*==============================================================*/
create  index CONTAINS_FK on task (
project_id
);

/*==============================================================*/
/* Index: CONTAIN_FK                                            */
/*==============================================================*/
create  index CONTAIN_FK on task (
column_id
);

/*==============================================================*/
/* Table: team                                                  */
/*==============================================================*/
create table team (
   id                   INT4                 not null,
   user_id              INT4                 not null,
   name                 VARCHAR(256)         not null,
   photo                VARCHAR(1024)        null,
   constraint PK_TEAM primary key (id)
);

/*==============================================================*/
/* Index: TEAM_PK                                               */
/*==============================================================*/
create unique index TEAM_PK on team (
id
);

/*==============================================================*/
/* Index: DIRECTS_FK                                            */
/*==============================================================*/
create  index DIRECTS_FK on team (
user_id
);

/*==============================================================*/
/* Table: "user"                                                */
/*==============================================================*/
create table "user" (
   id                   INT4                 not null,
   login                VARCHAR(256)         not null,
   password             VARCHAR(32)          not null,
   name                 VARCHAR(256)         not null,
   photo                VARCHAR(1024)        null,
   constraint PK_USER primary key (id)
);

/*==============================================================*/
/* Index: USER_PK                                               */
/*==============================================================*/
create unique index USER_PK on "user" (
id
);

alter table attachment
   add constraint FK_ATTACHME_HAS_TASK foreign key (task_id)
      references task (id)
      on delete restrict on update restrict;

alter table "column"
   add constraint FK_COLUMN_HAS_PROJECT foreign key (project_id)
      references project (id)
      on delete restrict on update restrict;

alter table directs
   add constraint FK_DIRECTS_DIRECTS_PROJECT foreign key (project_id)
      references project (id)
      on delete restrict on update restrict;

alter table directs
   add constraint FK_DIRECTS_DIRECTS_USER foreign key (user_id)
      references "user" (id)
      on delete restrict on update restrict;

alter table mark
   add constraint FK_MARK_HAS_TASK foreign key (task_id)
      references task (id)
      on delete restrict on update restrict;

alter table participates
   add constraint FK_PARTICIP_PARTICIPA_TEAM foreign key (team_id)
      references team (id)
      on delete restrict on update restrict;

alter table participates
   add constraint FK_PARTICIP_PARTICIPA_USER foreign key (user_id)
      references "user" (id)
      on delete restrict on update restrict;

alter table performs
   add constraint FK_PERFORMS_PERFORMS_TASK foreign key (task_id)
      references task (id)
      on delete restrict on update restrict;

alter table performs
   add constraint FK_PERFORMS_PERFORMS_USER foreign key (user_id)
      references "user" (id)
      on delete restrict on update restrict;

alter table project
   add constraint FK_PROJECT_ONGOING_TEAM foreign key (team_id)
      references team (id)
      on delete restrict on update restrict;

alter table subtask
   add constraint FK_SUBTASK_HAS_TASK foreign key (task_id)
      references task (id)
      on delete restrict on update restrict;

alter table task
   add constraint FK_TASK_CONTAIN_COLUMN foreign key (column_id)
      references "column" (id)
      on delete restrict on update restrict;

alter table task
   add constraint FK_TASK_CONTAINS_PROJECT foreign key (project_id)
      references project (id)
      on delete restrict on update restrict;

alter table team
   add constraint FK_TEAM_DIRECTS_USER foreign key (user_id)
      references "user" (id)
      on delete restrict on update restrict;

