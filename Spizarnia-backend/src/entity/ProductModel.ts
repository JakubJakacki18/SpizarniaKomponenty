import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {Container} from "./Container"
@Entity()
export class ProductModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "int", nullable: false })
    quantity: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    unit: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;


}
