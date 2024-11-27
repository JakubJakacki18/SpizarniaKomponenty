import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { ProductModel } from './ProductModel';
  import { Container } from './Container';
import { Shelf } from './Shelf';

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
  @ManyToOne(() => Shelf, (shelf) => shelf.products, { onDelete: "SET NULL" })
  shelf: Shelf;

  validateRelations() {
    if (this.shelf && this.container) {
      throw new Error('Produkt nie może być jednocześnie na półce i w pojemniku.');
    }
}
}
