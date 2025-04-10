export const getAccessTokenExpiry = () => {
  return process.env.ACCESS_TOKEN_EXPIRY_MINUTES
    ? Number(process.env.ACCESS_TOKEN_EXPIRY_MINUTES)
    : 15;
};

export const getRefreshTokenExpiry = () => {
  return process.env.REFRESH_TOKEN_EXPIRY_DAYS
    ? Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS)
    : 30; // Refresh token validity
};
