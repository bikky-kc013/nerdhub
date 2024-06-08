import { AppDataSource } from '../Connection';
import { OrderItems } from '../Models/OrderItems';
import { cartItem } from '../Models/CartItems';
import Unique from '../../Utils/Crypto';
import { Customer } from '../Models/Customer';

export const orderItems = async (
  orderId: string,
  paymentMethod: string,
  userId: string,
  sessionId?: string | undefined
): Promise<any> => {
  try {
    const repo = AppDataSource.getRepository(OrderItems);
    const customer = (await AppDataSource.getRepository(Customer).findOne({
      where: { _id: userId },
    })) as Customer;

    const cartItems: any[] = await AppDataSource.getRepository(cartItem).query(
      `SELECT * FROM cart_item WHERE  userId = ? `,
      [userId]
    );
    cartItems.forEach(async (data) => {
      const quantity = data.quantity;
      const price = data.price;
      const bookId = data.bookId;
      await repo.save({
        _id: Unique(),
        orderId,
        paymentMethod,
        customer: customer,
        quantity,
        price,
        book: bookId,
        sessionId,
      });
    });
  } catch (error) {
    throw error;
  }
};

export const setPaymentStatus = async (
  status: string,
  orderId: string,
  userId: string | any
) => {
  try {
    const repo = AppDataSource.getRepository(OrderItems);
    const customer = (await AppDataSource.getRepository(Customer).findOne({
      where: { _id: userId },
    })) as Customer;
    const orderItems = await repo.find({ where: { orderId: orderId } });
    orderItems.map(async (data) => {
      await repo.save({
        _id: data._id,
        paymentStatus: status,
        userId: customer,
      });
    });
  } catch (error) {
    throw error;
  }
};

export const getOrderItem = async (orderId: string): Promise<OrderItems[]> => {
  try {
    const repo = AppDataSource.getRepository(OrderItems);
    const orders = await repo.find({
      where: { orderId },
      order: {
        inserted: 'ASC',
      },
    });
    return orders;
  } catch (error) {
    throw error;
  }
};

export const getUserIdByOrderId = async (orderId: string) => {
  try {
    const repo = AppDataSource.getRepository(OrderItems);
    let userId: any = null;
    const finder = await repo.query(
      `SELECT userId FROM order_items WHERE orderId = ? `,
      [orderId]
    );
    finder.map((data: any) => {
      userId = data;
    });
    return userId.userId;
  } catch (error) {
    throw error;
  }
};
