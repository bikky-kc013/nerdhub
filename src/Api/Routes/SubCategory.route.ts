import express from 'express';
const subCategoryRouter = express.Router();
import { addSubCategory,getSubCategories,removeSubCategory,getSubCategory,updateSubCategory,getSubcategoryByCategoryId } from '../Controllers/SubCategory.Controller';
import adminValidate from '../Middlewares/adminPermissions';
import { subCategoryUpload } from '../Middlewares/fileUpload';




//!post
subCategoryRouter.post('/api/v1/subcategories',adminValidate,subCategoryUpload.single("image"), addSubCategory);


//!get
subCategoryRouter.get('/api/v1/subcategories/:_id',getSubCategory);
subCategoryRouter.get('/api/v1/subcategories', getSubCategories);
subCategoryRouter.get('/api/v1/subcategories/category/:categoryId', getSubcategoryByCategoryId);

//!patch
subCategoryRouter.patch('/api/v1/subcategories/:_id', adminValidate, subCategoryUpload.single("image"), updateSubCategory);


//!delete
subCategoryRouter.delete('/api/v1/subcategories/:_id', adminValidate, removeSubCategory);



export default subCategoryRouter;