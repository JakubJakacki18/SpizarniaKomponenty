import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Shelf } from "../models/Shelf"; // Adjust the path if needed
import { AppDataSource } from "../data-source";

const shelfRepository: Repository<Shelf> = AppDataSource.getRepository(Shelf);

export const ShelfController = {
  async getAll(req: Request, res: Response) {
    try {
      const shelves = await shelfRepository.find({
        relations: ["containers", "products"], // Fetch related containers and products
      });
      res.json(shelves);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot get all shelves" });
    }
  },

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const shelf = await shelfRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["containers", "products"], // Fetch related containers and products
      });

      if (!shelf) {
        res.status(404).json({ error: `Shelf with id: ${id} was not found` });
        return;
      }

      res.json(shelf);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot get shelf" });
    }
  },

  async create(req: Request, res: Response) {
    const { containers, products } = req.body;

    try {
      const newShelf = shelfRepository.create({
        containers, // Assuming this is an array of container IDs or objects
        products,   // Assuming this is an array of product IDs or objects
      });

      await shelfRepository.save(newShelf);
      res.status(201).json(newShelf);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Shelf was not created" });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { containers, products } = req.body;

    try {
      const shelf = await shelfRepository.findOneBy({ id: parseInt(id) });

      if (!shelf) {
        res.status(404).json({ error: `Shelf with id: ${id} was not found` });
        return;
      }

      shelf.containers = containers;
      shelf.products = products;

      await shelfRepository.save(shelf);
      res.json(shelf);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Shelf was not updated" });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const shelf = await shelfRepository.findOneBy({ id: parseInt(id) });

      if (!shelf) {
        res.status(404).json({ error: `Shelf with id: ${id} was not found` });
        return;
      }

      await shelfRepository.remove(shelf);
      res.json({ message: `Shelf with id: ${id} was removed successfully from database` });
    } catch (error) {
      res.status(500).json({ error: "Internal error: Shelf was not deleted" });
    }
  },
};
