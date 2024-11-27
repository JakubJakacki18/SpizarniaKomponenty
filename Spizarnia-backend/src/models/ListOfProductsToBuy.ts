import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { ProductModel } from './ProductModel';
  
  @Entity()
  export class ListOfProductsToBuy {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToMany(() => ProductModel, (productModel) => productModel.listOfProductsToBuy)
    products: ProductModel;
  
    @Column()
    quantity: number;
  }