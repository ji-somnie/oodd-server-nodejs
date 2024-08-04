import { Entity, Column } from "typeorm";
import { BaseEntity } from "../base/baseEntity";

@Entity()
export class UserEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ default: "active" })
    status: string;
}
