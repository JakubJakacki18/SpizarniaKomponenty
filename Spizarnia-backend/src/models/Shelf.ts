import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Container } from './Container';
import { Product } from './Product';

@Entity()
export class Shelf {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Container, (container) => container.shelf)
  containers: Container[];

  @OneToMany(() => Product, (product) => product.shelf)
  products: Container[];
}