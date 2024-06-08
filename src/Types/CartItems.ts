import { z } from 'zod';
import { insertCartSchema} from '../Schema/CartItem.Schema';
export type cartItemInsertType = z.infer<typeof insertCartSchema>;

