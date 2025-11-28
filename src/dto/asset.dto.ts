import { AssetType } from "../models/assets"

export type AssetDTO={
    ownerId:number
    url:string
    type:AssetType
    pricePerDownload:number
    pricePerUse:number
}