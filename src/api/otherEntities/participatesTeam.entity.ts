
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../project/project.entity";
import { User } from "../user/user.entity";
import { Role } from "../role/role.entity";
import { Team } from "../team/team.entity";

@Entity()
export class ParticipatesTeam {
    @PrimaryGeneratedColumn("increment", { name: "id" })
    id: number;

    @ManyToOne(() => User, (user) => user.participates,{nullable:false})
    @JoinColumn({name:'user_id'})
    user: User

    @ManyToOne(() => Team, (team) => team.participatesTeam,{nullable:false})
    @JoinColumn({name:'team_id'})
    team: Team

    @ManyToOne(() => Role, (role) => role.participates,{nullable:false})
    @JoinColumn({name:'role_id'})
    role: Role

}