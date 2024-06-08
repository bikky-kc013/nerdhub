import { ZodAny, boolean, z } from 'zod';

export const customerbookSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Book name must be at least 3 characters long' }),
  price: z
    .string({ required_error: 'book Price is required' })
    .refine((value) => !isNaN(parseFloat(value)), {
      message: 'book Price must be a valid number',
    }),
  categoryId: z.string({ required_error: ' categoryId is required' }),
  subCategoryId: z.string({ required_error: 'SubCategoryId is required' }),
  discount: z.string().refine((value) => !isNaN(parseFloat(value)), {
    message: 'discount must be a valid number',
  }),
  description: z
    .string({ required_error: 'Description is required' })
    .min(2)
    .max(3000),
  quantity: z.string(),
});

export const updateCustomerbookSchema = z
  .object({
    name: z.string().min(3).optional(),
    price: z
      .string({ required_error: 'book Price is required' })
      .refine((value) => !isNaN(parseFloat(value)), {
        message: 'book Price must be a valid number',
      })
      .optional(),
    categoryId: z.string().optional(),
    subCategoryId: z.string().optional(),
    rate: z
      .string()
      .refine((value) => !isNaN(parseFloat(value)))
      .optional(),
    description: z.string().min(2).max(3000).optional(),
    isFeatured: z.string().optional(),
    quantity: z.string().optional(),
    discount: z.string().optional(),
  })
  .strict();
