import { DataSource, Or } from 'typeorm';
import { Init1692703581634 } from './Migrations/1692703581634-init';
import { Admin } from './Models/User';
import { Customer } from './Models/Customer';
import { Book } from './Models/Book';
import { Category } from './Models/Category';
import { SubCategory } from './Models/SubCategory';
import { cartItem } from './Models/CartItems';
import { Slider } from './Models/Slider';
import { Form } from './Models/Form';
import { Blog } from './Models/Blog';
import { Orders } from './Models/Orders';
import { OrderItems } from './Models/OrderItems';

export const AppDataSource: DataSource = new DataSource({
  type: 'mysql',
  host:
    process.env.ENV === 'development'
      ? process.env.DB_DEV_HOST
      : process.env.DB_PROD_HOST,
  port:
    process.env.ENV === 'development'
      ? (process.env.DB_DEV_PORT as number | undefined)
      : (process.env.DB_PROD_PORT as number | undefined),
  username:
    process.env.ENV === 'development'
      ? process.env.DB_DEV_USER
      : process.env.DB_PROD_USER,
  password:
    process.env.ENV === 'development'
      ? process.env.DB_DEV_PASSWORD
      : process.env.DB_PROD_PASSWORD,
  database:
    process.env.ENV === 'development'
      ? process.env.DB_DEV_DATABASE
      : process.env.DB_PROD_DATABASE,
  logging: true,
  synchronize: false,
  entities: [
    Admin,
    Customer,
    Category,
    SubCategory,
    cartItem,
    Orders,
    Slider,
    Form,
    Blog,
    OrderItems,
    Book,
  ],
  migrations: [Init1692703581634],
});
