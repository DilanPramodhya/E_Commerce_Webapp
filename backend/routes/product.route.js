import express from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetAllProducts,
  UpdateProduct,
} from "../controllers/product.controller.js";
import { AdminRoute, ProtectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", CreateProduct);
router.get("/", ProtectRoute, AdminRoute, GetAllProducts);
router.put("/update/:id", UpdateProduct);
router.post("/delete/:id", DeleteProduct);
// router.get("/getProfile", GetProfile);

export default router;
