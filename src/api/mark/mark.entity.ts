import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../task/task.entity";
import { Project } from "../project/project.entity";

// @Index("pk_mark", ["id"], { unique: true })
// @Index("mark_pk", ["id"], { unique: true })
// @Index("has_fk2", ["taskId"], {})
@Entity("mark", { schema: "public" })
export class Mark {
  @PrimaryGeneratedColumn("increment",{ name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 128 })
  name: string;

  @Column("character varying", { name: "color", length: 8 })
  color: string;


  @Column("character varying", { name: "background", length: 8 })
  background: string;

  @ManyToOne(() => Project, (project) => project.marks)
  project:Project

  @ManyToMany(() => Task, (task) => task.marks)
  task: Task;

}
