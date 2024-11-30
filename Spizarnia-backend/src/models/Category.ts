import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Container } from './Container';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  categoryName: string;

  @OneToMany(() => Container, (container) => container.category)
  containers: Container[];

  @OneToMany(() => ProductModel, (productModel) => productModel.category)
  productModels: ProductModel[];
}
