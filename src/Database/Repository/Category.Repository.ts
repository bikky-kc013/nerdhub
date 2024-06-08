import  Unique  from '../../Utils/Crypto';
import { AppDataSource } from '../Connection';
import { Category } from '../Models/Category';
import CustomError from '../../Api/Middlewares/GlobalError';
import { SubCategory } from '../Models/SubCategory';



//!InsertCategory
export const insertCategory = async (name:string,slug:string, image:(string | undefined)):Promise<Object | undefined> =>{
    try{
        const categoryRepo = AppDataSource.getRepository(Category);
        const getCategory = await categoryRepo.findOne({where:{name }});
        if(getCategory) throw new CustomError("Category with similar name already exists",409);
        const saveCategory = await categoryRepo.save({
            _id:Unique(),
            name,
            slug,
            image
        });
        return saveCategory;
    }catch(error){
        throw error;
    }
}




//!updateCategory
export const categoryUpdate = async (_id:string, name:(string | undefined), slug:string, image:(string | undefined)):Promise<Category> =>{
    try{
        const categoryRepo = AppDataSource.getRepository(Category);
        const findCategory  = await categoryRepo.findOne({where:{_id}, select:["name"]});
        if(!findCategory) throw new CustomError("Sorry unable to find the category", 400);
        const updatedCategory = await categoryRepo.save({
            _id,
            name,
            slug,
            image
        });
        return updatedCategory;
    }catch(error){
        throw error;
    }
}






//!ListAllCategory
export const getAllCategory = async ():Promise< Category[] | undefined> =>{
    try{
        const categoryRepo = AppDataSource.getRepository(Category);
        const getAll = await categoryRepo.find({
            order:{
                inserted:"DESC"
            }
        });
        return getAll;
    }catch(error){
        throw error;
    }
}







//!getCategoryById
export const getCategorybyId = async (_id:string):Promise< Category> =>{
    try{
        const categoryRepo = AppDataSource.getRepository(Category);
        const getOne = await categoryRepo.findOne({where:{_id}});
        
        if(!getOne) throw new CustomError("Category not Found", 400);
        return  getOne;
    }catch(error){
        throw error;
    }
}




//!deleteCategoryById
export const deleteCategoryById = async (category:Category):Promise< boolean | undefined > =>{
    try{
        const categoryRepo = AppDataSource.getRepository(Category);
        const removeCategory = await categoryRepo.remove(category);
        if(!removeCategory) throw new CustomError("Unable to remove the category", 500); 
        return removeCategory ? true : false;
    }catch(error){
        throw error;
    }
}



//!checkSubcategoryByCategoryId
export const getSubcategoryByCategoryId  = async (_id:string):Promise<SubCategory[] > =>{
    try{
        const repo = AppDataSource.getRepository(SubCategory);
        const subcategories = await repo.find({ where: { category: { _id } } });
        return subcategories;
    }catch(error){
        console.log(error);   
        throw error;
    }
}



//!getProduct
export const getCategoryBySlug = async (slug:string):Promise<Category> =>{
    try{
        const categoryRepo = await AppDataSource.getRepository(Category);
        const findCategory = await categoryRepo.findOne({where:{slug}});
        if(!findCategory ) throw new CustomError("Category not Found",404);
        return findCategory;
    }catch(error){
        console.log(error);   
        throw error;
    }
}




//!checkCategorySlug
export const checkCagegoryCount = async (slug: string): Promise<number> => {
    try {
        const categoryRepo = await AppDataSource.getRepository(Category);
        const sqlSelect = `SELECT COUNT(*) AS count FROM category WHERE slug LIKE ?`;
        const results = await categoryRepo.query(sqlSelect, [`${slug}%`]);
        const slugs = results[0].count;
        const count = parseInt(slugs);
        return count; 
    } catch (error) {
        throw error;
    }
}

