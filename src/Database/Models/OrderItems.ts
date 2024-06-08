import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './Customer';
import { Book } from './Book';
import { Orders } from './Orders';

@Entity()
export class OrderItems {
  @PrimaryColumn({
    type: 'varchar',
    length: 255,
  })
  _id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  orderId: string;

  @Column({
    type: 'varchar',
    length: 1000,
    default: null,
    select: false,
  })
  sessionId: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'Pending',
  })
  paymentStatus: string;



  @Column({
    type: 'varchar',
    length: 255,
  })
  quantity: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  price: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  paymentMethod: string;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => Customer, { nullable: true })
  @JoinColumn({ name: 'userId' })
  customer: Customer;

  @CreateDateColumn()
  inserted: Date;

  @UpdateDateColumn()
  updated: Date;
}
