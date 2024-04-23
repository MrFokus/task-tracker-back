import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../task/task.entity";

// @Index("pk_mark", ["id"], { unique: true })
// @Index("mark_pk", ["id"], { unique: true })
// @Index("has_fk2", ["taskId"], {})
@Entity("mark", { schema: "public" })
export class Mark {
  @PrimaryGeneratedColumn("increment",{ name: "id" })
  id: number;

  @Column("integer", { name: "task_id" })
  taskId: number;

  @Column("character varying", { name: "name", length: 128 })
  name: string;

  @Column("character varying", { name: "color", length: 8 })
  color: string;

  @ManyToOne(() => Task, (task) => task.marks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "task_id", referencedColumnName: "id" }])
  task: Task;
}
