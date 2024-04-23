import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../task/task.entity";

// @Index("pk_subtask", ["id"], { unique: true })
// @Index("subtask_pk", ["id"], { unique: true })
// @Index("has_fk3", ["taskId"], {})
@Entity("subtask", { schema: "public" })
export class Subtask {
  @PrimaryGeneratedColumn("increment",{ name: "id" })
  id: number;

  @Column("integer", { name: "task_id" })
  taskId: number;

  @Column("character varying", { name: "name", length: 256 })
  name: string;

  @Column("character varying", { name: "status", length: 128 })
  status: string;

  @ManyToOne(() => Task, (task) => task.subtasks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "task_id", referencedColumnName: "id" }])
  task: Task;
}
