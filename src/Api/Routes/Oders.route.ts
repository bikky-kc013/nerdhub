import express from 'express';
const orderRouter = express.Router();
import {
  getAllOrder,
  getOrders,
  updateDeliveryStatus,
  updateOrderPayment,
} from '../Controllers/Orders.Controller';
import customerValidate from '../Middlewares/customerPermissions';
import token from '../Middlewares/token';
import adminValidate from '../Middlewares/adminPermissions';

orderRouter.get(
  '/api/v1/customers/orders/',
  customerValidate,
  token,
  getOrders
);
orderRouter.get('/api/v1/orders', adminValidate, getAllOrder);
orderRouter.patch(
  '/api/v1/deliverystatus/orders/:_id',
  adminValidate,
  updateDeliveryStatus
);

orderRouter.patch(
  '/api/v1/orders/payment/status/:_id',
  adminValidate,
  updateOrderPayment
);

export default orderRouter;
//