import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    brand: {
      type: String,
      required: true,
      unique: true, // Ensures brand names are unique
    },
    models: {
      type: [String], 
      required: true,
    },
  });
  

const Brand = mongoose.model("Brand", BrandSchema);
export default Brand;
