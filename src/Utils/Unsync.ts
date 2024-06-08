import fs from "fs";

const Unsync = async (_file: string): Promise<boolean> => {
  try {
    if (fs.existsSync(_file)) {
      fs.unlinkSync(_file);
      return true;
    }   
    return false;
  } catch (error) {
    console.log(error); 
    throw error;
  }
};
export default Unsync;
