import { Request, Response, NextFunction } from 'express';
import { ID, category } from 'src/Types/Global';
import CustomError from '../Middlewares/GlobalError';
import {
  subCategoryType,
  subCategoryUpdateType,
} from '../../Types/SubCategory';
import {
  subcategoryInsertSchema,
  subcategoryUpdateSchema,
} from '../../Schema/SubCategory.Schema';
import {
  insertSubCategory,
  getAllSubCategories,
  removeSUbCategoryById,
  getSubCategoryById,
  updateSubCategoryById,
  getSubCategoriesByCategoryId,
  getSubCategoryBySlug,
  checkSubCagegoryCount,
} from '../../Database/Repository/SubCategory.Repository';
import slugify from 'slugify';
import Unsync from '../../Utils/Unsync';
import path from 'path';

export const addSubCategory = async (
  req: Request<{}, {}, subCategoryType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, categoryId } = subcategoryInsertSchema.parse(req.body);
    const image = req.file?.filename;
    //if(!image) throw new CustomError("Image is required", 400);
    let slug = slugify(name, { lower: true });
    const count = await checkSubCagegoryCount(slug);
    if (count && count > 0) {
      slug = `${slug}-${count}`;
    }
    const insertData = await insertSubCategory(name, categoryId, slug, image);
    if (!insertData) throw new CustomError('Unable to insert Data', 400);
    res.json({
      status: 'Success',
      data: insertData,
      message: 'Successfully Inserted the SubCategory',
    });
  } catch (error) {
    console.log(error);
    const image = req.file?.filename;
    if (image) {
      await Unsync(
        path.join(__dirname, `../../../public/subcategory/${image}`)
      );
    }
    next(error);
  }
};

export const getSubCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getData = await getAllSubCategories();
    if (!getData) {
      return res.json({
        message: 'No sub category found',
        data: [],
        status: 'Failed',
      });
    }
    res.json({
      status: 'Success',
      data: getData,
      message: 'Successfully fetched all the sub-categories',
    });
  } catch (error) {
    next(error);
  }
};

export const removeSubCategory = async (
  req: Request<ID, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const subCategory = await getSubCategoryById(_id);
    if (!subCategory) {
      return res.json({
        status: 'Failed',
        data: [],
        message: 'No any sub category found',
      });
    }
    // const getbooks = await getbookBySubCategoryId(_id);
    // if(getbooks) {
    //     return res.json({
    //         message:"book with this sub-category is in use",
    //         getbooks
    //     })
    // }
    const oldImage = subCategory.image;
    const removeData = await removeSUbCategoryById(_id);
    await Unsync(
      path.join(__dirname, `../../../public/subcategory/${oldImage}`)
    );
    res.json({
      status: 'Success',
      message: 'Successfully deleted the sub-category',
    });
  } catch (error) {
    next(error);
  }
};

export const getSubCategory = async (
  req: Request<ID, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const getData = await getSubCategoryBySlug(_id);
    if (!getData) {
      return res.json({
        status: 'Success',
        data: [],
        message: 'Successfully Fetched the sub category',
      });
    }
    res.json({
      status: 'Success',
      data: getData,
      message: 'Successfully Fetched the sub category',
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubCategory = async (
  req: Request<ID, {}, subCategoryUpdateType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const { name, categoryId } = subcategoryUpdateSchema.parse(req.body);
    const image = req.file?.filename;
    const subCategory = await getSubCategoryById(_id);
    if (!subCategory) throw new CustomError('Unable to find SubCategory', 404);

    let slug = subCategory.slug;
    if (name) {
      slug = slugify(name, { lower: true });
    }
    const count = await checkSubCagegoryCount(slug);
    if (count && count > 0) {
      slug = `${slug}-${count}`;
    }
    const update = await updateSubCategoryById(
      _id,
      categoryId,
      name,
      slug,
      image
    );
    if (!update) throw new CustomError('Unable to make an update', 500);
    Unsync(
      path.join(__dirname, `../../../public/subcategory/${subCategory.image}`)
    );
    res.json({
      status: 'Success',
      data: update,
      message: 'Successfully updated the sub category',
    });
  } catch (error) {
    const image = req.file?.filename;
    if (image) {
      Unsync(path.join(__dirname, `../../../public/subcategory/${image}`));
    }
    next(error);
  }
};

export const getSubcategoryByCategoryId = async (
  req: Request<category, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.params.categoryId;
    const datas = await getSubCategoriesByCategoryId(categoryId);
    if (!datas) {
      return res.json({
        status: 'Success',
        data: [],
        message: 'Successfully fetched subcategory',
      });
    }
    res.json({
      status: 'Success',
      data: datas,
      message: 'Successfully fetched subcategory',
    });
  } catch (error) {
    next(error);
  }
};
