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
import { Directs } from "../otherEntities/directs.entity";

// @Index("pk_project", ["id"], { unique: true })
// @Index("project_pk", ["id"], { unique: true })
// @Index("ongoing_fk", ["teamId"], {})
@Entity("project", { schema: "public" })
export class Project {
  @PrimaryGeneratedColumn("increment",{ name: "id" })
  id: number;

  @Column("integer", { name: "team_id" })
  teamId: number;

  @Column("character varying", { name: "name", length: 256 })
  name: string;

  @Column("date", { name: "date_create" })
  dateCreate: string;

  @Column("character varying", { name: "photo", nullable: true, length: 1024 })
  photo: string | null;

  // @ManyToMany(() => User, (user) => user.directs)
  // @JoinTable({
  //   name: "directs",
  //   joinColumns: [{ name: "project_id", referencedColumnName: "id" }],
  //   inverseJoinColumns: [{ name: "user_id", referencedColumnName: "id" }],
  //   schema: "public",
  // })
  // directs: User[];

  @OneToMany(() => Directs, (directs) => directs.project)
  directs:Directs[]

  @OneToMany(() => Group, (group) => group.project)
  groups: Group[];

  @ManyToOne(() => Team, (team) => team.projects, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "team_id", referencedColumnName: "id" }])
  team: Team;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
