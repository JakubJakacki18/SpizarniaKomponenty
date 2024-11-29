import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
  import { Product } from './Product';
import { Category } from './Category';
  
  @Entity()
  export class Container {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => Category, (category) => category.container)
    @JoinColumn() // Klucz obcy w tabeli Container wskazuje na Category
    category: Category;
  
    @OneToMany(() => Product, (product) => product.container, { onDelete: "SET NULL" })
    products: Product[];
    
  }