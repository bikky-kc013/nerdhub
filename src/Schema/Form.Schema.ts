import { z } from 'zod';


export const formSchema = z.object({
    fullName:z.string({required_error:"Name is required"}),
    email:z.string({required_error:"email is required"}),
    message:z.string({required_error:"message is required"}).min(10, {message:"Min 10 words is required"}),
})