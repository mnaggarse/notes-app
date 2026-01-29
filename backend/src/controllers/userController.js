import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/userModel.js";

export const getUserById = async (req, res) => {
  const userId = req.userId;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.userId;
  const { name, email, password } = req.body;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  if (!name && !email && !password) {
    return res.status(400).json({ message: "User not updated" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.userId;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.deleteOne({ _id: userId });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
