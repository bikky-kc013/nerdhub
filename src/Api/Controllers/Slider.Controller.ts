import { Request, Response, NextFunction } from 'express';
import { sliderInsertSchema,sliderUpdateSchema } from '../../Schema/Slider.Schema';
import {sliderInsert, sliderUpdate}  from '../../Types/Slider';
import { ID, slug } from 'src/Types/Global';
import CustomError from '../Middlewares/GlobalError';
import Unsync from '../../Utils/Unsync';
import path from 'path';
import { insertSlider, getSliderById, deleteSlider, getSliders } from '../../Database/Repository/Slider.Repository';





export const addSlider = async (req:Request<{},{},sliderInsert>,res:Response,next:NextFunction) =>{
    try{
        const data = sliderInsertSchema.parse(req.body);
        console.log(data);
        const image = (req.file)?.filename;
        
        if(!image) throw new  CustomError("Image is required", 400);
        const addData = await insertSlider(data, image);
        if(!addData) throw new CustomError("Unable to insert Slider", 500);
        res.json({
            status:"Status",
            data:addData,
            message:"Successfully Inserted Slider"
        })
    }catch(error){
        console.log(error);
        const image = (req.file)?.filename; 
        if (image) {
              await  Unsync(path.join(__dirname, `../../../public/slider/${image}`));
        }
        next(error);
    }
}   



export const removeSlider = async (req:Request<ID,{},sliderInsert>,res:Response,next:NextFunction) => {
    try{
        const _id = req.params._id;
        if(!_id) throw new CustomError("Id not provided", 400);
        const slider  = await getSliderById(_id);
        const image = slider?.image;
        if(slider){ 
            const removeSlider  = await deleteSlider(slider);
            if(image){
                await  Unsync(path.join(__dirname, `../../../public/slider/${image}`));
            }
         };
         res.json({
            status:"Success",
            message:"Successfully removed the slider"
         })
    }catch(error){
        next(error);
    }
}



export const getSlider = async (req:Request<ID,{},sliderInsert>,res:Response,next:NextFunction) =>{
    try{
        const _id  = req.params._id;
        if(!_id) throw new CustomError("Id not provided", 400);
        const slider  = await getSliderById(_id);
        if(!slider){
            return res.json({
                status:"Success",
                data:[],
                message:"Successfully Fetched the Slider"
            });
        } 
        res.json({
            status:"Success",
            data:slider,
            message:"Successfully fetched the slider"
        })

    }catch(error){
      next(error);  
    }
}




export const getAllSliders = async (req:Request<ID,{},sliderInsert>,res:Response,next:NextFunction) =>{
    try{
        const slider  = await getSliders();
        if(!slider){
            return res.json({
                status:"Success",
                data:[],
                message:"Successfully Fetched the Slider"
            });
        } 
        res.json({
            status:"Success",
            data:slider,
            message:"Successfully fetched All the slider"
        })

    }catch(error){
      next(error);  
    }
}