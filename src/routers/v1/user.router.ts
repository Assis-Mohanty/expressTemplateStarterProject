import express from "express";
import {
  createUserController,
  getUserHandler,
  getAllUsersHandler,
  addMoneyBalanceHandler,
} from "../../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/", createUserController);
userRouter.get("/:id", getUserHandler);
userRouter.get("/", getAllUsersHandler);
userRouter.patch("/:id", addMoneyBalanceHandler);

export default userRouter;
