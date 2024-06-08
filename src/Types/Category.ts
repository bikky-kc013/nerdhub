import { categoryInsertSchema, categoryUpdateSchema } from './../Schema/Category.Schema';
import { z } from 'zod';


export type categorySchema = z.infer<typeof categoryInsertSchema>;
export type categoryUpdateType = z.infer<typeof categoryUpdateSchema>;