import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Container {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("int")
    maxQuantity!: number;

    @OneToMany(() => Product, (product) => product.container, { onDelete: "SET NULL" })
    products!: Product[];
}
