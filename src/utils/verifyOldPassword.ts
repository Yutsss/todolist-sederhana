import bcrypt from 'bcrypt';

export const verifyOldPassword = async (oldPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(oldPassword, hashedPassword);
};