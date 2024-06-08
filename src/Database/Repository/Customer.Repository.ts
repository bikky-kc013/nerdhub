import {} from 'typeorm';
import Unique from '../../Utils/Crypto';
import { Customer } from '../Models/Customer';
import { AppDataSource } from '../Connection';
import CustomError from '../../Api/Middlewares/GlobalError';
import { HashString } from '../../Utils/Hash';
import { updateSchema } from '../../Types/Customer';

//!addCustomer
export const insertCustomer = async (
  fullName: string,
  password: string,
  email: string
): Promise<object | undefined> => {
  try {
    const customerRepo = AppDataSource.getRepository(Customer);
    const hashedPassword = await HashString(password);
    const newCustomer = new Customer();
    newCustomer._id = Unique();
    newCustomer.fullName = fullName;
    newCustomer.email = email;
    newCustomer.password = hashedPassword;
    const savedCustomer = await customerRepo.save(newCustomer);
    const data = {
      _id: savedCustomer._id,
      fullName: savedCustomer.fullName,
      email: savedCustomer.phoneNumber,
      inserted: savedCustomer.inserted,
      updated: savedCustomer.updated,
    };
    return { data };
  } catch (error) {
    console.log(error);
    throw new CustomError('Unable to insert Customer', 500);
  }
};

//!FindCustomer
export const findCustomerByEmail = async (
  email: string
): Promise<Customer | null> => {
  try {
    const customerRepo = AppDataSource.getRepository(Customer);
    const checkCustomer = await customerRepo.findOne({ where: { email } });
    return checkCustomer;
  } catch (error) {
    throw error;
  }
};

//!getPasswordById
export const getCustomerPasswordById = async (
  customer: Customer
): Promise<string | undefined> => {
  try {
    const customerRepo = AppDataSource.getRepository(Customer);
    const checkPassword = await customerRepo.findOne({
      where: { _id: customer._id },
      select: ['password'],
    });
    return checkPassword ? checkPassword.password : undefined;
  } catch (error) {
    throw error;
  }
};

//!updateCustomer
export const updateCustomer = async (
  data: updateSchema,
  image: string | undefined,
  _id: string
): Promise<Customer> => {
  try {
    const customerRepo = AppDataSource.getRepository(Customer);
    const updateCustomer = await customerRepo.save({
      _id: _id,
      address: data.address,
      image: image,
      fullName: data.fullName,
      email: data.email,
    });
    return updateCustomer;
  } catch (error) {
    throw error;
  }
};

//!GetCustomerById
export const getCustomerById = async (
  _id: string
): Promise<Customer | null> => {
  try {
    const customerRepo = AppDataSource.getRepository(Customer);
    const customer = await customerRepo.findOne({ where: { _id } });
    return customer;
  } catch (error) {
    throw error;
  }
};
