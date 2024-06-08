import { NextFunction, Request, Response } from 'express';
import {
  insertform,
  getFormByEmai,
  getForms,
} from '../../Database/Repository/Form.Repository';
import { formType } from '../../Types/Form';
import { formSchema } from '../../Schema/Form.Schema';
import CustomError from '../Middlewares/GlobalError';

export const insertformController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fullName, email, message }: formType = formSchema.parse(req.body);
    const insertedform = await insertform({ fullName, email, message });
    res.status(201).json({
      status: 'Success',
      data: insertedform,
      message: 'Successfully Inserted Form',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getformsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const forms = await getForms();
    if (forms) {
      res.status(200).json({
        status: 'Success',
        data: forms,
        message: 'Successfully fetched the forms',
      });
    } else {
      res.status(404).json({ message: 'No forms found' });
    }
  } catch (error) {
    next(error);
  }
};

export const getformByEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email: string = req.body.email;
    if (!email) throw new CustomError('Please provide the email', 400);
    const form = await getFormByEmai(email);
    if (form) {
      res.status(200).json({
        status: 'Success',
        data: form,
        message: 'Successfully fetched the form',
      });
    } else {
      res.status(404).json({ message: 'form not found' });
    }
  } catch (error) {
    next(error);
  }
};
