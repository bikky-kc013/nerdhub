import { z } from 'zod';


export const subcategoryInsertSchema  = z.object({
    name:z.string({required_error:"SubCategory name is required"})
    .min(2,{message:"subCategory name should be minimum of 2 characters long"})
    .max(100,{message:"subCategory name cannot be more than 100 characters long"}),

    categoryId:z.string({required_error:"Please provide the category"})
}) 



export const subcategoryUpdateSchema  = z.object({
    name:z.string().min(2,{message:"subCategory name should be minimum of 2 characters long"}).max(100,{message:"subCategory name cannot be more than 100 characters long"}).optional(),
    categoryId:z.string({required_error:"Please provide the category"}).optional()
}) 