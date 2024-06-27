import express from 'express';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import connectDB from './config/db.js';
import products from './data/product.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();
const port = 5000;

// Read and parse the data.json file
const __dirname = path.resolve();
const rawData = readFileSync(path.join(__dirname, 'backend/data/data.json'), 'utf-8');
const data = JSON.parse(rawData); // Parsing the JSON string

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
