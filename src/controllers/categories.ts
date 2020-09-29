import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';

export const getCategories = async (req: Request, res: Response): Promise<Response> => {
  let categories = await getRepository(Category).find();
  return res.status(200).json({ data: categories });
};

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.body;

  let category = await getRepository(Category).findOne({ name });

  if (category) {
    return res.status(400).json({ message: 'Category already exisits' });
  }

  category = getRepository(Category).create({ name });
  category = await getRepository(Category).save(category);
  return res.status(201).json({ data: category });
};
