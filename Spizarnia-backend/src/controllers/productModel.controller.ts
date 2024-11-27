import { Request, Response } from "express";
import { Repository } from "typeorm";
import { ProductModel } from "../models/ProductModel";
import { AppDataSource } from "../data-source"; 


const productModelRepository: Repository<ProductModel> = AppDataSource.getRepository(ProductModel);

export const ProductModelController = {
  async getAll(req: Request, res: Response) {
    try {
      const productModels = await productModelRepository.find({ relations: ["products", "ingredients"] });
      res.json(productModels);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot get all productModels" });
    }
  },

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const productModel = await productModelRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["products", "ingredients"],
      });

      if (!productModel) {
         res.status(404).json({ error: `ProductModel with id: ${id} was not found` });
         return;
      }

      res.json(productModel);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot get productModel" });
    }
  },

  async create(req: Request, res: Response) {
    const { name, quantity, unit, price } = req.body;

    try {
      const newProductModel = productModelRepository.create({
        name,
        quantity,
        unit,
        price,
      });

      await productModelRepository.save(newProductModel);
      res.status(201).json(newProductModel);
    } catch (error) {
      res.status(500).json({ error: "Internal error: ProductModel was not created" });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, quantity, unit, price } = req.body;

    try {
      const productModel = await productModelRepository.findOneBy({ id: parseInt(id) });

      if (!productModel) {
        res.status(404).json({ error: `ProductModel with id: ${id} was not found` });
        return;
      }

      productModel.name = name;
      productModel.quantity = quantity;
      productModel.unit = unit;
      productModel.price = price;

      await productModelRepository.save(productModel);
      res.json(productModel);
    } catch (error) {
      res.status(500).json({ error: "Internal error: ProductModel was not updated" });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const productModel = await productModelRepository.findOneBy({ id: parseInt(id) });

      if (!productModel) {
         res.status(404).json({ error: `ProductModel with id: ${id} was not found` });
         return;
      }

      await productModelRepository.remove(productModel);
      res.json({ message: `ProductModel with id: ${id} was removed succesfully from database` });
    } catch (error) {
      res.status(500).json({ error: "Internal error: ProductModel was not deleted" });
    }
  },
};
