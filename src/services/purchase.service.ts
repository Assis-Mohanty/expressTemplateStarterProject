import { PurchaseDTO } from "../dto/purchase.dto";
import { createPurchase, deletePurchase, getAllPurchases, getPurchase, getPurchasesByBuyer, getPurchasesByUser } from "../repository/purchase.repository";
import { getUser, updateUser } from "../repository/user.repository";
import { BadRequestError } from "../utils/errors/app.error";

export async function createPurchaseService(purchaseDTO:PurchaseDTO) {
    const buyer=await getUser(purchaseDTO.buyerId);
    if(!buyer){
        throw new BadRequestError("Buyer does not exist");
    }
    if(buyer.walletBalance < purchaseDTO.amountPaid){
        throw new BadRequestError("Insufficient wallet balance");
    }
    buyer.walletBalance -= purchaseDTO.amountPaid;
    await buyer.save();
    
    const purchase=await createPurchase(purchaseDTO);
    return purchase;
}

export async function getPurchaseService(id:number) {
    const purchase=await getPurchase(id)
    return purchase
}
export async function getAllPurchasesService() {
    const purchases=await getAllPurchases()
    return purchases
}
export async function getPurchasesByBuyerService(buyerId:number) {
    const purchases=await getPurchasesByBuyer(buyerId)
    return purchases
}
export async function getPurchasesByUserService(userId:number) {
    const purchases=await getPurchasesByUser(userId)
    return purchases
}
export async function deletePurchaseService(id:number) {
    const result=await deletePurchase(id)
    return result
}