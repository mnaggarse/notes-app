import express from "express";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", getUserById);
router.put("/me", updateUser);
router.delete("/me", deleteUser);

export default router;
