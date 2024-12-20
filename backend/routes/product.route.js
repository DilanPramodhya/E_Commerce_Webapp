import express from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetAllProducts,
  GetFeaturedProducts,
  GetProductByCategory,
  Recommendations,
  ToggleFeaturedProducts,
  UpdateProduct,
} from "../controllers/product.controller.js";
import { AdminRoute, ProtectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", ProtectRoute, AdminRoute, GetAllProducts);
router.get("/featured", GetFeaturedProducts);
router.get("/category/:category", GetProductByCategory);
router.get("/recommendations", Recommendations);
router.post("/", ProtectRoute, AdminRoute, CreateProduct);
router.patch("/:id", ProtectRoute, AdminRoute, ToggleFeaturedProducts);
router.delete("/:id", ProtectRoute, AdminRoute, DeleteProduct);
// router.get("/getProfile", GetProfile);

export default router;
