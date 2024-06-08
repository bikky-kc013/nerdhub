import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Category } from './Category';
import { SubCategory } from './SubCategory';
import { cartItem } from './CartItems';
import { OrderItems } from './OrderItems';

@Entity()
export class Book {
  @PrimaryColumn({
    length: 100,
    type: 'varchar',
  })
  _id: string;

  @Column({
    length: 1000,
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'text',
  })
  image: string;

  @Column({
    type: 'int',
  })
  price: string;

  @Column({
    type: 'int',
  })
  discount: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  slug: string;

  @Column({
    length: 3000,
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isFeatured: any;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => SubCategory)
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: SubCategory;

  @OneToMany(() => cartItem, (cart) => cart.book)
  cartItem: cartItem;

  @Column({ nullable: true, type: 'int' })
  quantity: string;

  @OneToMany(() => OrderItems, (data) => data)
  orderItem: OrderItems;

  @CreateDateColumn()
  inserted: Date;

  @UpdateDateColumn()
  updated: Date;
}
