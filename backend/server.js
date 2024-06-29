import express from 'express';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import connectDB from './config/db.js';
import products from './data/product.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

connectDB();

const app = express();
const port = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());    

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
