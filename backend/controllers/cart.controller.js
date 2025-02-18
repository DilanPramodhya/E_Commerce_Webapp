import Product from "../models/product.model.js";

export const AddToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in AddToCart controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const GetCartProducts = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } }); // coming from userSchema -> cartItems -> product

    // Add quantity for each product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });
  } catch (error) {
    console.log("Error in GetCartProducts controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const RemoveAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in AddToCart controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const UpdateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingUser = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.json(user.cartItems);
      }

      existingItem.quantity = quantity;
      await user.save();
      return res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.log("Error in UpdateQuantity controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
