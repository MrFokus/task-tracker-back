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
import { Attachment } from "../attachment/attachment.entity";
import { Mark } from "../mark/mark.entity";
import { User } from "../user/user.entity";
import { Subtask } from "../subtask/subtask.entity";
import { Group } from "../group/group.entity";
import { Project } from "../project/project.entity";

// @Index("contain_fk", ["columnId"], {})
// @Index("pk_task", ["id"], { unique: true })
// @Index("task_pk", ["id"], { unique: true })
// @Index("contains_fk", ["projectId"], {})
@Entity("task", { schema: "public" })
export class Task {
  @PrimaryGeneratedColumn("increment",{ name: "id" })
  id: number;

  @Column("integer", { name: "project_id" })
  projectId: number;

  @Column("integer", { name: "column_id" })
  columnId: number;

  @Column("character varying", { name: "name", length: 128 })
  name: string;

  @Column("date", { name: "date_create" })
  dateCreate: string;

  @Column("date", { name: "date_end", nullable: true })
  dateEnd: string | null;

  @Column("character varying", { name: "color", nullable: true, length: 8 })
  color: string | null;

  @Column("boolean", { name: "is_template", nullable: true })
  isTemplate: boolean | null;

  @OneToMany(() => Attachment, (attachment) => attachment.task)
  attachments: Attachment[];

  @ManyToMany(() => Mark, (mark) => mark.task)
  @JoinTable({
    name: 'mark_task',
    joinColumn: {
      name: "task_id",
      referencedColumnName: "id"
  },
  inverseJoinColumn: {
      name: "mark_id",
      referencedColumnName: "id"
  }
  })
  marks: Mark[];

  @ManyToMany(() => User, (user) => user.tasks)
  @JoinTable({
    name: "performs",
    joinColumns: [{ name: "task_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "user_id", referencedColumnName: "id" }],
    schema: "public",
  })
  users: User[];

  @OneToMany(() => Subtask, (subtask) => subtask.task)
  subtasks: Subtask[];

  @ManyToOne(() => Group, (group) => group.tasks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "column_id", referencedColumnName: "id" }])
  column: Group;

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Project;
}
