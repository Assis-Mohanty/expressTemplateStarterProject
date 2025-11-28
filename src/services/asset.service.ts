import { AssetDTO } from "../dto/asset.dto";
import { createAssetRepository, deleteAssetRepository, getAllAssetsRepository, getAssetRepository, getAssetsByOwnerRepository, updateAssetRepository } from "../repository/asset.repository";

export async function createAssetService(createAsset:AssetDTO) {
    const asset=await createAssetRepository(createAsset)
    return asset
}

export async function getAssetService(id:number) {
    const asset=await getAssetRepository(id)
    return asset
}

export async function getAllAssetsService() {
    const assets=await getAllAssetsRepository()
    return assets
}
export async function getAssetsByOwnerService(ownerId:number) {
    const assets=await getAssetsByOwnerRepository(ownerId)
    return assets
}
export async function deleteAssetService(id:number) {
    const result=await deleteAssetRepository(id)
    return result
}

export async function updateAssetService(id:number,updateBody:Partial<AssetDTO>) {
    const updatedAsset=await updateAssetRepository(id,updateBody)
    return updatedAsset
}   