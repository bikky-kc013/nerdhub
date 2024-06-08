import { Book } from '../Models/Book';
import { Category } from '../Models/Category';
import { AppDataSource } from '../Connection';
import Unique from '../../Utils/Crypto';
import { bookSchema, updatebookSchema } from '../../Types/Book';
import CustomError from '../../Api/Middlewares/GlobalError';
import { SubCategory } from '../Models/SubCategory';

export const insertbook = async (
  image: string,
  {
    name,
    price,
    discount,
    subCategoryId,
    quantity,
    categoryId,
    description,
  }: bookSchema,
  slug: string
): Promise<Book | undefined> => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const subCategoryRepo = AppDataSource.getRepository(SubCategory);
    const categoryRepo = AppDataSource.getRepository(Category);

    const category = await categoryRepo.findOne({ where: { _id: categoryId } });
    if (!category) {
      throw new CustomError('Category not found', 404);
    }

    const subCategory = await subCategoryRepo.findOne({
      where: { _id: subCategoryId },
    });

    if (!subCategory) {
      throw new CustomError('Subcategory  not Found ', 400);
    }
    const [getCategoryId] = await categoryRepo.query(
      `SELECT categoryId FROM subCategory WHERE _id = ?`,
      [subCategoryId]
    );
    if (categoryId !== getCategoryId.categoryId)
      throw new CustomError('Category and sub category doesnot match', 400);
    const savedbook = await bookRepo.save({
      _id: Unique(),
      name,
      price,
      discount,
      quantity,
      category,
      subCategory,
      description,
      image,
      slug,
    });
    return savedbook;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatebookById = async (
  _id: string,
  {
    name,
    price,
    discount,
    subCategoryId,
    quantity,
    categoryId,
    description,
  }: updatebookSchema,
  image: string | undefined,
  featured: boolean
): Promise<Book | undefined> => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const categoryRepo = AppDataSource.getRepository(Category);
    if (categoryId && categoryId) {
      const [getCategoryId] = await categoryRepo.query(
        `SELECT categoryId FROM subCategory WHERE _id = ?`,
        [subCategoryId]
      );
    }
    const savedData = await bookRepo.save(
      {
        _id,
        name,
        price,
        discount,
        subCategoryId,
        isFeatured: featured,
        quantity,
        categoryId,
        description,
        image,
      },
      { reload: true }
    );
    return savedData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//!removebook
export const removebook = async (book: Book): Promise<Book | null> => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const removebook = await bookRepo.remove(book);
    return removebook;
  } catch (error) {
    console.log('Unable to remove image', error);
    throw error;
  }
};

//!getbooks
export const getbooks = async (): Promise<Book[]> => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const findbook = await bookRepo.find({
      relations: ['category', 'subCategory'],
    });
    return findbook;
  } catch (error) {
    throw error;
  }
};

//!getbookById
export const getbookById = async (_id: string): Promise<Book | null> => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const findbook = await bookRepo.findOne({
      where: { _id },
      relations: ['category', 'subCategory'],
    });
    return findbook;
  } catch (error) {
    throw error;
  }
};

//!listImageById
export const listImage = async (_id: string): Promise<string | undefined> => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const findbook = await bookRepo.findOne({ where: { _id } });
    return findbook?.image;
  } catch (error) {
    throw error;
  }
};

//!getbookBySlug
export const getbookBySlug = async (slug: string): Promise<Book> => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const findbook = await bookRepo.findOne({
      where: { slug },
      relations: ['category', 'subCategory'],
    });
    if (!findbook) throw new CustomError('book not Found', 400);
    return findbook;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//!checkbookSlug
export const checkbookCount = async (slug: string): Promise<number> => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const sqlSelect = `SELECT COUNT(*) AS count FROM book WHERE slug LIKE ?`;
    const results = await bookRepo.query(sqlSelect, [`${slug}%`]);
    const slugs = results[0].count;
    const count = parseInt(slugs);
    return count;
  } catch (error) {
    throw error;
  }
};

//!listbookBySlug
export const listbookbyId = async (_id: string): Promise<Book | null> => {
  try {
    const bookRepo = AppDataSource.getRepository(Book);
    const findbook = await bookRepo.findOne({
      where: { _id },
      relations: ['category', 'subCategory'],
    });
    return findbook;
  } catch (error) {
    throw error;
  }
};
