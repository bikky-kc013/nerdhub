import { z } from "zod";

export const adminLoginSchema = z
  .object({
    username: z.string({ required_error: "Username is required" }).min(3)
    .refine(value => !/\s/.test(value), { message: "Username Cannot contain any spaces",}),
     password: z.string({ required_error: "Password is required" }).min(8).max(32),
  })
  .strict();


  //!IdSchema
  export const IdSchema = z
  .object({
    _id: z.string({ required_error: "Id is required" }).min(8),
  })
  .strict();

  export const blockSchema = z
  .object({
    _id: z.string({ required_error: "Id is required" }).min(8),
    blockedMessage: z.string({required_error:"Please specify the block message"}).min(1,{message:"Please specify the reason for the user to get blocked"})
  })
  .strict();

export const categorySchema = z.object({
  categoryId: z.string({required_error:"Category id is required"})
}).strict();