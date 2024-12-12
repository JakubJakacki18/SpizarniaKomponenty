import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  import { ProductModel } from './ProductModel';
  
  @Entity()
  export class ListOfProductsToBuy {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @ManyToOne(() => ProductModel, (productModel) => productModel.listOfProductsToBuy)
    products?: ProductModel;
  
    @Column()
    quantity!: number;
  }