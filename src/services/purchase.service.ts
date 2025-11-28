import { PurchaseDTO } from "../dto/purchase.dto";
import { createPurchase, deletePurchase, getAllPurchases, getPurchase, getPurchasesByBuyer, getPurchasesByUser } from "../repository/purchase.repository";
import { getUser} from "../repository/user.repository";
import { BadRequestError } from "../utils/errors/app.error";
import { getAssetService } from "./asset.service";

export async function createPurchaseService(purchaseDTO:PurchaseDTO) {
    if(purchaseDTO.type==="DOWNLOAD"){
        const asset=await getAssetService(purchaseDTO.assetId);
        if(!asset){
            throw new BadRequestError("Asset does not exist");
        }
        const price=asset.pricePerDownload;
        const buyer=await getUser(purchaseDTO.userId);
        if(!buyer){
            throw new BadRequestError("User does not exist");
        }
        if(buyer.walletBalance<price){
            throw new BadRequestError("Insufficient price for download");
        }
        buyer.walletBalance=buyer.walletBalance-price;
        await buyer.save();
        const owner=await getUser(asset.ownerId);
        if(!owner){
            throw new BadRequestError("Owner does not exist");
        }
        const royalty=(asset.royaltyPercent/100)*price;
        owner.walletBalance=owner.walletBalance+price-royalty;
        await owner.save();
        asset.totalEarnings=asset.totalEarnings+price-royalty;
        asset.usageCount=asset.usageCount+1;
        await asset.save();
        const purchase=await createPurchase({...purchaseDTO, amountPaid:price,royaltyPaid:royalty});
        await purchase.save();
        return purchase;
    }
    if(purchaseDTO.type==="USE"){
        const asset=await getAssetService(purchaseDTO.assetId);
        if(!asset){
            throw new BadRequestError("Asset does not exist");
        }
        const price=asset.pricePerUse;
        const buyer=await getUser(purchaseDTO.userId);
        if(!buyer){
            throw new BadRequestError("User does not exist");
        }
        if(buyer.walletBalance<price){
            throw new BadRequestError("Insufficient price for download");
        }
        buyer.walletBalance=buyer.walletBalance-price;
        await buyer.save();
        const owner=await getUser(asset.ownerId);
        if(!owner){
            throw new BadRequestError("Owner does not exist");
        }
        const royalty=(asset.royaltyPercent/100)*price;
        owner.walletBalance=owner.walletBalance+price-royalty;
        await owner.save();
        asset.totalEarnings=asset.totalEarnings+price-royalty;
        asset.usageCount=asset.usageCount+1;
        await asset.save();
        const purchase=await createPurchase({...purchaseDTO, amountPaid:price,royaltyPaid:royalty});
        await purchase.save();
        return purchase;
    }


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