import { NextFunction, Request, Response } from "express";
import { createAssetService, deleteAssetService, getAllAssetsService, getAssetsByOwnerService, getAssetService, updateAssetService } from "../services/asset.service";


export async function createAssetHandler(req:Request,res:Response,next:NextFunction) {
    const { ownerId, url, type, pricePerDownload, pricePerUse } = req.body;
    const asset=await createAssetService({ ownerId, url, type, pricePerDownload, pricePerUse });
    res.status(201).json({
        message: "created asset successfully",
        success: true,
        data: asset
    });
}

export async function getAssetHandler(req:Request,res:Response,next:NextFunction) {
    const asset=await getAssetService(Number(req.params.id))      
    res.status(200).json({  
        message:"fetched asset successfully",
        success:true,
        data:asset
    })
}

export async function getAllAssetsHandler(req:Request,res:Response,next:NextFunction) {
    const asset=await getAllAssetsService()
    res.status(200).json({  
        message:"fetched assets successfully",
        success:true,
        data:asset
    })
}

export async function getAssetsByOwnerHandler(req:Request,res:Response,next:NextFunction) {
    const ownerId = Number(req.params.ownerId);
    const assets = await getAssetsByOwnerService(ownerId);
    // const filteredAssets = assets.filter(asset => asset.ownerId === ownerId);
    res.status(200).json({  
        message:"fetched assets by owner successfully",
        success:true,
        data:assets
    })
}

export async function deleteAssetHandler(req:Request,res:Response,next:NextFunction) {
    const id = Number(req.params.id);
    const result = await deleteAssetService(id);
    res.status(200).json({
        message: "deleted asset successfully",
        success: true,
        data: result
    });
}

export async function updateAssetHandler(req:Request,res:Response,next:NextFunction) {
    const id = Number(req.params.id);
    const updateBody = req.body;
    const updatedAsset = await updateAssetService(id, updateBody);
    res.status(200).json({
        message: "updated asset successfully",
        success: true,
        data: updatedAsset
    });
}