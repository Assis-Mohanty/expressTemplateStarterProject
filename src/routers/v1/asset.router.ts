import express from "express";

import { createAssetHandler, deleteAssetHandler, getAllAssetsHandler, getAssetHandler, getAssetsByOwnerHandler, updateAssetHandler } from "../../controllers/asset.controller";

const assetRouter = express.Router();

assetRouter.post("/", createAssetHandler);
assetRouter.get("/:id", getAssetHandler);
assetRouter.get("/", getAllAssetsHandler);
assetRouter.get("/owner/:ownerId", getAssetsByOwnerHandler);
assetRouter.patch("/:id", updateAssetHandler);
assetRouter.delete("/:id", deleteAssetHandler);

export default assetRouter;
