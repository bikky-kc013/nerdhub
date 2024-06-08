import { Request } from "express"
type TokenPayload = {
    role: "customer" | "admin" ,
    _id: string
}

declare global {
    namespace Express {
        interface Request {
            tokenPayload?: TokenPayload
        }
    }
}