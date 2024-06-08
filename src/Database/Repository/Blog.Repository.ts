import Unique from '../../Utils/Crypto';
import { AppDataSource } from '../Connection';
import { Blog } from '../Models/Blog';

export const insertBlog = async (
  title: string,
  description: string,
  image: string | undefined
): Promise<Blog> => {
  try {
    const repo = AppDataSource.getRepository(Blog);
    const saveData = await repo.save({
      _id: Unique(),
      title,
      image,
      description,
    });
    return saveData;
  } catch (error) {
    throw error;
  }
};

export const findBlogById = async (_id: string): Promise<Blog | null> => {
  try {
    const repo = AppDataSource.getRepository(Blog);
    const findBLog = await repo.findOne({ where: { _id } });
    return findBLog;
  } catch (error) {
    throw error;
  }
};

export const UpdateBlog = async (
  title: string | undefined,
  image: string | undefined,
  description: string | undefined,
  _id: string | undefined
): Promise<Blog | null> => {
  try {
    const repo = AppDataSource.getRepository(Blog);
    const updateRepo = await repo.save({
      _id: _id,
      image,
      description,
      title,
    });
    return updateRepo;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (blog: Blog): Promise<Blog | null> => {
  try {
    const repo = AppDataSource.getRepository(Blog);
    const deleteRepo = await repo.remove(blog);
    return deleteRepo;
  } catch (error) {
    throw error;
  }
};

export const getBlogs = async (): Promise<Blog[] | null> => {
  try {
    const repo = AppDataSource.getRepository(Blog);
    const findBLog = await repo.find();
    return findBLog;
  } catch (error) {
    throw error;
  }
};
