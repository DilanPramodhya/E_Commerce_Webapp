import User from "../models/user.model.js";

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fill full form" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "user Already Exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({ user, message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  res.send("Login router");
};

export const Logout = async (req, res) => {
  res.send("Logout router");
};
