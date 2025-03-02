import { ActivityTypeEnum, IUserActivity } from "../../types/types";
import { Schema, model, Document } from "mongoose";

interface IUserActivityDocument extends IUserActivity, Omit<Document, "id"> {}

const UserActivitySchema = new Schema<IUserActivityDocument>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      default: () => Math.floor(Math.random() * 1000000), // Temporary solution for auto-increment
    },
    user_id: {
      type: String,
      required: true,
    },
    activity_type: {
      type: String,
      enum: Object.values(ActivityTypeEnum),
      required: true,
    },
    details: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: false,
    id: false,
  }
);

// Middleware to auto-increment the id field
UserActivitySchema.pre<IUserActivityDocument>("save", async function (next) {
  if (this.isNew) {
    const lastActivity = await UserActivityModel.findOne().sort({ id: -1 });
    this.id = lastActivity ? lastActivity.id + 1 : 1;
  }
  next();
});

const UserActivityModel = model<IUserActivityDocument>("identity_user_activities", UserActivitySchema);

export { UserActivityModel };