import express from 'express';
const cartItemsRouter = express.Router();
import {
  addToCart,
  getCartItems,
  clearCart,
} from '../Controllers/CartItem.Controller';
import customerValidate from '../Middlewares/customerPermissions';
import token from '../Middlewares/token';

cartItemsRouter.post('/api/v1/cartitems', customerValidate, token, addToCart);
cartItemsRouter.get('/api/v1/cartitems', customerValidate, token, getCartItems);
cartItemsRouter.delete('/api/v1/cartitems', customerValidate, token, clearCart);

export default cartItemsRouter;
