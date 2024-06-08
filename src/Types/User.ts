import { adminLoginSchema } from '../Schema/User.Schema';
import { z } from "zod";



export type LoginSchema = z.infer<typeof adminLoginSchema>;
