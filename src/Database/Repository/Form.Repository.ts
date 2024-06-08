import Unique from '../../Utils/Crypto';
import { AppDataSource } from '../Connection';
import CustomError from '../../Api/Middlewares/GlobalError';
import { HashString } from '../../Utils/Hash';
import { Form } from '../Models/Form';
import { formType } from '../../Types/Form';

export const insertform = async ({
  fullName,
  email,
  message,
}: formType): Promise<Form> => {
  try {
    const repo = AppDataSource.getRepository(Form);
    console.log(fullName);

    const insertData = await repo.save({
      _id: Unique(),
      name: fullName,
      message,
      email,
    });
    return insertData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getForms = async (): Promise<Form[] | null> => {
  try {
    const repo = AppDataSource.getRepository(Form);
    const findData = await repo.find();
    return findData;
  } catch (error) {
    throw error;
  }
};

export const getFormByEmai = async (email: string): Promise<Form[] | null> => {
  try {
    const repo = AppDataSource.getRepository(Form);
    const findData = await repo.find({ where: { email } });
    return findData;
  } catch (error) {
    throw error;
  }
};
