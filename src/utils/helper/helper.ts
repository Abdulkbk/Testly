import { genSalt, hash, compare } from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashpassword: string,
) => {
  return await compare(password, hashpassword);
};
