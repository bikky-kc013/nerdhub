import express from 'express';
const checkOutRouter = express.Router();
import {
  checkOut,
  getOrder_itemByOrderId,
} from '../Controllers/OrderItems.Controller';
import customerValidate from '../Middlewares/customerPermissions';
import token from '../Middlewares/token';

checkOutRouter.post('/api/v1/checkout', customerValidate, token, checkOut);
checkOutRouter.get(
  '/api/v1/orderitems/:_id',
  customerValidate,
  token,
  getOrder_itemByOrderId
);
checkOutRouter.get('/api/v1/failure');

export default checkOutRouter;
