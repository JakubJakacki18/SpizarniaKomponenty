
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Container } from "../models/Container";
import { AppDataSource } from "../data-source";

const containerRepository: Repository<Container> = AppDataSource.getRepository(Container);

export const ContainerController = {
  async getAll(req: Request, res: Response) {
    try {
      const containers = await containerRepository.find({ relations: ["shelf"] });
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
        relations: ["shelf"],
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
    const { name, maxQuantity, shelfId } = req.body;

    try {
      const newContainer = containerRepository.create({
        name,
        maxQuantity,
        shelf: shelfId ? { id: shelfId } : null,
      });

      await containerRepository.save(newContainer);
      res.status(201).json(newContainer);
    } catch (error) {
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
      container.maxQuantity = maxQuantity;
      //TODO: SHELF id 
      //container.shelf = shelfId ? { id: shelfId } : null;

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
