import mongoose from 'mongoose';

const reviewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true },
    reviewerName: { type: String, required: true },
    reviewerEmail: { type: String, required: true },
    }, {
    timestamps: true,
    });

const productSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  
  href: { type: String, required: true },

  rating: { type: Number, required: true },
  
  images: [
    {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
  ],
  message: { type: String, required: false },
  sizes: [
    {
      name: { type: String, required: true },
      inStock: { type: Boolean, required: true },
    },
  ],
  
  highlights: [{ type: String, required: true }],
  
  reviews:[reviewsSchema],
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
