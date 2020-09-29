import { Request, Response } from 'express';
import { chownSync } from 'fs';
import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';
import { Task } from '../entity/Task';
import { User } from '../entity/User';

export const getTasks = async (req: Request, res: Response): Promise<Response> => {
  try {
    let tasks: Task[];
    const userId = req.user.id;

    if (req.query.category) {
      const categoryId = +req.query.category;

      tasks = await getRepository(Task)
        .createQueryBuilder('task')
        .leftJoin('task.user', 'user')
        .leftJoin('task.category', 'category')
        .where('user.id = :userId', { userId })
        .andWhere('category.id = :categoryId', { categoryId })
        .getMany();
    } else {
      tasks = await getRepository(Task)
        .createQueryBuilder('task')
        .leftJoin('task.user', 'user')
        .leftJoinAndSelect('task.category', 'category')
        .where('task.user.id = :userId', { userId })
        .orderBy('task.createdAt', 'DESC')
        .getMany();
    }

    return res.status(200).json({ data: tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTask = async (req: Request, res: Response): Promise<Response> => {
  const task = await getRepository(Task).findOne(req.params.id);

  if (task.user.id !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized to get this task' });
  }

  return res.status(200).json({ data: task });
};

export const createTask = async (req: Request, res: Response): Promise<Response> => {
  const category = await getRepository(Category).findOne(req.body.categoryId);

  if (!category) {
    return res
      .status(404)
      .json({ message: `Not found category with the id of ${req.body.categoryId}` });
  }

  req.body.category = category;

  const user = await getRepository(User).findOne(req.user.id);
  req.body.user = user;

  let task = getRepository(Task).create(req.body);
  task = await getRepository(Task).save(task);
  return res.status(201).json({ data: task });
};

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
  let task = await getRepository(Task).findOne(req.params.id, { relations: ['user'] });

  if (!task) {
    return res
      .status(404)
      .json({ message: `Not found Task with the id of ${req.params.id}` });
  }
  if (task.user.id !== req.user.id) {
    return res.status(404).json({ message: 'Not authorized' });
  }

  getRepository(Task).merge(task, req.body);
  task = await getRepository(Task).save(task);
  return res.status(201).json({ data: task });
};

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  const task = await getRepository(Task).findOne(req.params.id, { relations: ['user'] });

  if (!task) {
    return res
      .status(404)
      .json({ message: `Not found Task with the id of ${req.params.id}` });
  }

  if (task.user.id !== req.user.id) {
    return res.status(404).json({ message: 'Not authorized' });
  }

  await getRepository(Task).delete(req.params.id);
  return res.status(200).json({ data: {} });
};
