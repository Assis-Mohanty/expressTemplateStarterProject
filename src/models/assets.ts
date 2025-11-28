import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "./sequelize";
export enum AssetType {
    IMAGE="IMAGE",  
    VOICE = "VOICE",   
    AVATAR = "AVATAR",
}

export class Asset extends Model<
  InferAttributes<Asset>,
  InferCreationAttributes<Asset>
>{
    declare id: CreationOptional<number>;
    declare ownerId: number;
    declare url: string;
    declare type: AssetType;
    declare pricePerDownload: number;
    declare pricePerUse: number;
    declare royaltyPercent: CreationOptional<number>;
    declare totalEarnings: CreationOptional<number>;
    declare usageCount: CreationOptional<number>;
}
Asset.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Users", key: "id" } 
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(...Object.values(AssetType)),
            allowNull: false,
        },
        pricePerDownload: {
            type: DataTypes.FLOAT,
            allowNull: false,   
        },
        pricePerUse: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        royaltyPercent: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 30,
        },
        totalEarnings: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        usageCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize:sequelize,
        paranoid:true,
        timestamps: true,
    }
);



// model Asset {
//   id                 Int        @id @default(autoincrement())
//   ownerId            Int
//   owner              User       @relation(fields: [ownerId], references: [id])
//   url                String
//   type               AssetType  
//   pricePerDownload   Float
//   pricePerUse        Float
//   royaltyPercent     Float      @default(30)   
//   totalEarnings      Float      @default(0)
//   usageCount         Int        @default(0)
//   purchases          Purchase[]
//   createdAt          DateTime   @default(now())
//   updatedAt          DateTime   @updatedAt
// }