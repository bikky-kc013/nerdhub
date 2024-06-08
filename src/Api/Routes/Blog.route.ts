import express from 'express';
const blogRouter = express.Router();
import adminValidate from '../Middlewares/adminPermissions';
import { blogUpload } from '../Middlewares/fileUpload';
import {
  addBlog,
  updateBlogById,
  getAllBlogs,
  removeBlog,
  getBlogById
} from '../Controllers/Blog.Controller';

//!post
blogRouter.post(
  '/api/v1/blogs',
  adminValidate,
  blogUpload.single('image'),
  addBlog
);

//!get
blogRouter.get('/api/v1/blogs', getAllBlogs);
blogRouter.get('/api/v1/blogs/:_id', getBlogById);

//!delete
blogRouter.delete('/api/v1/blogs/:_id', adminValidate, removeBlog);

//!patch
blogRouter.patch(
  '/api/v1/blogs/:_id',
  adminValidate,
  blogUpload.single('image'),
  updateBlogById
);

export default blogRouter;
