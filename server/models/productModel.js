import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  category: { type: String, required: true },
  image:  white.jpg,
  price: { type: Number, required: true },
  description: { type, String, required: true}
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;