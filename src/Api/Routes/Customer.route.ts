import express from 'express';
import {
  registerCustomer,
  loginCustomer,
  updateCustomers,
  getCustomer,
} from '../Controllers/Customer.Controller';
const customerRouter = express.Router();
import { customerUpload } from '../Middlewares/fileUpload';
import customerValidate from '../Middlewares/customerPermissions';
import token from '../Middlewares/token';

//!post
customerRouter.post('/api/v1/customers/register', registerCustomer);
customerRouter.post('/api/v1/customers/login', loginCustomer);

//!patch
customerRouter.patch(
  '/api/v1/customers/:_id',
  customerUpload.single('image'),
  updateCustomers
);

//!get
customerRouter.get(
  '/api/v1/customer/profile',
  customerValidate,
  token,
  getCustomer
);

export default customerRouter;
