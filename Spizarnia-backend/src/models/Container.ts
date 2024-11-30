import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { Product } from './Product';
  import { Category } from './Category';
  
  @Entity()
  export class Container {
    @PrimaryGeneratedColumn()
    id: number;
  
    //Na razie zostawiam, wydaje mi sie ze przyda sie przy wyswietlaniu.
    @Column()
    name: string;
  
    @OneToOne(() => Product, (product) => product.container, { onDelete: "SET NULL" })
    products: Product[];

    @ManyToOne(() => Category, (category) => category.containers)
    category: Category
    
  }