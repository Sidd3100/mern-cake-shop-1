import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        images: [{ src: "./data/image.png", alt: "Sample image" }],
        brand: "Sample brand",
        category: "Sample category",
        rating: 0,
        href: "./data/image.png",
        description: "Sample description",
        details: "Sample details",
        sizes: [
          {
            name: "Sample size",
            inStock: true,
            countInstock: 0,
          },
        ],
        highlights: ["Sample highlight 1", "Sample highlight 2"],
        reviews: [],
      });
      
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, href, rating, details, sizes, highlights, images } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.category = category || product.category;
        product.href = href || product.href;
        product.rating = rating || product.rating;
        product.details = details || product.details;
        product.sizes = sizes || product.sizes;
        product.highlights = highlights || product.highlights;
        product.images = images || product.images;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});



export { getProducts, getProductById, createProduct, updateProduct, deleteProduct};