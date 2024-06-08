import { Response, NextFunction , Request} from 'express';
import jwt from 'jsonwebtoken';
import CustomError from './GlobalError';
import { TokenPayload } from 'src/Types/global';


const token = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        return next(new CustomError("No authorization header provided", 401));
    }
    const token = authorizationHeader.replace("Bearer ", "");
    if (!token) {
        return next(new CustomError("Invalid authorization header format", 401));
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_ACCESS_KEY as string) as TokenPayload;
        req.tokenPayload = decodedToken
        next();
    } catch (error) {
        next(new CustomError("Invalid or expired token", 401));
    }
};

export default token;

