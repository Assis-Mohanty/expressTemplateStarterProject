import { NextFunction, Request, Response } from "express";
import { createUserService, getAllUsersService, getUserService } from "../services/user.service";

export async function createUserController(req:Request,res:Response,next:NextFunction) {
        const user = await createUserService(req.body);
        res.status(201).json({
            message: "created user successfully",
            success: true,
            data: user
        });
}
export async function getUserHandler(req:Request,res:Response,next:NextFunction) {
    const user=await getUserService(Number(req.params.id))      
    res.status(200).json({  
        message:"fetched user successfully",
        success:true,
        data:user
    })
}

export async function getAllUsersHandler(req:Request,res:Response,next:NextFunction) {
    const user=await getAllUsersService()      
    res.status(200).json({  
        message:"fetched users successfully",
        success:true,
        data:user
    })
}
