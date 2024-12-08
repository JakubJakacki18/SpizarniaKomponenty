import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
import { Container } from './Container';
import {ProductModel} from './ProductModel'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  categoryName!: string;

  @OneToOne(() => Container, (container) => container.category, { cascade: true, onDelete: 'CASCADE' })
  container!: Container;

  @OneToMany(() => ProductModel, (productModel) => productModel.category)
  productModels?: ProductModel[];
}
