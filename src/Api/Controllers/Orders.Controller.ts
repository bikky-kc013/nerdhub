import { Request, Response, NextFunction } from 'express';
import CustomError from '../Middlewares/GlobalError';
import {
  getAllOrders,
  getOrdersByUserId,
  patchDeliveryStatus,
  setOrderPaymentStatus
} from '../../Database/Repository/Orders.Repository';

export const getAllOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await getAllOrders();
    res.json({
      status: 'success',
      data: orders,
      message: 'Successfully fetched all the orders',
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.tokenPayload?._id as string;
    const orders = await getOrdersByUserId(userId);
    console.log(orders);

    res.json({
      status: 'success',
      data: orders,
      message: 'Successfully fetched all the orders',
    });
  } catch (error) {
    next(error);
  }
};

export const updateDeliveryStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const { status } = req.body;
    const data = await patchDeliveryStatus(status, _id);
    res.json({
      status: 'Success',
      data: data,
      message: 'Successfully updated the delivery Status',
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderPayment = async (req:Request,res:Response,next:NextFunction) =>{
    try{
        const { status } = req.body;
        if(!status) throw new CustomError("Please specify the payment status", 400);
        const orderId = req.params._id;        
        const updated = await setOrderPaymentStatus(status, orderId);
        res.json({
            status:"Success",
            message:"Successfully updated  the payment"
        })        
    }catch(error){
        next(error);
    }
}
