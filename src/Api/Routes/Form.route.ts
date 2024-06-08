import express from 'express';
import { insertformController, getformByEmailController, getformsController } from '../Controllers/Form.Contoller';
import adminValidate from '../Middlewares/adminPermissions';
const formRouter = express.Router();

formRouter.post('/api/v1/forms', insertformController);

formRouter.get('/api/v1/forms/email', adminValidate, getformByEmailController);

formRouter.get('/api/v1/forms', adminValidate, getformsController);

export default formRouter;
