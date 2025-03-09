import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../lib/sequelize.utils";
import { UserModel } from "./user.sql.model";
import { ActivityTypeEnum, IUserActivity } from "../../types/types";

interface UserActivityCreationAttributes extends Optional<IUserActivity, "id"> {}

class UserActivityModel extends Model<IUserActivity, UserActivityCreationAttributes> implements IUserActivity {
  public id!: number;
  public user_id!: string;
  public activity_type!: ActivityTypeEnum;
  public details?: string;
  public created_at!: Date;
}

UserActivityModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity_type: {
      type: DataTypes.ENUM(...Object.values(ActivityTypeEnum)),
      allowNull: false,
    },
    details: {
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
    tableName: "identity_user_activities",
    timestamps: false,
  }
);

export { UserActivityModel };
