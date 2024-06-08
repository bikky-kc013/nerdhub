import { Request, Response, NextFunction } from 'express';
import {
  insertBlog,
  findBlogById,
  UpdateBlog,
  deleteBlog,
  getBlogs,
} from '../../Database/Repository/Blog.Repository';
import CustomError from '../Middlewares/GlobalError';
import Unsync from '../../Utils/Unsync';
import path from 'path';

export const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    if (!_id) {
      throw new CustomError('Slug is required', 400);
    }

    const blog = await findBlogById(_id);
    if (!blog) {
      return res.json({
        status: 'Success',
        data: [],
        message: 'Blog fetched successfully',
      });
    }
    res.json({
      status: 'Success',
      data: blog,
      message: 'Blog fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    if (!_id) {
      throw new CustomError('Blog ID is required', 400);
    }

    const existingBlog = await findBlogById(_id);
    if (!existingBlog) {
      throw new CustomError('Blog not found', 404);
    }
    await deleteBlog(existingBlog);
    res.json({
      status: 'Success',
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const addBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    console.log('This is the title', title, description);

    if (!title && !description)
      throw new CustomError('Title and description is required', 400);
    const image = req.file?.filename;
    //if(!image) throw new CustomError("Image is required", 400);
    const isInserted = await insertBlog(title, description, image);
    if (!isInserted) throw new CustomError('Unable to add the course', 400);
    res.json({
      satus: 'Success',
      data: isInserted,
      message: 'Successfully inserted the Course',
    });
  } catch (error) {
    const image = req.file?.filename;
    if (image) {
      await Unsync(path.join(__dirname, `../../../public/blog/${image}`));
    }
    next(error);
  }
};

export const removeBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    if (!_id) throw new CustomError('Id not provided', 400);
    const doExists = await findBlogById(_id);
    if (!doExists) throw new CustomError('Course not found', 400);
    const image = doExists.image;
    const removeCourse = await deleteBlog(doExists);
    if (removeCourse) {
      await Unsync(path.join(__dirname, `../../../public/blog/${image}`));
    }
    res.json({
      status: 'Success',
      message: 'Successfully removed the Course',
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, desciption } = req.body;
    const _id = req.params._id;
    if (!_id) throw new CustomError('Id not provided', 400);
    const image = req.file?.filename;
    const doExists = await findBlogById(_id);
    if (!doExists) throw new CustomError('Blog not found', 400);
    const oldImage = doExists.image;

    if (image) {
      await Unsync(path.join(__dirname, `../../../public/blog/${oldImage}`));
    }
    const blogUpdate = await UpdateBlog(title, image, desciption, _id);
    if (!blogUpdate) throw new CustomError('Blog not updated', 500);
    res.json({
      status: 'Success',
      data: blogUpdate,
      message: 'Successfully updated the course',
    });
  } catch (error) {
    const image = req.file?.filename;
    if (image) {
      await Unsync(path.join(__dirname, `../../../public/blog/${image}`));
    }
    next(error);
  }
};

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await getBlogs();
    if (!blog) {
      return res.json({
        status: 'Success',
        data: [],
        message: 'Blogs fetched successfully',
      });
    }
    res.json({
      status: 'Success',
      data: blog,
      message: 'Blogs fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};
