import { z } from 'zod';
import { subcategoryInsertSchema, subcategoryUpdateSchema } from '../Schema/SubCategory.Schema';



export type subCategoryType = z.infer<typeof subcategoryInsertSchema>;
export type subCategoryUpdateType = z.infer<typeof subcategoryUpdateSchema>;