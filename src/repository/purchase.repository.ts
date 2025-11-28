import { PurchaseDTO } from "../dto/purchase.dto";
import { Purchase } from "../models/purchase";

export async function createPurchase(createPurchaseBody:PurchaseDTO) {
    const purchase=await Purchase.create(createPurchaseBody)
    return purchase
}
export async function getPurchase(id:number) {
    const purchase=await Purchase.findByPk(id)
    return purchase
}
export async function getAllPurchases() {
    const purchases=await Purchase.findAll()
    return purchases
}
export async function getPurchasesByBuyer(buyerId:number) {
    const purchases=await Purchase.findAll({where:{buyerId}})
    return purchases
}
export async function getPurchasesByUser(userId:number) {
    const purchases=await Purchase.findAll({where:{userId}})
    return purchases
}
export async function getPurchasesByAsset(assetId:number) {
    const purchases=await Purchase.findAll({where:{assetId}})
    return purchases
}
export async function deletePurchase(id:number) {
    const result=await Purchase.destroy({where:{id}})
    return result
}
export async function updatePurchase(id:number,updateBody:Partial<PurchaseDTO>) {
    const purchase=await Purchase.findByPk(id);
    if(!purchase){
        return null
    }
    await purchase.update(updateBody);
    return purchase;
}