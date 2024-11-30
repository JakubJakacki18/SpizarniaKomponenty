import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  } from 'typeorm';

import { ProductModel } from './ProductModel';
import { Container } from './Container';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date", nullable: false })
    expirationDate: Date;

    @Column({ type: "date", nullable: false })
    purchaseDate: Date;

    @ManyToOne(() => ProductModel, (productModel) => productModel.products)
    productModel: ProductModel;

    @ManyToOne(() => Container, (container) => container.products, { onDelete: "SET NULL" })
    container: Container;

}
