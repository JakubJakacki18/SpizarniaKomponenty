import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Product } from "../models/Product";
import { AppDataSource } from "../data-source";
import { ProductModel } from "../models/ProductModel";

const productRepository: Repository<Product> = AppDataSource.getRepository(Product);
const productModelRepository: Repository<ProductModel> = AppDataSource.getRepository(ProductModel);

export const ProductController = {
  async getAll(req: Request, res: Response) {
    try {
      const products = await productRepository.find({
        relations: ["productModel", "container"],
      });

      //podpinanie nazwy i ilosci z productmodel
      const result = products.map((product) =>({

        id: product.id,
        expirationDate: product.expirationDate,
        purchaseDate: product.purchaseDate,
        name: product.productModel.name,
        quantity: product.productModel.quantity,
        unit: product.productModel.unit
      }))

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot get all products" });
    }
  },

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await productRepository.findOne({
        where: { id: parseInt(id) },
        relations: ['productModel', 'container'],
      });

      if (!product) {
        res.status(404).json({ error: `Product with id: ${id} was not found` });
        return
      }

            //podpinanie nazwy i ilosci z productmodel
      const result = {

        id: product.id,
        expirationDate: product.expirationDate,
        purchaseDate: product.purchaseDate,
        name: product.productModel.name,
        quantity: product.productModel.quantity,
        unit: product.productModel.unit
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal error: Cannot get product' });
    }
  },

  async create(req: Request, res: Response) {
    const { expirationDate, purchaseDate, selectedProduct } = req.body;

    if (!expirationDate || !purchaseDate || !selectedProduct || selectedProduct.length === 0) {
      res.status(400).json({ error: "Missing required fields" });
      return
    }

    try {
      const newProduct = productRepository.create({
        expirationDate: new Date(expirationDate),
        purchaseDate: new Date(purchaseDate),
        productModel: selectedProduct[0],
      });

      await productRepository.save(newProduct);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Product was not created" });
    }
  },
  
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { expirationDate, purchaseDate, productModelId, containerId } = req.body;

    try {
      const product = await productRepository.findOneBy({ id: parseInt(id) });

      if (!product) {
        res.status(404).json({ error: `Product with id: ${id} was not found` });
        return
      }

      product.expirationDate = new Date(expirationDate);
      product.purchaseDate = new Date(purchaseDate);

      await productRepository.save(product);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Product was not updated" });
    }
  },

  //?

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const product = await productRepository.findOneBy({ id: parseInt(id) });

      if (!product) {
        res.status(404).json({ error: `Product with id: ${id} was not found` });
        return
      }

      await productRepository.remove(product);
      res.json({ message: `Product with id: ${id} was removed successfully from database` });
    } catch (error) {
      res.status(500).json({ error: "Internal error: Product was not deleted" });
    }
  },
};
