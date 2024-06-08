import Unique from '../../Utils/Crypto';
import { AppDataSource } from '../Connection';
import CustomError from '../../Api/Middlewares/GlobalError';
import { SubCategory } from '../Models/SubCategory';
import { Category } from '../Models/Category';

//!insertSubCategory
export const insertSubCategory = async (
  name: string,
  categoryId: string,
  slug: string,
  image: string | undefined
): Promise<Object | undefined> => {
  try {
    const sub_categoryRepo = AppDataSource.getRepository(SubCategory);
    const categoryRepo = AppDataSource.getRepository(Category);

    const category = await categoryRepo.findOne({ where: { _id: categoryId } });
    if (!category) {
      throw new CustomError('Category not found', 404);
    }
    const savedSubCategory = await sub_categoryRepo.save({
      _id: Unique(),
      name,
      category: category,
      slug,
      image,
    });
    return savedSubCategory;
  } catch (error) {
    throw error;
  }
};

//!getAllSubCategories
export const getAllSubCategories = async (): Promise<SubCategory[]> => {
  try {
    const sub_categoryRepo = AppDataSource.getRepository(SubCategory);
    const allSubCategories = await sub_categoryRepo.find({
      relations: ['category'],
    });

    if (!allSubCategories || allSubCategories.length === 0) {
      throw new CustomError('No subcategories found', 404);
    }

    return allSubCategories;
  } catch (error) {
    throw error;
  }
};

//!removeSubCategory
export const removeSUbCategoryById = async (
  _id: string
): Promise<boolean | undefined> => {
  try {
    const sub_categoryRepo = AppDataSource.getRepository(SubCategory);
    const getSubCategory = await sub_categoryRepo.findOne({ where: { _id } });
    if (!getSubCategory) throw new CustomError('No sub category found', 404);
    const remove = await sub_categoryRepo.remove(getSubCategory);
    console.log(remove);
    return remove ? true : false;
  } catch (error) {
    throw error;
  }
};

//!getSubCategoryById
export const getSubCategoryById = async (
  _id: string
): Promise<SubCategory | undefined> => {
  try {
    const sub_categoryRepo = AppDataSource.getRepository(SubCategory);
    const getSubCategory = await sub_categoryRepo.findOne({
      where: { _id },
      relations: ['category'],
    });
    if (!getSubCategory) throw new CustomError('No sub Category found', 404);

    return getSubCategory ? getSubCategory : undefined;
  } catch (error) {
    throw error;
  }
};

//!updateSubCategory
export const updateSubCategoryById = async (
  _id: string,
  categoryId: string | undefined,
  name: string | undefined,
  slug: string,
  image: string | undefined
): Promise<SubCategory | undefined> => {
  try {
    const subCategoryRepo = AppDataSource.getRepository(SubCategory);
    const categoryRepo = AppDataSource.getRepository(Category);

    let category: Category | undefined | null;
    if (categoryId) {
      category = await categoryRepo.findOne({ where: { _id: categoryId } });
      if (!category) {
        throw new CustomError('Category not found', 404);
      }
    }
    console.log(name);

    const updatedSubCategory = await subCategoryRepo.save({
      _id: _id,
      name: name,
      slug,
      image,
    });
    return updatedSubCategory;
  } catch (error) {
    throw error;
  }
};

//!getSubCategoriesByCategoryId
export const getSubCategoriesByCategoryId = async (
  categoryId: string
): Promise<SubCategory[]> => {
  try {
    const categoryRepo = AppDataSource.getRepository(Category);
    const category = await categoryRepo.findOne({ where: { _id: categoryId } });
    const sub_categoryRepo = AppDataSource.getRepository(SubCategory);
    const getSubCategories = await sub_categoryRepo.query(
      `SELECT * FROM  subCategory WHERE categoryId = ?`,
      [categoryId]
    );
    return getSubCategories;
  } catch (error) {
    throw error;
  }
};

//!getSubCategoryBySlug
export const getSubCategoryBySlug = async (
  slug: string
): Promise<SubCategory> => {
  try {
    const sub_categoryRepo = AppDataSource.getRepository(SubCategory);
    const findCategory = await sub_categoryRepo.findOne({
      where: { slug },
      relations: ['category'],
    });
    if (!findCategory) throw new CustomError('Category not Found', 404);
    return findCategory;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//!checkSubCategorySlug
export const checkSubCagegoryCount = async (slug: string): Promise<number> => {
  try {
    const categoryRepo = await AppDataSource.getRepository(Category);
    const sqlSelect = `SELECT COUNT(*) AS count FROM subCategory WHERE slug LIKE ?`;
    const results = await categoryRepo.query(sqlSelect, [`${slug}%`]);
    const slugs = results[0].count;
    const count = parseInt(slugs);
    return count;
  } catch (error) {
    throw error;
  }
};
