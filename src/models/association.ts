import { Asset } from "./assets";
import { User } from "./user";

User.hasMany(Asset, { foreignKey: "ownerId" });
Asset.belongsTo(User, { foreignKey: "ownerId" });

export { User, Asset };

