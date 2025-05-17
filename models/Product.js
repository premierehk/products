// /models/Product.js

import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  colorType: { type: String, required: true },
  personalityType: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
})

// 防止重複編譯模型（Hot reload 時會有影響）
export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
