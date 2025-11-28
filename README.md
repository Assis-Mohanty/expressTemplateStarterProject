npx sequelize-cli model:generate --User --attributes email:string
for all models
model User {
  id                 Int        @id @default(autoincrement())
  email              String     @unique
  name               String
  walletBalance      Float      @default(0)      
  withdrawableBalance Float     @default(0)      
  assets             Asset[]                     
  purchases          Purchase[]                  
  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt
}

model Asset {
  id                 Int        @id @default(autoincrement())
  ownerId            Int
  owner              User       @relation(fields: [ownerId], references: [id])
  url                String
  type               AssetType  
  pricePerDownload   Float
  pricePerUse        Float
  royaltyPercent     Float      @default(30)   
  totalEarnings      Float      @default(0)
  usageCount         Int        @default(0)
  purchases          Purchase[]
  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt
}

model Purchase {
  id                 Int       @id @default(autoincrement())
  userId             Int
  assetId            Int       
  type               PurchaseType  
  amountPaid         Float
  royaltyPaid        Float
  timestamp          DateTime  @default(now())
  user               User      @relation(fields: [userId], references: [id])
  asset              Asset     @relation(fields: [assetId], references: [id])
}

enum AssetType {
  IMAGE
  VOICE
  AVATAR
}

enum PurchaseType {
  DOWNLOAD
  USE
}



