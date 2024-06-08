import bcrypt from "bcrypt";

export const HashString = (val: string): Promise<string> => {
  try {
    const hashPassword = bcrypt.hash(val, 10);
    return hashPassword;
  } catch (error) {
    throw error;
  }
};

export const VerifyString = (val: string, compare: string): Promise<boolean> => {
  try {
    const isValid = bcrypt.compare(val, compare);

    return isValid;
  } catch (error) {
    throw error;
  }
};

