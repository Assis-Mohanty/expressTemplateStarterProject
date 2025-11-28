import express from "express";
import {
  createUserController,
  getUserHandler,
  getAllUsersHandler,
} from "../../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/", createUserController);
userRouter.get("/:id", getUserHandler);
userRouter.get("/", getAllUsersHandler);

export default userRouter;
