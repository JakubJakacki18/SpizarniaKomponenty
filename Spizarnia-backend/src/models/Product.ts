import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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
  
    @ManyToOne(() => ProductModel, (productModel) => productModel.products, {
      onDelete: "CASCADE"
    })
    @JoinColumn({name: "productModelId"})
    productModel?: ProductModel;
}
