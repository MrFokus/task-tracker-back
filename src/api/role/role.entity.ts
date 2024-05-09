import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Directs } from "../otherEntities/directs.entity";
import { Participates } from "../otherEntities/participates.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Directs, (directs) => directs.role)
    directs: Directs[]

    @OneToMany(() => Participates, (participates) => participates.role)
    participates: Directs[]
}