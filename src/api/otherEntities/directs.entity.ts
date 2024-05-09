import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../project/project.entity";
import { User } from "../user/user.entity";
import { Role } from "../role/role.entity";

@Entity()
export class Directs {
    @PrimaryColumn()
    user_id: number

    @PrimaryColumn()
    project_id: number

    @PrimaryColumn()
    role_id: number

    @ManyToOne(() => User, (user) => user.directs)
    @JoinColumn({name:'user_id'})
    user: User

    @ManyToOne(() => Project, (project) => project.directs)
    @JoinColumn({name:'project_id'})
    project: Project

    @ManyToOne(() => Role, (role) => role.directs)
    @JoinColumn({name:'role_id'})
    role: Role

}