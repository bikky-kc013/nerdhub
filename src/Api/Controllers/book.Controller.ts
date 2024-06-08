import { Request, Response, NextFunction } from 'express';
import { ID } from 'src/Types/Global';
import CustomError from '../Middlewares/GlobalError';
import {
  customerbookSchema,
  updateCustomerbookSchema,
} from '../../Schema/Book.Schema';
import { bookSchema, updatebookSchema } from '../../Types/Book';
import {
  insertbook,
  updatebookById,
  removebook,
  getbooks,
  getbookById,
  listImage,
  checkbookCount,
  getbookBySlug,
  listbookbyId,
} from '../../Database/Repository/Book.Repository';
import Unsync from '../../Utils/Unsync';
import path from 'path';
import { getCategorybyId } from '../../Database/Repository/Category.Repository';
import slugify from 'slugify';

export const addbook = async (
  req: Request<{}, {}, bookSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = customerbookSchema.parse(req.body);
    const images = req.files as Express.Multer.File[];
    if (!images || images.length === 0)
      throw new CustomError('book image is required', 400);

    const image: string = images.map((file) => file.filename).join(',');
    let slug = slugify(data.name, { lower: true });
    const count = await checkbookCount(slug);
    if (count && count > 0) {
      slug = `${slug}-${count}`;
    }
    const insertedData = await insertbook(image, data, slug);
    if (!insertedData) throw new CustomError('Unable to insert book', 400);

    res.json({
      status: 'Success',
      data: insertedData,
      message: 'Successfully Added the book',
    });
  } catch (error) {
    console.error(error);
    const images = req.files as Express.Multer.File[];
    if (images) {
      const filenames = images.map((file) => file.filename);
      filenames.forEach((filename) => {
        Unsync(path.join(__dirname, `../../../public/book/${filename}`));
      });
    }
    next(error);
  }
};

function checkIfMulterIsArray(
  files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] }
): files is Express.Multer.File[] {
  return Array.isArray(files);
}

export const updatebook = async (
  req: Request<ID, {}, updatebookSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const {
      name,
      price,
      discount,
      subCategoryId,
      isFeatured,
      quantity,
      categoryId,
      description,
    } = updateCustomerbookSchema.parse(req.body);
    const images = req.files as Express.Multer.File[] | undefined;
    let bookImage: string | null = null;

    if (images && checkIfMulterIsArray(images) && images.length > 0) {
      bookImage = images.map((i) => i.filename).join(',');
    }
    const featured = isFeatured === 'true';

    const isAvailable = await listbookbyId(_id);
    if (!isAvailable) throw new CustomError('book not Found', 404);

    const bookImages = isAvailable.image.split(',');
    if (categoryId && !(await getCategorybyId(categoryId)))
      throw new CustomError('Category Not Found', 400);

    const updatedData = await updatebookById(
      _id,
      {
        name,
        price,
        discount,
        subCategoryId,
        quantity,
        categoryId,
        description,
      },
      bookImage || isAvailable.image,
      featured
    );

    if (updatedData && bookImage) {
      const promises = bookImages.map(async (filename: any) => {
        await Unsync(path.join(__dirname, `../../../public/book/${filename}`));
      });
      await Promise.all(promises);
    }
    if (!updatedData) throw new CustomError('Unable to update book', 400);

    res.json({
      status: 'Success',
      data: updatedData,
      message: 'Successfully Updated book',
    });
  } catch (error) {
    console.error(error);
    const images = req.files as Express.Multer.File[] | undefined;
    if (images) {
      const filenames = images.map((file) => file.filename);
      const promises = filenames.map(async (filename) => {
        await Unsync(path.join(__dirname, `../../../public/book/${filename}`));
      });
      await Promise.all(promises);
    }
    next(error);
  }
};

export const deletebook = async (
  req: Request<ID, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const isAvailable = await getbookById(_id);
    if (!isAvailable) {
      return res.json({
        status: 'Success',
        data: [],
        message: 'Successfully removed book',
      });
    }
    const getImage = await listImage(_id);
    const images = getImage?.split(',');
    const deletebookResult = await removebook(isAvailable);
    if (deletebookResult && images) {
      const promises = images.map(async (filename) => {
        await Unsync(path.join(__dirname, `../../../public/book/${filename}`));
      });
      await Promise.all(promises);
    }
    if (!deletebookResult) throw new CustomError('Unable to remove book', 400);

    res.json({
      status: 'Success',
      message: 'Successfully removed book',
    });
  } catch (error) {
    next(error);
  }
};

export const listbooks = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const getbook = await getbooks();
    if (!getbook) {
      return res.json({
        message: 'No books found',
        data: [],
      });
    }
    res.json({
      status: 'Success',
      data: getbook,
      message: 'Successfully Fetched all the books',
    });
  } catch (error) {
    next(error);
  }
};

export const listbookById = async (
  req: Request<ID, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const getbook = await getbookBySlug(_id);
    if (!getbook) {
      return res.json({
        message: 'book not Found',
        data: [],
      });
    }
    res.json({
      status: 'Success',
      data: getbook,
      message: 'Successfully Fetched book',
    });
  } catch (error) {
    next(error);
  }
};

export const listbookImageById = async (
  req: Request<ID, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const getbook = await getbookBySlug(_id);
    if (!getbook) {
      return res.json({
        message: 'book not Found',
        data: [],
      });
    }
    const { image } = getbook;
    const images = image.split(',');
    const data = { image: images };
    res.json({
      status: 'Success',
      data: data,
      message: 'Successfully Fetched book images',
    });
  } catch (error) {
    next(error);
  }
};
