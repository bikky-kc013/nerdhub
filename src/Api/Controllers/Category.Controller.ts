import { Request, Response, NextFunction } from 'express';
import {
  categoryInsertSchema,
  categoryUpdateSchema,
} from '../../Schema/Category.Schema';
import { categorySchema } from '../../Types/Category';
import {
  insertCategory,
  getAllCategory,
  getCategorybyId,
  deleteCategoryById,
  getSubcategoryByCategoryId,
  getCategoryBySlug,
  checkCagegoryCount,
  categoryUpdate,
} from '../../Database/Repository/Category.Repository';
import { ID } from 'src/Types/Global';
import CustomError from '../Middlewares/GlobalError';
import slugify from 'slugify';
import Unsync from '../../Utils/Unsync';
import path from 'path';

export const createCategory = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = categoryInsertSchema.parse(req.body);
    const image = req.file?.filename;

    let slug = slugify(name, { lower: true });
    const count = await checkCagegoryCount(slug);
    if (count > 0) {
      slug = `${slug}-${count}`;
    }

    const addCategory = await insertCategory(name, slug, image);
    if (!addCategory) throw new CustomError('Unable to add the Category', 500);

    res.json({
      status: 'Success',
      data: addCategory,
      message: 'Successfully added Category',
    });
  } catch (error) {
    console.error(error);
    const image = req.file?.filename;
    if (image) {
      await Unsync(path.join(__dirname, `../../../public/category/${image}`));
    }
    next(error);
  }
};

export const updateCategory = async (
  req: Request<ID, {}, categorySchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const { name } = categoryUpdateSchema.parse(req.body);
    const image = req.file?.filename;

    const category = await getCategorybyId(_id);
    if (!category) throw new CustomError('Category not Found', 400);

    const oldImage = category.image;
    let slug = category.slug;
    if (name) {
      slug = slugify(name, { lower: true });
    }

    const newCategory = await categoryUpdate(_id, name, slug, image);
    if (!newCategory) throw new CustomError('Unable to update Category', 500);

    if (newCategory && image)
      await Unsync(
        path.join(__dirname, `../../../public/category/${oldImage}`)
      );

    res.json({
      status: 'Success',
      data: newCategory,
      message: 'Successfully updated the category',
    });
  } catch (error) {
    console.error(error);
    const image = req.file?.filename;
    if (image) {
      await Unsync(path.join(__dirname, `../../../public/category/${image}`));
    }
    next(error);
  }
};

export const listCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listAllCategory = await getAllCategory();
    res.json({
      status: 'Success',
      data: listAllCategory || [],
      message: 'Successfully fetched all the categories',
    });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (
  req: Request<ID, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const category = await getCategoryBySlug(_id);
    res.json({
      status: 'Success',
      data: category || [],
      message: 'Successfully fetched the category',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request<ID, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const checkExistingSubCategory = await getSubcategoryByCategoryId(_id);
    if (checkExistingSubCategory.length > 0) {
      return res.json({
        status: 'Warning',
        message: 'Category is in use',
        data: checkExistingSubCategory,
      });
    }

    const category = await getCategorybyId(_id);
    if (!category) {
      return res.json({
        status: 'Failed',
        data: [],
        message: 'No category found',
      });
    }

    const oldImage = category.image;
    const deletebyId = await deleteCategoryById(category);
    if (!deletebyId)
      throw new CustomError('Unable to delete the Category', 500);

    await Unsync(path.join(__dirname, `../../../public/category/${oldImage}`));
    res.json({
      status: 'Success',
      message: 'Successfully deleted the category',
    });
  } catch (error) {
    next(error);
  }
};
