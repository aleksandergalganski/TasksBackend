import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { matchPassword, createJWTToken, hashPassword } from '../services/auth';

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    let user = await getRepository(User).findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    user = new User();
    user.email = email;
    user.password = await hashPassword(password);
    user = getRepository(User).create(user);
    await getRepository(User).save(user);

    const token = createJWTToken(user.id);

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    let user = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await matchPassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = createJWTToken(user.id);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await getRepository(User).findOne(req.user.id);
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
