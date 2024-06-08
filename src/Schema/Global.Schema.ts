import { z } from 'zod';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;


export const passwordChangeSchema  =  z.object({
    oldPassword:z.string({required_error:"Old Password is required"}),
    newPassword: z.string({ required_error: "Password is required" }).min(8,
    {message:"Password must be minimum of 8 characters long"})
    .refine(value => passwordRegex.test(value), { message: "Invalid password format"}),
    confirmPassword:z.string({required_error:"Confirm Password is required"}),    
}).strict().refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password and confirmPassword do not match",
    path: ["confirmPassword"], 
});
