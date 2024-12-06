import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Category } from '../models/Category';
import { Container } from '../models/Container';
import { Repository } from 'typeorm';

const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
const containerRepository: Repository<Container> = AppDataSource.getRepository(Container);

export const CategoryController = {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await categoryRepository.find({ relations: ["productModels"] });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Internal error: Cannot get all categories' });
    }
  },

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const category = await categoryRepository.findOne({ where: { id: parseInt(id) } });
      if (!category) {
        res.status(404).json({ error: `Category with id: ${id} was not found` });
        return;
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Internal error: Cannot get category' });
    }
  },

  async create(req: Request, res: Response) {
    const { categoryName } = req.body;
    try {
        const newContainer = containerRepository.create();
        const newCategory = categoryRepository.create({
          categoryName: categoryName,
          container: newContainer,
        });
        await categoryRepository.save(newCategory); 
        res.status(201).json({ category: newCategory });
    } catch (error) {
      res.status(500).json({ error: 'Internal error: Category was not created' });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { categoryName } = req.body;
    try {
      const category = await categoryRepository.findOne({ where: { id: parseInt(id) } });
      if (!category) {
        res.status(404).json({ error: `Category with id: ${id} was not found` });
        return;
      }
      category.categoryName = categoryName;
      await categoryRepository.save(category);
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Internal error: Category was not updated' });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const category = await categoryRepository.findOne({ where: { id: parseInt(id) } });
      if (!category) {
        res.status(404).json({ error: `Category with id: ${id} was not found` });
        return;
      }
      await categoryRepository.remove(category);
      res.json({ message: `Category with id: ${id} was removed successfully` });
    } catch (error) {
      res.status(500).json({ error: 'Internal error: Category was not deleted' });
    }
  },
};
