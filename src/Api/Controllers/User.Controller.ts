import { Request, Response, NextFunction } from 'express';
import { adminLoginSchema } from '../../Schema/User.Schema';
import { LoginSchema } from '../../Types/User';
import { VerifyString } from '../../Utils/Hash';
import {
  findAdminByUserName,
  getAdminPassword,
  getAdminId,
  addAdmin,
  getAdmins,
  getCustomers,
  blockCustomer,
  getBlockedCustomers,
  unblockCustomerById,
  findAdminById,
  deleteAdminbyId,
  changePassword,
} from '../../Database/Repository/User.Repository';
import CustomError from '../Middlewares/GlobalError';
import { CreateToken } from '../../Utils/JWT';
import { ID } from '../../Types/Global';
import { IdSchema, blockSchema } from '../../Schema/User.Schema';
import { blockCustomerType, changePasswordType } from '../../Types/Global';
import { passwordChangeSchema } from '../../Schema/Global.Schema';
import { HashString } from '../../Utils/Hash';

//!LoginAdmin
export const adminLogin = async (
  req: Request<{}, {}, LoginSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    adminLoginSchema.parse({ username, password });
    const doesAdminExists = await findAdminByUserName(username);
    if (doesAdminExists == false)
      throw new CustomError('Sorry,Admin doesnot exists', 400);
    const adminPassword: string | undefined = await getAdminPassword(username);
    if (adminPassword === undefined)
      throw new CustomError('Internal Server Error', 500);
    const isValidAdmin = await VerifyString(password, adminPassword);
    if (!isValidAdmin)
      throw new CustomError('Sorry, please enter the correct password', 403);
    const adminId = await getAdminId(username);
    console.log(adminId);

    const token = CreateToken({
      data: {
        role: 'admin',
        _id: adminId,
      },
      secretKey: process.env.SECRET_ACCESS_KEY as string,
      exp: '30d',
    });
    res.status(200).json({
      success: true,
      data: {
        id: adminId,
        token: token,
      },
      message: 'Login successful',
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

//!CreateAdmin
export const createAdmin = async (
  req: Request<{}, {}, LoginSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    adminLoginSchema.parse({ username, password });
    const doesAdminExists = await findAdminByUserName(username);
    if (doesAdminExists) {
      throw new CustomError(
        'Sorry, User with this username already exists',
        409
      );
    }
    const insertAdmin = await addAdmin(username, password);
    if (!insertAdmin) throw new CustomError('Unable to add Admin', 500);
    res.json({
      status: 'Success',
      data: insertAdmin,
      message: 'Admin added successfully',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//!GetAdmins
export const getAllAdmin = async (
  req: Request<ID, {}, LoginSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const allAdmins = await getAdmins();
    res.json({
      status: 'Success',
      data: allAdmins,
      message: 'Successfully, Fetched all the admins',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//!listCustomers
export const getAllCustomers = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCustomers = await getCustomers();
    res.json({
      status: 'Success',
      data: allCustomers,
      message: 'Successfully fetched all the customers',
    });
  } catch (error) {
    next(error);
  }
};

//!BlockCustomer
export const BlockCustomer = async (
  req: Request<{}, {}, blockCustomerType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, blockedMessage } = blockSchema.parse(req.body);
    const block = await blockCustomer(_id, blockedMessage);
    res.json({
      status: 'Success',
      message: 'Successfully blocked the customer',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//!list blockedCustomers
export const listBlockedCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listBlockedCustomers = await getBlockedCustomers();
    res.json({
      status: 'Success',
      data: listBlockedCustomers,
      message: 'Successfully fetched all the blocked customers',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//!unblockCustomer
export const unblockCustomer = async (
  req: Request<{}, {}, ID>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = IdSchema.parse(req.body);
    const unblock = await unblockCustomerById(_id);
    res.json({
      status: 'System',
      message: 'The customer was Successfully Unblocked',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//!healthcheck
export const healthCheck = async (
  req: Request<{}, {}, ID>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      status: 'Success',
      message: 'This is a valid token',
    });
  } catch (error) {
    next(error);
  }
};

//!removeAdmin
export const removeAdmin = async (
  req: Request<ID, {}, ID>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    if (!_id) throw new CustomError('Admin not Found', 404);
    const admin = await findAdminById(_id);
    if (!admin) throw new CustomError('Admin not Found', 404);
    const remove = await deleteAdminbyId(admin);
    res.json({
      status: 'Success',
      message: 'Successfully Removed Admin',
    });
  } catch (error) {
    next(error);
  }
};

//!getAdmin
export const getAdmin = async (
  req: Request<ID, {}, LoginSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const admin = await findAdminById(_id);
    if (!admin) {
      throw new CustomError('Sorry,Admin not found', 400);
    }
    res.json({
      status: 'Success',
      data: admin,
      message: 'Successfully, Fetched the admin',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//!changeAdminPassword
export const changeAdminPassword = async (
  req: Request<ID, {}, changePasswordType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const { oldPassword, newPassword, confirmPassword } =
      passwordChangeSchema.parse(req.body);

    const admin = await findAdminById(_id);
    if (!admin) throw new CustomError('Admin not Found', 404);
    const username = admin.username;
    const getoldPassword = await getAdminPassword(username);
    const getPass = getoldPassword as string;
    const adminOldPassword = await VerifyString(oldPassword, getPass);
    console.log(adminOldPassword);

    if (!adminOldPassword)
      throw new CustomError('Old password didnot matched', 409);
    if (oldPassword === newPassword)
      throw new CustomError(
        'Old Password and New Password cannot be same',
        409
      );
    const hashedPassword = await HashString(newPassword);
    const data = await changePassword(admin, hashedPassword);
    if (!data) throw new CustomError('Unable to Change Password', 400);
    res.json({
      status: 'Success',
      message: 'Successfully, changeed the admin password',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
