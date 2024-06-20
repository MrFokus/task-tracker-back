import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../task/task.entity";

// @Index("pk_attachment", ["id"], { unique: true })
// @Index("attachment_pk", ["id"], { unique: true })
// @Index("has_fk", ["taskId"], {})
@Entity("attachment", { schema: "public" })
export class Attachment {
  @PrimaryGeneratedColumn("increment",{ name: "id" })
  id: number;

  // @Column("integer", { name: "task_id" })
  // taskId: number;

  @Column("character varying", { name: "path", length: 1024 })
  path: string;

  @Column("character varying", { name: "name", length: 1024 })
  name: string;

  @ManyToOne(() => Task, (task) => task.attachments, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "task_id", referencedColumnName: "id" }])
  task: Task;
}
