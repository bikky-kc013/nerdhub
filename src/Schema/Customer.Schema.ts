import { z } from 'zod';

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
const phoneNumberRegex = /^\d{10}$/;

export const customerRegisterSchema = z.object({
    fullName: z.string({ required_error: "Username is required" })
    .min(3, { message: "Username cannot be less than 3 characters long" })
    .max(16,{message:"Username cannot be more than 16 characters long"}),
    phoneNumber: z.string()
    .max(10,{message:"Phone number cannot be more than 10 characters long"})
    .min(10, { message: "Phone number cannot be less than 10 characters long" })
    .refine(value => phoneNumberRegex.test(value), { message: "Invalid phone number format" }).optional(),
    email: z.string({required_error:"Email is required"}).refine(value => gmailRegex.test(value), { message: "Invalid email" }),
    password: z.string({ required_error: "Password is required" }).min(8,
    {message:"Password must be minimum of 8 characters long"})
    .refine(value => passwordRegex.test(value), { message: "Invalid password format"}),
    confirmPassword:z.string({required_error:"Confirm Password is required"}),
    address:z.string().optional(),
    image:z.string().optional(),
}).strict().refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirmPassword do not match",
    path: ["confirmPassword"], 
});

export const customerLoginSchema = z.object({
    email: z.string({required_error:"Email is required"}).refine(value => gmailRegex.test(value), { message: "Invalid email" }),
    password: z.string({ required_error: "Password is required" }).min(8,
    {message:"Password must be minimum of 8 characters long"})
    .refine(value => passwordRegex.test(value), { message: "Invalid password format"}),
});

export const customerUpdateSchema = z.object({
    fullName: z.string()
    .min(3, { message: "Username cannot be less than 3 characters long" })
    .max(16,{message:"Username cannot be more than 16 characters long"}).optional(),
    address:z.string().optional(),
    email:z.string().optional()
}).strict();
