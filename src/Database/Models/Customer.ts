import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { cartItem } from './CartItems';

@Entity()
export class Customer {
  @PrimaryColumn({
    length: 100,
    type: 'varchar',
  })
  _id: string;

  @Column({
    length: 100,
    type: 'varchar',
  })
  fullName: string;

  @Column({
    length: 100,
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  image: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'phoneNumber',
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  verified: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isBlocked: boolean;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  blockedMessage: string;

  @OneToOne(() => cartItem)
  cartItem: cartItem;

  @CreateDateColumn()
  inserted: Date;

  @UpdateDateColumn()
  updated: Date;
}
