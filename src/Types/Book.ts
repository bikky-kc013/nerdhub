import {
  customerbookSchema,
  updateCustomerbookSchema,
} from '../Schema/Book.Schema';
import { z } from 'zod';

export type bookSchema = z.infer<typeof customerbookSchema>;
export type updatebookSchema = z.infer<typeof updateCustomerbookSchema>;
