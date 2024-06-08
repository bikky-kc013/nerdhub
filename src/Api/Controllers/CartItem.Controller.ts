import { Request, Response, NextFunction } from 'express';
import { insertCartSchema } from '../../Schema/CartItem.Schema';
import CustomError from '../Middlewares/GlobalError';
import {
  insertCartItems,
  cartItems,
  deleteCartItems,
} from '../../Database/Repository/CartItems.Repository';
import { getCustomerById } from '../../Database/Repository/Customer.Repository';

interface RequestWithToken extends Request {
  tokenPayload?: { _id: string; role: 'customer' | 'admin' };
}

export const addToCart = async (
  req: RequestWithToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quantity = 1, bookId } = insertCartSchema.parse(req.body);
    const customerId = req.tokenPayload?._id;

    if (!customerId) {
      throw new CustomError('User ID not found in token', 401);
    }

    const addItems = await insertCartItems({ quantity, bookId }, customerId);
    if (!addItems) {
      throw new CustomError('Unable to insert the items to cart', 500);
    }

    res.json({
      status: 'Success',
      data: addItems,
      message: 'Successfully added the items to the cart',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getCartItems = async (
  req: RequestWithToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.tokenPayload?._id;

    if (!customerId) {
      throw new CustomError('User ID not found in token', 401);
    }

    const customer = await getCustomerById(customerId);
    if (!customer) {
      throw new CustomError('Customer not found', 404);
    }

    const items = await cartItems(customerId);
    if (!items) {
      return res.json({
        status: 'Success',
        data: [],
        message: 'Successfully fetched all the cart items',
      });
    }

    res.json({
      status: 'Success',
      data: items,
      message: 'Successfully fetched all the cart items',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const clearCart = async (
  req: RequestWithToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.tokenPayload?._id;

    if (!customerId) {
      throw new CustomError('User ID not found in token', 401);
    }

    await deleteCartItems(customerId);

    res.json({
      status: 'Success',
      message: 'Successfully cleared the cart',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
