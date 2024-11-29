import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
import { Container } from './Container';



@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @OneToOne(() => Container, (container) => container.category, { cascade: true, onDelete: 'CASCADE' })
  container: Container;
}