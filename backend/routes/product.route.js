import express from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetAllProducts,
  GetFeaturedProducts,
  GetProductByCategory,
  Recommendations,
  UpdateProduct,
} from "../controllers/product.controller.js";
import { AdminRoute, ProtectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", ProtectRoute, AdminRoute, GetAllProducts);
router.get("/featured", GetFeaturedProducts);
router.get("/category/:category", GetProductByCategory);
router.get("/recommendations", Recommendations);
router.delete("/:id", ProtectRoute, AdminRoute, DeleteProduct);
router.put("/update/:id", UpdateProduct);
// router.get("/getProfile", GetProfile);

export default router;
