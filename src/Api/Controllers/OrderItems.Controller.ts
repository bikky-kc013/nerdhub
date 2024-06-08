import { Request, Response, NextFunction } from 'express';
import CustomError from '../Middlewares/GlobalError';
import {
  orderItems,
  getOrderItem,
} from '../../Database/Repository/OrderItems.Repository';
import { addOrder } from '../../Database/Repository/Orders.Repository';
import Unique from '../../Utils/Crypto';
import { deleteCartItems } from '../../Database/Repository/CartItems.Repository';

export const checkOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const identifier = Unique();
    const { paymentMethod } = req.body;
    const userId: string = req.tokenPayload?._id as string;
    if (!paymentMethod)
      throw new CustomError('Payment Method is required', 400);
    if (paymentMethod === 'cod') {
      const orderId = Unique();
      const addedItems = await orderItems(
        orderId,
        paymentMethod,
        userId
      );
      await addOrder(orderId, 'Offline', 'Pending', userId);
      await deleteCartItems(userId);
      res.json({
        status: 'Success',
        data: addedItems,
        message: 'Successfully Ordered the items',
      });
    }


  } catch (error) {
    next(error);
  }
};



export const getOrder_itemByOrderId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const orders = await getOrderItem(_id);
    if (!orders) {
      return res.json({
        status: 'Success',
        data: [],
        message: 'Successfully Fetched all the order-items',
      });
    }
    res.json({
      status: 'Success',
      data: orders,
      message: 'Successfully Fetched all the order-items',
    });
  } catch (error) {
    next(error);
  }
};
