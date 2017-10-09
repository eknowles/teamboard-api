export const PASSWORD_LENGTH = 64;
export const SALT_LENGTH = 64;
export const ITERATIONS = 10000;
export const DIGEST = 'sha256';
export const BYTE_TO_STRING_ENCODING = 'hex';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
