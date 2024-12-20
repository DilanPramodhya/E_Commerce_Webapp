import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
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
export const GetFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not in redis, fetch from MONGODB
    featuredProducts = await Product.find({ isFeatured: true }).lean(); // .lean() is gonna a return a plain javascript object instead of a mongodb document

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured product found" });
    }

    // Store in redis for future quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));

    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeatured products", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const CreateProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }
    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("Error in creating product controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Server Not Found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0]; // this will get the id of the image
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Deleted image from cloudinary");
      } catch (error) {
        console.log("Error Deleting image from cloudinary", error);
      }
      await Product.findByIdAndDelete(req.params.id);

      res.json({ message: "Product Deleted Successfully" });
    }
  } catch (error) {
    console.log("Error in deleting product controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const UpdateProduct = async (req, res) => {};
