import { z } from 'zod';

export const insertCartSchema = z.object({
  quantity: z.number({
    required_error: 'Please enter the minimum of one quatity',
  }),
  bookId: z.string({ required_error: 'Please Enter the book item' }),
});
