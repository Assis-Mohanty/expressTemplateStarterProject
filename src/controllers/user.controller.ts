import { NextFunction, Request, Response } from "express";
import {
    addMoneyBalance,
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from "../services/user.service";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await createUserService(req.body);
  res.status(201).json({
    message: "created user successfully",
    success: true,
    data: user,
  });
}
export async function getUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    // Validate that ID is a valid positive integer
    if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
      throw new BadRequestError("Invalid user ID");
    }

    const user = await getUserService(id);

    // Check if user exists
    if (!user) {
      throw new NotFoundError("User not found");
    }

    res.status(200).json({
      message: "fetched user successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllUsersHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await getAllUsersService();
  res.status(200).json({
    message: "fetched users successfully",
    success: true,
    data: user,
  });
}

export async function deleteUserHandler(
  req: Request,
  res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);  
        // Validate that ID is a valid positive integer
        if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
            throw new BadRequestError("Invalid user ID");
        }
        const result = await deleteUserService(id);
        if (result === null) {
            throw new NotFoundError("User not found");
        }res.status(200).json({
            message: "deleted user successfully",
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export async function updateUserHandler(
  req: Request,
  res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);
        // Validate that ID is a valid positive integer
        if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
            throw new BadRequestError("Invalid user ID");
        }
        const updateBody = req.body;
        const updatedUser = await updateUserService(id, updateBody);
        if (!updatedUser) {
            throw new NotFoundError("User not found");
        }

        res.status(200).json({
            message: "updated user successfully",
            success: true,
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
}
export async function addMoneyBalanceHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = Number(req.params.id);
        const money = Number(req.body.money);

        // Validate that ID is a valid positive integer
        if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
            throw new BadRequestError("Invalid user ID");
        }

        // Validate that money is a valid number and greater than 0
        if (isNaN(money) || money <= 0) {
            throw new BadRequestError("Invalid amount of money");
        }

        const updatedUser = await addMoneyBalance(money, id);

        if (!updatedUser) {
            throw new NotFoundError("User not found");
        }

        res.status(200).json({
            message: "added money balance successfully",
            success: true,
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
}