import Unique from '../../Utils/Crypto';
import { AppDataSource } from '../Connection';
import { Customer } from '../Models/Customer';
import CustomError from '../../Api/Middlewares/GlobalError';
import { Orders } from '../Models/Orders';

export const getAllOrders = async (): Promise<Orders[] | undefined> => {
  try {
    const repo = AppDataSource.getRepository(Orders);
    const orders = await repo.find();
    return orders;
  } catch (error) {
    throw error;
  }
};

export const addOrder = async (
  orderId: string,
  orderMethod: string,
  status: string,
  userId: string
): Promise<Orders> => {
  try {
    const repo = AppDataSource.getRepository(Orders);
    const savedOrder = await repo.save({
      _id: Unique(),
      orderMethod,
      status,
      orderId,
      userId,
    });
    return savedOrder;
  } catch (error) {
    throw error;
  }
};

export const getOrdersByUserId = async (
  userId: string
): Promise<Orders[] | null> => {
  try {
    const repo = AppDataSource.getRepository(Orders);
    const getOrders = await repo.find({ where: { userId } });
    return getOrders;
  } catch (error) {
    throw error;
  }
};

export const patchDeliveryStatus = async (
  status: string | undefined,
  _id: string
): Promise<Orders[] | any> => {
  try {
    const repo = AppDataSource.getRepository(Orders);
    const getOrders = await repo.findOne({ where: { _id } });
    if (!getOrders) {
      throw new CustomError('Order with the provided id not found', 404);
    }
    const saveData = await repo.save({
      _id,
      orderId: getOrders.orderId,
      deliveryStatus: status,
    });
    return saveData;
  } catch (error) {
    throw error;
  }
};

export const setOrderPaymentStatus = async (
  status: string,
  orderId: string
) => {
  try {
    const repo = AppDataSource.getRepository(Orders);
    const findOrder = await repo.findOne({ where: { orderId } });
    if (!findOrder) {
      throw new CustomError('Order not found', 400);
    }
    const updateStatus = await repo.save({
      _id: findOrder._id,
      status: status,
    });
  } catch (error) {
    throw error;
  }
};
