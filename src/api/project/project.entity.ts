import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Group } from "../group/group.entity";
import { Team } from "../team/team.entity";
import { Task } from "../task/task.entity";
import { ParticipatesProject } from "../otherEntities/participatesProject.entity";
import { Mark } from "../mark/mark.entity";

@Entity("project", { schema: "public" })
export class Project {
  @PrimaryGeneratedColumn("increment",{ name: "id" })
  id: number;

  // @Column("integer", { name: "team_id" })
  // teamId: number;

  @Column("character varying", { name: "name", length: 256 })
  name: string;

  @Column("date", { name: "date_create" })
  dateCreate: string;

  @Column("character varying", { name: "photo", nullable: true, length: 1024 })
  photo: string | null;

  @OneToMany(() => ParticipatesProject, (participatesProject) => participatesProject.project)
  directs:ParticipatesProject[]

  @OneToMany(() => Group, (group) => group.project)
  groups: Group[];


  @ManyToMany(() => Team, (team) => team.projects, { nullable: false })
  teams:Team[]

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToMany(() => Mark, (mark) => mark.project)
  marks:Mark[]
}
