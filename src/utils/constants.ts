export const TOKEN_COOKIE = 'TOKEN_COOKIE_ETYALAB';

export const API = process.env.NEXT_PUBLIC_API_ETYALAB|| 'localhost:3000';
export const PUBLIC_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PUBLIC_URL
    : 'http://localhost:3000';
