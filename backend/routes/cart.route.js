import express from "express";
import { AdminRoute, ProtectRoute } from "../middleware/auth.middleware.js";
import {
  AddToCart,
  GetCartProducts,
  RemoveAllFromCart,
  UpdateQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", ProtectRoute, GetCartProducts);
router.post("/", ProtectRoute, AddToCart);
router.delete("/", ProtectRoute, RemoveAllFromCart);
router.put("/:id", ProtectRoute, UpdateQuantity);

export default router;
