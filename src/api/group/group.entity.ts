import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "../project/project.entity";
import { Task } from "../task/task.entity";

// @Index("column_pk", ["id"], { unique: true })
// @Index("pk_column", ["id"], { unique: true })
// @Index("has_fk4", ["projectId"], {})
@Entity("group", { schema: "public" })
export class Group {
  @PrimaryGeneratedColumn("increment",{ name: "id" })
  id: number;

  @Column("integer", { name: "project_id" })
  projectId: number;

  @Column("character varying", { name: "name", length: 256 })
  name: string;

  @Column("character varying", { name: "icon", nullable: true, length: 1024 })
  icon: string | null;

  @ManyToOne(() => Project, (project) => project.groups, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Project;

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];
}
