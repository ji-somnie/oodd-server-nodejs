import { Entity, Column } from "typeorm";
import { BaseEntity } from "../base/baseEntity";

@Entity()
export class ReportEntity extends BaseEntity {
    @Column()
    postId: number;

    @Column()
    reason: string;
}
