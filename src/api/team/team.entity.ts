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
import { Project } from "../project/project.entity";

// @Index("pk_team", ["id"], { unique: true })
// @Index("team_pk", ["id"], { unique: true })
// @Index("directs_fk", ["userId"], {})
@Entity("team", { schema: "public" })
export class Team {
  @PrimaryGeneratedColumn("increment",{ name: "id" })
  id: number;

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("character varying", { name: "name", length: 256 })
  name: string;

  @Column("character varying", { name: "photo", nullable: true, length: 1024 })
  photo: string | null;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable({
    name: "participates",
    joinColumns: [{ name: "team_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "user_id", referencedColumnName: "id" }],
    schema: "public",
  })
  users: User[];

  @OneToMany(() => Project, (project) => project.team)
  projects: Project[];

  @ManyToOne(() => User, (user) => user.teams2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
