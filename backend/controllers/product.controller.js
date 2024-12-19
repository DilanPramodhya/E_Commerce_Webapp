import Product from "../models/product.model.js";

export const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.log("Error in getall products", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const CreateProduct = async (req, res) => {};

export const UpdateProduct = async (req, res) => {};

export const DeleteProduct = async (req, res) => {};
