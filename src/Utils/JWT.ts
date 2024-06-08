import jwt from "jsonwebtoken";

type Token = {
  data: object | string;
  secretKey: string;
  exp?: string;
};

const CreateToken = ({ data, exp, secretKey }: Token): string => {
  try {
    const expire = exp ? { expiresIn: exp } : undefined;
    const Token: string = jwt.sign(data, secretKey, expire);

    return Token;
  } catch (error) {
    throw error;
  }
};

const VerifyToken = <T>(token: string, secretKey: string): T => {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload as T;
  } catch (error) {
    throw error;
  }
};

export { CreateToken, VerifyToken };
  