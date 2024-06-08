import express, { NextFunction, Request, Response } from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { AppDataSource } from './Database/Connection';
import { notFound, errorHandler } from './Api/Middlewares/HandleError';
import cors from 'cors';
import path from 'path';
import UserRouter from './Api/Routes/User.route';
import customerRouter from './Api/Routes/Customer.route';
import categoryRouter from './Api/Routes/Category.route';
import bookRouter from './Api/Routes/Book.route';
import cartItemsRouter from './Api/Routes/CartItems.route';
import subCategoryRouter from './Api/Routes/SubCategory.route';
import sliderRouter from './Api/Routes/Slider.route';
import formRouter from './Api/Routes/Form.route';
import blogRouter from './Api/Routes/Blog.route';
import checkOutRouter from './Api/Routes/checkOut.route';
import orderRouter from './Api/Routes/Oders.route';

app.use('/public', express.static(path.resolve(__dirname, '../public')));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 100000 })
);
app.use(
  cors({
    origin: '*',
    credentials: false,
  })
);

const StartServer = async (): Promise<void> => {
  try {
    const dataSource = await AppDataSource.initialize();
    await dataSource.runMigrations();
  } catch (error) {
    console.log(error);
  }
};
StartServer();

//! Routes
app.use(UserRouter);
app.use(customerRouter);
app.use(categoryRouter);
app.use(bookRouter);
app.use(cartItemsRouter);
app.use(subCategoryRouter);
app.use(sliderRouter);
app.use(formRouter);
app.use(blogRouter);
app.use(checkOutRouter);
app.use(orderRouter);

//! Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT || '3000');

app.listen(PORT, () => {
  console.log(`Server is Listening to the PORT ${PORT}`);
});
