import express from 'express';
import adminValidate from '../Middlewares/adminPermissions';
import { adminLogin, createAdmin, getAdmin, getAllCustomers, BlockCustomer, listBlockedCustomers, unblockCustomer, healthCheck, getAllAdmin, removeAdmin, changeAdminPassword } from '../../Api/Controllers/User.Controller';

const UserRouter = express.Router();

// POST
UserRouter.post('/api/v1/admins/login', adminLogin);
UserRouter.post('/api/v1/admins', createAdmin);

// GET
UserRouter.get('/api/v1/admins/customers', getAllCustomers);
UserRouter.get('/api/v1/admins/get-blocked-customers', adminValidate, listBlockedCustomers);
UserRouter.get('/api/v1/admins/health-check', adminValidate, healthCheck);
UserRouter.get('/api/v1/admins', adminValidate, getAllAdmin);
UserRouter.get('/api/v1/admins/:_id', adminValidate, getAdmin);

// PATCHs
UserRouter.patch('/api/v1/admins/block-customer', adminValidate, BlockCustomer);
UserRouter.patch('/api/v1/admins/unblock-customer', adminValidate, unblockCustomer);
UserRouter.patch('/api/v1/admin/change-password/:_id', adminValidate, changeAdminPassword);

// DELETE
UserRouter.delete('/api/v1/admins/:_id', adminValidate, removeAdmin);

export default UserRouter;
