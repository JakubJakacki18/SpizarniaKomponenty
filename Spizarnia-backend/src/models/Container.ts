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
  
    //Na razie zostawiam, wydaje mi sie ze przyda sie przy wyswietlaniu.
    @Column()
    name: string;

    @OneToOne(() => Category, (category) => category.container)
    @JoinColumn() // Klucz obcy w tabeli Container wskazuje na Category, bez tego robi się to automatycznie i mogą dymy być
    category: Category;
  
    @OneToMany(() => Product, (product) => product.container, { cascade : true })
    products: Product[];
}