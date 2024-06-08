import { z } from 'zod';
import { formSchema } from '../Schema/Form.Schema';

export type formType = z.infer< typeof formSchema>;