import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  } from 'typeorm';

import { ProductModel } from './ProductModel';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "date", nullable: false })
    expirationDate!: Date;

    @Column({ type: "date", nullable: false })
    purchaseDate!: Date;

    @ManyToOne(() => ProductModel, (productModel) => productModel.products)
    productModel?: ProductModel;
}
