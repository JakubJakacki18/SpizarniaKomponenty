import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {Container} from "./Container"
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date", nullable: false })
    expirationDate: Date;

    @Column({ type: "date", nullable: false })
    purchaseDate: Date;









    @ManyToOne(() => Container, (container) => container.products, { onDelete: "SET NULL" })
    container: Container;
}
