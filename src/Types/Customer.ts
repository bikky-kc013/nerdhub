import { customerRegisterSchema,customerLoginSchema,customerUpdateSchema } from '../Schema/Customer.Schema';
import { z } from 'zod';


export type registerSchema = z.infer<typeof customerRegisterSchema>;
export type loginSchema = z.infer<typeof customerLoginSchema>;
export type updateSchema = z.infer<typeof customerUpdateSchema>;