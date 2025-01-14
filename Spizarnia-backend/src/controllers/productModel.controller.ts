import { Request, Response } from "express";
import { Repository } from "typeorm";
import { ProductModel } from "../models/ProductModel";
import { AppDataSource } from "../data-source"; 
import { Category } from "../models/Category";
import { Like } from "typeorm";
import { Product } from "../models/Product";


const productModelRepository: Repository<ProductModel> = AppDataSource.getRepository(ProductModel);

export const ProductModelController = {
  async getAll(req: Request, res: Response) {

    const {name} = req.query;

    try {
      let productModels;
      if (name) {
        productModels = await productModelRepository.find({
          where: {
            name: Like(`%${name}%`),
          },
          relations: ["products", "ingredients", "category"],
        });
      } else {
        productModels = await productModelRepository.find({
          relations: ["products", "ingredients", "category"],
        });
      }

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
    const { name, quantity, unit, price, categoryId, type } = req.body;

    try {
      const category = await AppDataSource.getRepository(Category).findOne({ where: { id: categoryId } });
      const newProductModel = productModelRepository.create({
        name,
        quantity,
        unit,
        price,
        category,
        type
      });

      await productModelRepository.save(newProductModel);
      res.status(201).json(newProductModel);
    } catch (error) {
      res.status(500).json({ error: "Internal error: ProductModel was not created" });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { price, categoryName, type } = req.body;

    try {
      const productModel = await productModelRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["category"],
      });

      if (!productModel) {
        res.status(404).json({ error: `ProductModel with id: ${id} was not found` });
        return;
      }

      if (categoryName) {
        const category = await AppDataSource.getRepository(Category).findOne({
        where: { categoryName: categoryName } });
        if (category !== null) {
          productModel.category = category;
        } else {
          res.status(400).json({ error: `Category with id: ${categoryName} was not found` });
          return;
        }
      }

      if (price !== null) {
        productModel.price = price;
      }

      if (type !== null) {
        productModel.type = type;
      }

      await productModelRepository.save(productModel);
      res.json(productModel);
    } catch (error) {
      res.status(500).json({ error: "Internal error: ProductModel was not updated" });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    //Usuwanie - zostawiłem troche wieksze logi, byly potrzebne do kaskadowego.
    try {
      const productModel = await productModelRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["products", "ingredients"],
      });
  
      if (!productModel) {
        console.log(`Product model with id ${id} not found`);
        res.status(404).json({ error: `ProductModel with id: ${id} was not found` });
        return;
      }
  
      try {
        await productModelRepository.remove(productModel);
        console.log(`Successfully deleted product model ${id}`);
      } catch (deleteError) {
        console.error('Specific delete error:', deleteError);
        throw deleteError;
      }
  
      res.json({ message: `ProductModel with id: ${id} was removed successfully` });
    } catch (error) {
      console.error('Full error details:', error);
      
      res.status(500).json({ 
        error: "Internal error: ProductModel was not deleted",
        details: error.message,
        code: error.code
      });
    }
  },
  async checkDuplicate(req: Request, res: Response) {
    const { name, quantity, unit, price, categoryId, type } = req.body;
  
    try {
      const existingProduct = await productModelRepository.findOne({
        where: {
          name,
          quantity,
          unit,
          price,
          category: { id: categoryId },
          type
        },
        relations: ["category"]
      });
  
      // If product exists, return true (it's a duplicate)
      res.json(existingProduct !== null);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot check for duplicate product" });
    }
  }
};
