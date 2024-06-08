import multer, { StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = (destination: string): StorageEngine =>
  multer.diskStorage({
    destination,
    filename: (
      req: Request,
      file: Express.Multer.File,
      callBack: (error: Error | null, filename: string) => void
    ) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callBack(
        null,
        `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
      );
    },
  });

export const customerUpload = multer({
  storage: storage(path.join(__dirname, '../../../public/customer')),
  limits: { fileSize: 1200000 },
});

export const userUpload = multer({
  storage: storage(path.join(__dirname, '../../../public/user')),
  limits: { fileSize: 1200000 },
});

export const bookUpload = multer({
  storage: storage(path.join(__dirname, '../../../public/book')),
  limits: { fileSize: 1200000 },
});

export const categoryUpload = multer({
  storage: storage(path.join(__dirname, '../../../public/category')),
  limits: { fileSize: 1.2 * 1024 * 1024 },
});

export const subCategoryUpload = multer({
  storage: storage(path.join(__dirname, '../../../public/subcategory')),
  limits: { fileSize: 1.2 * 1024 * 1024 },
});

export const sliderUpload = multer({
  storage: storage(path.join(__dirname, '../../../public/slider')),
  limits: { fileSize: 1.2 * 1024 * 1024 },
});

export const blogUpload = multer({
  storage: storage(path.join(__dirname, '../../../public/blog')),
  limits: { fileSize: 1.2 * 1024 * 1024 },
});

