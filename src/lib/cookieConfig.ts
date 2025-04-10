import { CookieOptions } from 'express';

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // HTTPS only
  sameSite: 'lax', // or 'lax' for GET cross-origin
  maxAge: 15 * 60 * 1000, // 15 minutes
  domain: process.env.COOKIE_DOMAIN, // Set your domain
  path: '/',
};