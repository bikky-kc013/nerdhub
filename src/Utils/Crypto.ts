import crypto from "crypto";

const Unique = (): string => {
  return crypto.randomBytes(15).toString("hex");
};

export default Unique;
