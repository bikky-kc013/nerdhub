import { Request, Response, NextFunction } from 'express';
import {
  registerSchema,
  loginSchema,
  updateSchema,
} from '../../Types/Customer';
import {
  customerRegisterSchema,
  customerLoginSchema,
  customerUpdateSchema,
} from '../../Schema/Customer.Schema';
import {
  insertCustomer,
  findCustomerByEmail,
  getCustomerPasswordById,
  updateCustomer,
  getCustomerById,
} from '../../Database/Repository/Customer.Repository';
import CustomError from '../Middlewares/GlobalError';
import { VerifyString } from '../../Utils/Hash';
import { CreateToken } from '../../Utils/JWT';
import { ID } from '../../Types/Global';
import Unsync from '../../Utils/Unsync';
import path from 'path';

//!registerCustomer
export const registerCustomer = async (
  req: Request<{}, {}, registerSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password, confirmPassword } =
      customerRegisterSchema.parse(req.body);
    if (password !== confirmPassword) {
      throw new CustomError('Passwords do not match', 400);
    }
    const doExists = await findCustomerByEmail(email);
    if (doExists) {
      throw new CustomError(
        'The customer with this email is already registered, please try again with a different email',
        409
      );
    }
    const addCustomer = await insertCustomer(fullName, password, email);
    res.json({
      status: 'Success',
      data: addCustomer,
      message: 'Customer added successfully',
    });
  } catch (error) {
    next(error);
  }
};

//!loginCustomer
export const loginCustomer = async (
  req: Request<{}, {}, loginSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = customerLoginSchema.parse(req.body);
    const doExists = await findCustomerByEmail(email);
    if (!doExists) {
      throw new CustomError(
        'The customer with this email is not registered, please register and try again',
        404
      );
    }
    const customerPassword = await getCustomerPasswordById(doExists);
    if (!customerPassword) {
      throw new CustomError('Internal Server Error', 500);
    }
    const isValidPassword = await VerifyString(password, customerPassword);
    if (!isValidPassword) {
      throw new CustomError('Please enter valid credentials', 403);
    }
    const token = CreateToken({
      data: { role: 'customer', _id: doExists._id },
      secretKey: process.env.SECRET_ACCESS_KEY as string,
      exp: '30d',
    });
    res.json({
      status: 'Success',
      token: token,
      data: doExists,
      message: 'Successfully logged in',
    });
  } catch (error) {
    console.error('LoginError', error);
    next(error);
  }
};

//!updateCustomer
export const updateCustomers = async (
  req: Request<ID, {}, updateSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const data = customerUpdateSchema.parse(req.body);
    const image = req.file?.filename;
    const customer = await getCustomerById(_id);
    if (!customer) {
      throw new CustomError('Customer with this ID not found', 404);
    }
    if (image && customer.image) {
      await Unsync(
        path.join(__dirname, `../../../public/customer/${customer.image}`)
      );
    }
    const customerUpdate = await updateCustomer(data, image, _id);
    res.json({
      status: 'Success',
      data: customerUpdate,
      message: 'Customer updated successfully',
    });
  } catch (error) {
    const image = req.file?.filename;
    if (image) {
      await Unsync(path.join(__dirname, `../../../public/customer/${image}`));
    }
    console.error('UpdateError', error);
    next(error);
  }
};

//!getCustomer
export const getCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.tokenPayload!._id;
    const doExists = await getCustomerById(_id);
    if (!doExists) {
      throw new CustomError('Sorry, customer not availaible', 400);
    }
    res.json({
      status: 'Success',
      data: doExists,
      message: 'Successfully fetched the customer',
    });
  } catch (error) {
    console.error('LoginError', error);
    next(error);
  }
};
