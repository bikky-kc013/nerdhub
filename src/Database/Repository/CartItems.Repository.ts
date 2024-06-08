import Unique from '../../Utils/Crypto';
import { AppDataSource } from '../Connection';
import { cartItem } from '../Models/CartItems';
import { cartItemInsertType } from '../../Types/CartItems';
import { Customer } from '../Models/Customer';
import { Book } from '../Models/Book';
import CustomError from '../../Api/Middlewares/GlobalError';

export const insertCartItems = async (
  { quantity, bookId }: cartItemInsertType,
  customerId: Customer | string
): Promise<cartItem | null> => {
  try {
    const repo = AppDataSource.getRepository(cartItem);
    const bookRepo = AppDataSource.getRepository(Book);
    const bookPrice = await bookRepo.findOne({
      where: { _id: bookId },
      select: ['price'],
    });
    if (!bookPrice) throw new CustomError('Something went wrong', 500);
    const price: string = bookPrice?.price;
    const totalPrice = quantity * parseFloat(price);
    const id = Unique();
    const addedItems = await repo.query(
      `INSERT INTO cart_item (_id, quantity, userId, bookId, price) VALUES (?, ?, ?, ?, ?)`,
      [id, quantity, customerId, bookId, totalPrice]
    );
    return repo.findOne({ where: { _id: id } });
  } catch (error) {
    console.log(error);

    throw Error('Something went wrong');
  }
};

export const cartItems = async (
  customer: string
): Promise<cartItem[] | null> => {
  try {
    const repo = AppDataSource.getRepository(cartItem);
    const items = await repo.query(`SELECT * FROM cart_item WHERE userId = ?`, [
      customer,
    ]);
    return items;
  } catch (error) {
    throw error;
  }
};

export const deleteCartItems = async (customerId: string): Promise<void> => {
  try {
    const repo = AppDataSource.getRepository(cartItem);
    await repo.query(`DELETE FROM cart_item WHERE userId = ? `, [customerId]);
  } catch (error) {
    throw error;
  }
};
