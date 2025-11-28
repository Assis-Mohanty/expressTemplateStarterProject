import { AssetDTO } from "../dto/asset.dto";
import { Asset } from "../models/assets";

export async function createAssetRepository(createAsset:AssetDTO) {
    const asset=await Asset.create(createAsset)
    return asset
}
export async function getAssetRepository(id:number) {
    const asset=await Asset.findByPk(id)
    return asset
}
export async function getAllAssetsRepository() {
    const assets=await Asset.findAll()
    return assets
}
export async function getAssetsByOwnerRepository(ownerId:number) {
    const assets=await Asset.findAll({where:{ownerId}})
    return assets
}
export async function deleteAssetRepository(id:number) {
    const result=await Asset.destroy({where:{id}})
    return result
}
export async function updateAssetRepository(id:number,updateBody:Partial<AssetDTO>) {
    const asset=await Asset.findByPk(id)
    if(!asset){
        return null
    }
    const updatedAsset=await asset.update(updateBody)
    return updatedAsset
}