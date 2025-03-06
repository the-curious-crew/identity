import { v4 as uuidv4 } from "uuid";
import { refreshTokenService } from "./refreshToken.service";
import { IAccessTokenPayload, IDevice, IRefreshTokenPayload, RefreshTokenStatusEnum } from "../types/types";
import * as jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

// Define Token Expiry Times
const ACCESS_TOKEN_EXPIRY: string = process.env.ACCESS_TOKEN_EXPIRY || "15m";
const REFRESH_TOKEN_EXPIRY_DAYS =
  Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS) || 7; // Refresh token validity

// Function to generate tokens
export async function generateTokens(user_id: string, device: IDevice) {
  const { device_id, device_type, ip_address, user_agent } = device || {};
  // Create payload for the access token
  const accessTokenPayload: IAccessTokenPayload = { user_id, device_id };
  const accessToken = jwt.sign(accessTokenPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY as any, //ms.StringValue,
  });

  // Generate a unique refresh token ID
  const refreshTokenId = uuidv4();
  const refreshTokenPayload: IRefreshTokenPayload = {
    user_id,
    device_id,
    token_id: refreshTokenId,
  };

  // Generate refresh token
  const refreshToken = jwt.sign(refreshTokenPayload, REFRESH_TOKEN_SECRET, {
    expiresIn: `${REFRESH_TOKEN_EXPIRY_DAYS}d`,
  });

  // Store the refresh token in the database
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);
  const device_name = getDeviceName(device.device_name);

  await refreshTokenService.create({
    id: refreshTokenId,
    user_id,
    token: refreshToken,
    expires_at: expiresAt,
    status: RefreshTokenStatusEnum.ACTIVE,
    device_id,
    device_type,
    ip_address,
    user_agent,
    created_at: new Date(),
    device_name,
  });

  return { accessToken, refreshToken };
}

export async function refreshAccessToken(
  oldRefreshToken: string,
  device: IDevice
) {
  try {
    // Decode and verify refresh token
    const decoded = jwt.verify(
      oldRefreshToken,
      REFRESH_TOKEN_SECRET
    ) as IRefreshTokenPayload;
    const { user_id, device_id, token_id } = decoded;

    // Find token in DB
    const storedToken = await refreshTokenService.getById(token_id);
    if (
      !storedToken ||
      storedToken.status !== RefreshTokenStatusEnum.ACTIVE ||
      new Date(storedToken.expires_at) < new Date()
    )
      throw new Error("Invalid or expired refresh token");

    // Generate new tokens
    const { accessToken, refreshToken } = await generateTokens(user_id, {
      ...device,
      device_id: device_id,
    });

    // Invalidate old refresh token
    await refreshTokenService.update(token_id, {
      status: RefreshTokenStatusEnum.REVOKED,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Refresh token expired or invalid");
  }
}

const getDeviceName = (device_name: string) => {
  return device_name || "Unknown Device";
};



