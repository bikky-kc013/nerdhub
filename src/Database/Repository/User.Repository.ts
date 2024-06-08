import { Admin } from '../Models/User';
import {} from 'typeorm';
import { AppDataSource } from '../Connection';
import Unique from '../../Utils/Crypto';
import { HashString } from '../../Utils/Hash';
import { Customer } from '../Models/Customer';
import CustomError from '../../Api/Middlewares/GlobalError';

//!InsertAdmin
export const addAdmin = async (
  username: string,
  password: string
): Promise<Admin> => {
  try {
    const adminRepo = AppDataSource.getRepository(Admin);
    const hashedPassword = await HashString(password);
    const newAdmin = await adminRepo.save({
      _id: Unique(),
      username: username,
      password: hashedPassword,
    });
    return { ...newAdmin, password: '' };
  } catch (error) {
    throw error;
  }
};

//!FindAdmin
export const findAdminByUserName = async (
  username: string
): Promise<boolean | undefined> => {
  try {
    const adminRepo = AppDataSource.getRepository(Admin);
    const checkAdmin = await adminRepo.findOne({ where: { username } });
    return !!checkAdmin;
  } catch (error) {
    throw error;
  }
};

//!GetPassword
export const getAdminPassword = async (
  username: string
): Promise<string | undefined> => {
  try {
    const adminRepo = AppDataSource.getRepository(Admin);
    const adminPassword = await adminRepo.findOne({
      where: { username },
      select: ['password'],
    });
    return adminPassword ? adminPassword.password : undefined;
  } catch (error) {
    throw error;
  }
};

//!GetID
export const getAdminId = async (
  username: string
): Promise<string | undefined> => {
  try {
    const adminRepo = AppDataSource.getRepository(Admin);
    const adminId = await adminRepo.findOne({
      where: { username },
      select: ['_id'],
    });
    return adminId ? adminId._id : undefined;
  } catch (error) {
    throw error;
  }
};

//!FindAdminById
export const findAdminById = async (_id: string): Promise<Admin | null> => {
  try {
    const adminRepo = AppDataSource.getRepository(Admin);
    const checkAdmin = await adminRepo.findOne({ where: { _id } });
    return checkAdmin;
  } catch (error) {
    throw error;
  }
};

//!GetallAdmins
export const getAdmins = async (): Promise<Admin[] | undefined> => {
  const adminRepo = AppDataSource.getRepository(Admin);
  const getAdmins = await adminRepo.find();
  console.log(getAdmins);
  return getAdmins ? getAdmins : undefined;
};

//!GetAllCustomers
export const getCustomers = async (): Promise<object | undefined> => {
  try {
    const customerRepo = AppDataSource.getRepository(Customer);
    const allCustomers = await customerRepo.find();
    return allCustomers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//!getBlockStatus
export const blockCustomer = async (
  _id: string,
  blockedMessage: string
): Promise<boolean | undefined> => {
  try {
    const customerRepo = AppDataSource.getRepository(Customer);
    const blockStatus = await customerRepo.findOne({
      where: { _id },
      select: ['isBlocked'],
    });
    if (!blockStatus) {
      throw new CustomError('Customer with this id is not found', 404);
    }
    if (blockStatus.isBlocked) {
      throw new CustomError('The customer is already blocked', 409);
    }
    blockStatus.isBlocked = true;
    blockStatus.blockedMessage = blockedMessage;
    blockStatus._id = _id;
    const secureBlock = await customerRepo.save(blockStatus);
    return secureBlock ? true : undefined;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//!ListBlockedCustomers
export const getBlockedCustomers = async (): Promise<object | undefined> => {
  try {
    const customerRepo = AppDataSource.getRepository(Customer);
    const blocked = await customerRepo.find({ where: { isBlocked: true } });
    return blocked ? blocked : undefined;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//!UnblockCUstomer
export const unblockCustomerById = async (
  _id: string
): Promise<Object | undefined> => {
  try {
    const customerRepo = AppDataSource.getRepository(Customer);
    const blockStatus = await customerRepo.findOne({
      where: { _id },
      select: ['isBlocked'],
    });
    if (!blockStatus) {
      throw new CustomError('Customer with this id is not found', 404);
    }
    if (!blockStatus.isBlocked) {
      throw new CustomError('The customer was not blocked', 409);
    }
    blockStatus.isBlocked = false;
    blockStatus.blockedMessage = ' ';
    blockStatus._id = _id;
    const unblocked = await customerRepo.save(blockStatus);
    return unblocked ? true : undefined;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//!removeAdminById
export const deleteAdminbyId = async (admin: Admin): Promise<Admin> => {
  try {
    const adminRepo = AppDataSource.getRepository(Admin);
    const remove = await adminRepo.remove(admin);
    return remove;
  } catch (error) {
    throw error;
  }
};

//!changeAdminPassword
export const changePassword = async (
  admin: Admin,
  password: string
): Promise<Admin> => {
  try {
    const adminRepo = AppDataSource.getRepository(Admin);
    const newPassword = adminRepo.save({
      _id: admin._id,
      password,
    });
    return newPassword;
  } catch (error) {
    throw error;
  }
};
