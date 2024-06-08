import express from 'express';
const bookRouter = express.Router();
import adminValidate from '../Middlewares/adminPermissions';
import { bookUpload } from '../Middlewares/fileUpload';
import {
  addbook,
  updatebook,
  deletebook,
  listbooks,
  listbookById,
  listbookImageById,
} from '../Controllers/book.Controller';

//!post
bookRouter.post(
  '/api/v1/books',
  adminValidate,
  bookUpload.array('image'),
  addbook
);

//!get
bookRouter.get('/api/v1/books', listbooks);
bookRouter.get('/api/v1/books/image/:_id', listbookImageById);
bookRouter.get('/api/v1/books/:_id', listbookById);

//!patch
bookRouter.patch(
  '/api/v1/books/:_id',
  bookUpload.array('image'),
  adminValidate,
  updatebook
);

//!delete
bookRouter.delete('/api/v1/books/:_id', adminValidate, deletebook);

export default bookRouter;
