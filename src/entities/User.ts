import {BaseEntity, Column,CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    firstname : string

    @Column()
    lastname : string

    @Column()
    active : boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}