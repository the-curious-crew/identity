import { IUser } from "../../types/types";
import { Schema, model, Document } from "mongoose";
import { randomUUID } from "crypto";

interface IUserDocument extends IUser, Omit<Document, "id"> {}

const UserSchema = new Schema<IUserDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => randomUUID(),
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      sparse: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    phone_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    display_name: {
      type: String,
    },
    picture: {
      type: String,
    },
    provider_data: {
      type: Map,
      of: Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: ["active", "blocked", "deleted"],
      required: true,
    },
    secret: {
      type: String,
    },
    hotp_count: {
      type: Number,
      default: 0,
    },
    last_login: {
      type: Date,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const UserModel = model<IUserDocument>("identity_users", UserSchema);

export { UserModel };
