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
  status: "active" | "blocked" | "deleted";
  last_login?: Date;
  secret?: string;
  created_at: Date;
  updated_at: Date;
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
