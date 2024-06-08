import express from 'express';
const categoryRouter = express.Router();
import { createCategory, updateCategory,listCategory,getCategory,deleteCategory } from '../Controllers/Category.Controller';
import adminValidate from '../Middlewares/adminPermissions';
import { categoryUpload } from '../Middlewares/fileUpload';



//!post
categoryRouter.post('/api/v1/categories', adminValidate, categoryUpload.single("image"), createCategory);


//!get
categoryRouter.get('/api/v1/categories', listCategory);
categoryRouter.get('/api/v1/categories/:_id', getCategory);


//!patch
categoryRouter.patch('/api/v1/categories/:_id', adminValidate, categoryUpload.single("image"), updateCategory);


//!delete
categoryRouter.delete('/api/v1/categories/:_id', adminValidate, deleteCategory);


export default categoryRouter;