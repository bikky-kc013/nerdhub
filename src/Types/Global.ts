import { string, z } from "zod";
import { categorySchema } from "src/Schema/User.Schema";
import { passwordChangeSchema } from '../Schema/Global.Schema';

//!IdType
export type ID = {
  _id: string;
}
//!SlugType
export type slug = {
    slug: string;
}

//!blockCustomerType
export type blockCustomerType = {
  _id: string,
  blockedMessage:string
}


//!passwordChangeType
export type changePasswordType = z.infer<typeof passwordChangeSchema>;

export type category = z.infer<typeof categorySchema>;