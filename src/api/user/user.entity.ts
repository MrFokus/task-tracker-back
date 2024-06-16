import { Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Project } from "../project/project.entity";
import { Team } from "../team/team.entity";
import { Task } from "../task/task.entity";
import { ParticipatesProject } from "../otherEntities/participatesProject.entity";
import { ParticipatesTeam } from "../otherEntities/participatesTeam.entity";

// @Index("pk_user", ["id"], { unique: true })
// @Index("user_pk", ["id"], { unique: true })
@Entity("user", { schema: "public" })
@Unique(['login', 'mail'])
export class User {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number;

  @Column("character varying", { name: "login", length: 256 })
  login: string;

  @Column("character varying", { name: "password", length: 60, select: false })
  password: string;

  @Column("character varying", { name: "name", length: 256 })
  name: string;

  @Column("character varying", { name: "mail", length: 256 })
  mail: string;

  @Column("character varying", { name: "photo", nullable: true, length: 1024 })
  photo: string | null;

  // @ManyToMany(() => Project, (project) => project.directs)
  // directs: Project[];

  @OneToMany(() => ParticipatesProject, (participatesProject) => participatesProject.user)
  directs: ParticipatesProject[]
  
  @OneToMany(() => ParticipatesTeam, (participatesTeam) => participatesTeam.user)
  participates:ParticipatesTeam[]

  // @ManyToMany(() => Team, (team) => team.users)
  // teams: Team[];

  @ManyToMany(() => Task, (task) => task.participants)
  tasks: Task[];
}
