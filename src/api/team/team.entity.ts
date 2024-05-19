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
import { Project } from "../project/project.entity";
import { ParticipatesTeam } from "../otherEntities/participatesTeam.entity";


@Entity("team", { schema: "public" })
export class Team {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 256 })
  name: string;

  @Column("character varying", { name: "photo", nullable: true, length: 1024 })
  photo: string | null;


  @ManyToMany(() => Project, (project) => project.teams)
  @JoinTable({
    name: 'project_teams',
    joinColumn: {
      name: "team_id",
      referencedColumnName: "id"
  },
  inverseJoinColumn: {
      name: "project_id",
      referencedColumnName: "id"
  }
  })
  projects: Project[];

  @OneToMany(() => ParticipatesTeam, (participatesTeam) => participatesTeam.team,{nullable:false})
  participatesTeam:ParticipatesTeam[]
}
