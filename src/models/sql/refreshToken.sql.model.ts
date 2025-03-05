import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../lib/sequelize.utils";
import { IRefreshToken, RefreshTokenStatusEnum } from "../../types/types";

interface RefreshTokenCreationAttributes
  extends Optional<
    IRefreshToken,
    | "id"
    | "device_id"
    | "device_name"
    | "device_type"
    | "ip_address"
    | "user_agent"
  > {}

class RefreshTokenModel
  extends Model<IRefreshToken, RefreshTokenCreationAttributes>
  implements IRefreshToken
{
  public id!: string;
  public user_id!: string;
  public token!: string;
  public expires_at!: Date;
  public status!: RefreshTokenStatusEnum;
  public device_id?: string;
  public device_name?: string;
  public device_type?: "mobile" | "desktop" | "tablet";
  public ip_address?: string;
  public user_agent?: string;
  public created_at!: Date;
}

RefreshTokenModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    device_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "refresh_tokens",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    underscored: true,
  }
);

export { RefreshTokenModel };
