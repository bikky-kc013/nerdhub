import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from './GlobalError';
import { getCustomerById } from '../../Database/Repository/Customer.Repository';

const customerValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers['authorization']) {
            throw new CustomError("No authorization headers provided", 401);
        }

        const bearerToken = req.headers['authorization']?.slice(7);
        if (!bearerToken) {
            throw new CustomError("No authorization token found", 401);
        }
        
        let tokenPayload: any;
        
        try {
            tokenPayload = jwt.verify(bearerToken, process.env.SECRET_ACCESS_KEY as string);
        } catch (error) {
            throw new CustomError("Invalid or expired token", 401);
        }

        if (!tokenPayload) {
            throw new CustomError("Invalid token payload", 401);
        }

        const role: string = tokenPayload.role;
        const customerId = tokenPayload._id;
        if (role !== 'customer') {
            throw new CustomError("You do not have the required permission to perform this action", 403);
        }
        
        const customer = await getCustomerById(customerId);
        
        if (!customer) {
            throw new CustomError("You do not have the required permission to perform this action", 403);
        }
        
        if (customer._id !== customerId) {
            throw new CustomError("Sorry, unauthorized", 403);
        }
        next();
    } catch (error) {
        next(error);
    }
};

export default customerValidate;
