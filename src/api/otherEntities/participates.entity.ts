
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../project/project.entity";
import { User } from "../user/user.entity";
import { Role } from "../role/role.entity";
import { Team } from "../team/team.entity";

@Entity()
export class Participates {
    @PrimaryColumn()
    user_id: number

    @PrimaryColumn()
    team_id: number

    @PrimaryColumn()
    role_id: number

    @ManyToOne(() => User, (user) => user.participates)
    @JoinColumn({name:'user_id'})
    user: User

    @ManyToOne(() => Team, (team) => team.participates)
    @JoinColumn({name:'team_id'})
    team: Team

    @ManyToOne(() => Role, (role) => role.participates)
    @JoinColumn({name:'role_id'})
    role: Role

}