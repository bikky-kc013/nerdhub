import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from './Category';
import { Book } from './Book';

@Entity('subCategory')
export class SubCategory {
  @PrimaryColumn({
    length: 100,
    type: 'varchar',
  })
  _id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  slug: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  image: string;

  @ManyToOne(() => Category, (category) => category.subCategories, {
    eager: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Book, (data) => data.subCategory)
  books: Book[];

  @CreateDateColumn()
  inserted: Date;

  @UpdateDateColumn()
  updated: Date;
}
