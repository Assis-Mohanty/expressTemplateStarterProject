import { PurchaseType } from "../models/purchase"

export type PurchaseDTO={
    buyerId:number
    userId:number
    assetId:number
    type:PurchaseType
    amountPaid:number
    royaltyPaid:number
}
