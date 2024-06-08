import { z } from 'zod';


export const sliderInsertSchema = z.object({
    title:z.string({required_error:"Title is required"}).min(4,{ message:"Title too short"}).max(255, { message:"Title too long"}),
}).strict()


export const sliderUpdateSchema = z.object({
    title:z.string().min(4,{ message:"Title too short"}).max(255, { message:"Title too long"}).optional(),
}).strict()