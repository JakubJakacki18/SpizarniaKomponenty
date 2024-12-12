import { Repository } from "typeorm/repository/Repository";
import { ListOfProductsToBuy } from "../models/ListOfProductsToBuy";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";



const listOfProductsToBuyRepository: Repository<ListOfProductsToBuy> = AppDataSource.getRepository(ListOfProductsToBuy);

export const ListOfProductsToBuyController = {
    async getAll(req: Request, res: Response) {
        try {
        const products = await listOfProductsToBuyRepository.find({
            relations: ["products"],
        });
        res.json(products);
        } catch (error) {
            res.status(500).json({ error: "Internal error: Cannot get all cart entries" });
        }
    },
    async create(req: Request, res: Response) {
        const { product, quantity } = req.body;
        if (!product) {
            res.status(400).json({ error: "Missing required fields" });
            return
          }
      
          try {
            const newCartElement = listOfProductsToBuyRepository.create({
              products: product,
              quantity: quantity ?? 1,
            });
      
            await listOfProductsToBuyRepository.save(newCartElement);
            res.status(201).json(newCartElement);
          } catch (error) {
            res.status(500).json({ error: "Internal error: Cart entry was not created" });
          }

        },




        async update(req: Request, res: Response) {
            const { id } = req.params;
            const { quantity } = req.body;
            if (!quantity) {
              res.status(400).json({ error: "Missing required fields" });
              return
            }
          
            try {
              const entry = await listOfProductsToBuyRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['products'],
              });
          
              if (!entry) {
                res.status(404).json({ error: `Cart entry with id: ${id} was not found` });
                return;
              }
                entry.quantity = quantity;
              await listOfProductsToBuyRepository.save(entry);
          
              res.json(entry);
            } catch (error) {
              console.error('Error updating cart entry:', error);
              res.status(500).json({ error: "Internal error: Cart entry was not updated" });
            }
          },

          async delete(req: Request, res: Response) {
            const { id } = req.params;
        
            try {
              const entry = await listOfProductsToBuyRepository.findOneBy({ id: parseInt(id) });
        
              if (!entry) {
                res.status(404).json({ error: `Entry with id: ${id} was not found` });
                return
              }
        
              await listOfProductsToBuyRepository.remove(entry);
              res.json({ message: `Entry with id: ${id} was removed successfully from database` });
            } catch (error) {
              res.status(500).json({ error: "Internal error: Entry was not deleted" });
            }
          },
}