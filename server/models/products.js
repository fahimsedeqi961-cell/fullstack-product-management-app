import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  image: {
    type: String,
    default: ""
  }

});

const Product = mongoose.model("product", productsSchema);
export default Product;
