import express from 'express';
import adminValidate from '../Middlewares/adminPermissions';
import { addSlider, getAllSliders, getSlider, removeSlider } from '../Controllers/Slider.Controller';
const sliderRouter = express.Router();
import { sliderUpload } from '../Middlewares/fileUpload';


sliderRouter.post('/api/v1/sliders', adminValidate, sliderUpload.single("image"), addSlider);
sliderRouter.get('/api/v1/sliders', getAllSliders);
sliderRouter.get('/api/v1/sliders/:_id', getSlider);
sliderRouter.delete('/api/v1/sliders/:_id', adminValidate, removeSlider);


export default sliderRouter;