import { Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../project/project.entity";
import { Team } from "../team/team.entity";
import { Task } from "../task/task.entity";

// @Index("pk_user", ["id"], { unique: true })
// @Index("user_pk", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn("increment",{ name: "id" })
  id: number;

  @Column("character varying", { name: "login", length: 256 })
  login: string;

  @Column("character varying", { name: "password", length: 32 })
  password: string;

  @Column("character varying", { name: "name", length: 256 })
  name: string;

  @Column("character varying", { name: "photo", nullable: true, length: 1024 })
  photo: string | null;

  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];

  @ManyToMany(() => Team, (team) => team.users)
  teams: Team[];

  @ManyToMany(() => Task, (task) => task.users)
  tasks: Task[];

  @OneToMany(() => Team, (team) => team.user)
  teams2: Team[];
}
