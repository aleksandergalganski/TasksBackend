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

    if (req.query.type) {
      const type = req.query.type;

      tasks = await getRepository(Task)
        .createQueryBuilder('task')
        .leftJoin('task.user', 'user')
        .where('user.id = :userId', { userId })
        .andWhere('task.type = :type', { type })
        .getMany();
    } else {
      tasks = await getRepository(Task)
        .createQueryBuilder('task')
        .leftJoin('task.user', 'user')
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
  try {
    const task = await getRepository(Task).findOne(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({ message: `Not found Task with the id of ${req.params.id}` });
    }

    if (task.user.id !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to get this task' });
    }

    return res.status(200).json({ data: task });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const category = await getRepository(Category).findOne(req.body.categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ message: `Not found category with the id of ${req.body.categoryId}` });
    }

    req.body.category = category;

    const user = await getRepository(User).findOne(req.user.id);
    req.body.user = user;

    let task: any = getRepository(Task).create(req.body);
    task = await getRepository(Task).save(task);

    return res.status(201).json({
      data: {
        name: task.name,
        id: task.id,
        createdAt: task.createdAt,
        isActive: task.isActive,
        type: task.type
      }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
  try {
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
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const task = await getRepository(Task).findOne(req.params.id, {
      relations: ['user']
    });

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
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
