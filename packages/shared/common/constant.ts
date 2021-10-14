export const IS_CLIENT = typeof window !== 'undefined';
export const ENV_NAME = process.env.ENV_NAME!;
export const IS_REAL = ENV_NAME === 'real';
export const WEB_HOST = process.env.WEB_HOST!;
export const API_HOST = process.env.API_HOST!;
export const IS_DEBUG = 'IS_DEBUG';
