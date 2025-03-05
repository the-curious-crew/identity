import { IRefreshToken } from "../../types/types";
import { Schema, model, Document } from "mongoose";
import { randomUUID } from "crypto";

interface IRefreshTokenDocument extends IRefreshToken, Omit<Document, "id"> {}

const RefreshTokenSchema = new Schema<IRefreshTokenDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => randomUUID(),
    },
    user_id: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    device_id: {
      type: String,
    },
    device_name: {
      type: String,
    },
    device_type: {
      type: String,
    },
    ip_address: {
      type: String,
    },
    user_agent: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
    id: false,
  }
);

const RefreshTokenModel = model<IRefreshTokenDocument>("refresh_tokens", RefreshTokenSchema);

export { RefreshTokenModel };