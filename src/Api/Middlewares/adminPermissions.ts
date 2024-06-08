import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from './GlobalError';
import { findAdminById } from '../../Database/Repository/User.Repository';


const adminValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers['authorization']) throw new CustomError("No any authorization headers provided", 401); 
        const bearerToken = req.headers['authorization']?.slice(7);    
        if (!bearerToken) throw new CustomError("No authorization headers found", 401); 
        const token:any = jwt.verify(bearerToken, process.env.SECRET_ACCESS_KEY as string)     
        if(!token) throw new Error();
        const role:string = token.role;
        const _id = token._id;        
        const admin = await findAdminById(_id);     
        if(role != 'admin') throw new CustomError("Sorry,You do not have required permission to perform this action", 403);
        if(admin === undefined) throw new CustomError("Sorry,You do not have required permission to perform this action",403);  
        if(role === 'admin'){
            next();
        } 
    } catch (error) {
        next(error);
    }
};

export default adminValidate;
