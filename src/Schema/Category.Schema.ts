import { z } from 'zod';


export const categoryInsertSchema  = z.object({
    name:z.string({required_error:"Category name is required"})
    .min(2,{message:"Category name should be minimum of 2 characters long"})
    .max(100,{message:"Category name cannot be more than 100 characters long"})
})



export const categoryUpdateSchema  = z.object({
    name:z.string()
    .min(2,{message:"Category name should be minimum of 2 characters long"})
    .max(100,{message:"Category name cannot be more than 100 characters long"}).optional()
})