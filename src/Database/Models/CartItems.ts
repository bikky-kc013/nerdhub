import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './Book';
import { Customer } from './Customer';

@Entity()
export class cartItem {
  @PrimaryColumn({
    length: 100,
    type: 'varchar',
  })
  _id: string;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  price: number;

  @ManyToOne(() => Book, { eager: true, nullable: true })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => Customer, { eager: true, nullable: true })
  @JoinColumn({ name: 'userId' })
  customer: Customer;

  @CreateDateColumn()
  inserted: Date;

  @UpdateDateColumn()
  updated: Date;
}
