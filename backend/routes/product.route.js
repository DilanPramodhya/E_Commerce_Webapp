import express from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetAllProducts,
  GetFeaturedProducts,
  UpdateProduct,
} from "../controllers/product.controller.js";
import { AdminRoute, ProtectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", ProtectRoute, AdminRoute, GetAllProducts);
router.get("/featured",  GetFeaturedProducts);
router.get("/", ProtectRoute, AdminRoute, CreateProduct);
router.put("/update/:id", UpdateProduct);
router.post("/delete/:id", DeleteProduct);
// router.get("/getProfile", GetProfile);

export default router;
