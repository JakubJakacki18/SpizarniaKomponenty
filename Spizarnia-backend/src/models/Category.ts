import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
import {ProductModel} from './ProductModel'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  categoryName!: string;

  @OneToMany(() => ProductModel, (productModel) => productModel.category)
  productModels?: ProductModel[];
}
