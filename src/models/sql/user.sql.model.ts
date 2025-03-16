import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../lib/sequelize.utils";
import { IUser, UserStatusEnum } from "../../types/types";

interface UserCreationAttributes
  extends Optional<
    IUser,
    | "id"
    | "email"
    | "phone"
    | "display_name"
    | "picture"
    | "provider_data"
    | "last_login"
  > {}

class UserModel extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: string;
  public email?: string;
  public phone?: string;
  public username!: string;
  public email_verified!: boolean;
  public phone_verified!: boolean;
  public display_name?: string;
  public picture?: string;
  public provider_data?: Record<string, any>;
  public status!: UserStatusEnum;
  public secret?: string;
  public hotp_count!: number;
  public last_login?: Date;
  public created_at!: Date;
  public updated_at!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "blocked", "deleted"),
      allowNull: false,
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hotp_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "identity_users",
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
    underscored: true,
  }
);

export { UserModel };
