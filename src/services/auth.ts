import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createJWTToken = (userId: number): string => {
  const payload = {
    user: {
      id: userId
    }
  };

  return jwt.sign(payload, <string>process.env.JWT_SECRET, {
    expiresIn: 360000
  });
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const matchPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => await bcrypt.compare(password, hashedPassword);
