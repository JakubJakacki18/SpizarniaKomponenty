
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Container } from "../models/Container";
import { AppDataSource } from "../data-source";
import { Category } from "../models/Category";

const containerRepository: Repository<Container> = AppDataSource.getRepository(Container);
const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

export const ContainerController = {
  async getAll(req: Request, res: Response) {
    try {
      console.log("test");
      const containers = await containerRepository.find({ relations: ["category"] });
      if(!containers)
      {
        res.status(404).json({ error: "Containers was not found" });
        return;
      }
      res.json(containers);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot get all containers" });
    }
  },

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const container = await containerRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["category"],
      });

      if (!container) {
        res.status(404).json({ error: `Container with id: ${id} was not found` });
        return;
      }

      res.json(container);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot get container" });
    }
  },

  async create(req: Request, res: Response) {
    const { name} = req.body;
    try{
    const newContainer = containerRepository.create();

    const newCategory = categoryRepository.create({
      categoryName: name,
      container: newContainer,
    });


    await containerRepository.save(newContainer); 
    await categoryRepository.save(newCategory); 

    res.status(201).json({ container: newContainer, category: newCategory });
  }
    catch (error) {
      res.status(500).json({ error: "Internal error: Container was not created" });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, maxQuantity, shelfId } = req.body;

    try {
      const container = await containerRepository.findOneBy({ id: parseInt(id) });

      if (!container) {
        res.status(404).json({ error: `Container with id: ${id} was not found` });
        return;
      }

      container.name = name;

      await containerRepository.save(container);
      res.json(container);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Container was not updated" });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const container = await containerRepository.findOneBy({ id: parseInt(id) });

      if (!container) {
        res.status(404).json({ error: `Container with id: ${id} was not found` });
        return;
      }

      await containerRepository.remove(container);
      res.json({ message: `Container with id: ${id} was removed successfully from database` });
    } catch (error) {
      res.status(500).json({ error: "Internal error: Container was not deleted" });
    }
  },
};
