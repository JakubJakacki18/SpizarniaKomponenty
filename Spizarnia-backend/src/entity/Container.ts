import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { Product } from './Product';
  import { Shelf } from './Shelf';
  
  @Entity()
  export class Container {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    maxQuantity: number;
  
    @OneToMany(() => Product, (product) => product.container, { onDelete: "SET NULL" })
    products: Product[];

  
    @ManyToOne(() => Shelf, (shelf) => shelf.containers)
    shelf: Shelf;
    
  }