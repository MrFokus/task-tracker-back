import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ParticipatesProject } from "../otherEntities/participatesProject.entity";
import { ParticipatesTeam } from "../otherEntities/participatesTeam.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn("increment",{name:'id'})
    id: number

    @Column()
    name: string

    @Column({name:'name_ru'})
    nameRu: string

    @OneToMany(() => ParticipatesProject, (participatesProject) => participatesProject.role)
    directs: ParticipatesProject[]

    @OneToMany(() => ParticipatesTeam, (participates) => participates.role)
    participates: ParticipatesTeam[]
}