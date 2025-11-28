import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "./sequelize";

export enum PurchaseType {
  DOWNLOAD="DOWNLOAD",  
  USE="USE"
}


export class Purchase extends Model<
  InferAttributes<Purchase>,
  InferCreationAttributes<Purchase>
>{
    declare id: CreationOptional<number>;
    declare userId: number;
    declare assetId: number;
    declare buyerId: number;
    declare type: PurchaseType;
    declare amountPaid: CreationOptional<number>;
    declare royaltyPaid: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;
}

Purchase.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Users", key: "id" }
        },
        assetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Assets", key: "id" }
        },
        buyerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Users", key: "id" }
        },
        type: {
            type: DataTypes.ENUM(...Object.values(PurchaseType)),
            allowNull: false,
        },
        amountPaid: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        royaltyPaid: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize: sequelize,
        paranoid: true,
        timestamps: true,
    }
);



// model Purchase {
//   id                 Int       @id @default(autoincrement())
//   userId             Int
//   assetId            Int       
//   type               PurchaseType  
//   amountPaid         Float
//   royaltyPaid        Float
//   timestamp          DateTime  @default(now())
//   user               User      @relation(fields: [userId], references: [id])
//   asset              Asset     @relation(fields: [assetId], references: [id])
// }