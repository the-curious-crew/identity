export interface IUser {
  id: string;
  email?: string;
  phone?: string;
  username: string;
  email_verified: boolean;
  phone_verified: boolean;
  display_name?: string;
  picture?: string;
  provider_data?: Record<string, any>;
  status: UserStatusEnum;
  last_login?: Date;
  secret?: string;
  hotp_count?: number;
  created_at?: Date;
  updated_at?: Date;
}

export enum UserStatusEnum {
  ACTIVE = "active",
  BLOCKED = "blocked",
  DELETED = "deleted",
}

export interface IUserActivity {
  id: number;
  user_id: string;
  activity_type: ActivityTypeEnum;
  details?: string;
  created_at: Date;
}

export enum ActivityTypeEnum {
  LOGIN = "login",
  LOGOUT = "logout",
  PASSWORD_CHANGE = "password_change",
  PROFILE_UPDATE = "profile_update",
  ACCOUNT_DELETION = "account_deletion",
}

export interface IRefreshToken {
  id: string; // Unique ID (UUID)
  user_id: string; // Reference to the user
  token: string; // The actual refresh token
  expires_at: Date; // Expiry date
  status: RefreshTokenStatusEnum; // Status of the token
  device_id?: string; // Unique device identifier
  device_name?: string; // Name of the device
  device_type?: string; //"mobile" | "desktop" | "tablet"; // Type of device
  ip_address?: string; // IP address of the user
  user_agent?: string; // User agent string (browser, OS details)
  created_at: Date;
}

export enum RefreshTokenStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
  REVOKED = "revoked",
}

export interface IDevice {
  device_id: string;
  device_type: string;
  ip_address: string;
  user_agent: string;
  device_name: string;
}

export interface IAccessTokenPayload {
  user_id: string;
  device_id: string;
}

export interface IRefreshTokenPayload {
  user_id: string;
  device_id: string;
  token_id: string;
}

export enum OTPMethodEnum {
  AUTHENTICATOR_APP = "AUTHENTICATOR_APP",
  OTP_MESSAGE = "OTP_MESSAGE",
}
