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
        relations: ["productModel", "container", "shelf"],
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot get all products" });
    }
  },

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await productRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["productModel", "container", "shelf"],
      });

      if (!product) {
        res.status(404).json({ error: `Product with id: ${id} was not found` });
        return;
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot get product" });
    }
  },

  async create(req: Request, res: Response) {
    const { expirationDate, purchaseDate, selectedProduct } = req.body;
    console.log([[selectedProduct[0].id]]);
    try {
      //const selectedProductModel = productModelRepository.findOne({where: { id: parseInt(selectedProduct.id) }})
      const newProduct = productRepository.create({
        expirationDate: new Date(expirationDate),
        purchaseDate: new Date(purchaseDate),
        //productModelId : selectedProduct.id
        //containerId: selectedProduct.cate
        productModel: selectedProduct[0],
        /* TODO: podłaczyc z pozostałymi tabelami.
        container: containerId ? { id: containerId } : null,
        shelf: shelfId ? { id: shelfId } : null,
        */
    });

      await productRepository.save(newProduct);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Product was not created" });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { expirationDate, purchaseDate, productModelId, containerId, shelfId } = req.body;

    try {
      const product = await productRepository.findOneBy({ id: parseInt(id) });

      if (!product) {
        res.status(404).json({ error: `Product with id: ${id} was not found` });
        return;
      }

      product.expirationDate = new Date(expirationDate);
      product.purchaseDate = new Date(purchaseDate);
      //TODO: podłączyć z productModel? Tak jak rozmawialiśmy na dc?
      //product.productModel = { id: productModelId }; // Assuming ProductModel relationship
      //TODO: podłaczyć po stworzeniu
      //product.container = containerId ? { id: containerId } : null;
      //product.shelf = shelfId ? { id: shelfId } : null;

      await productRepository.save(product);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Product was not updated" });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const product = await productRepository.findOneBy({ id: parseInt(id) });

      if (!product) {
        res.status(404).json({ error: `Product with id: ${id} was not found` });
        return;
      }

      await productRepository.remove(product);
      res.json({ message: `Product with id: ${id} was removed successfully from database` });
    } catch (error) {
      res.status(500).json({ error: "Internal error: Product was not deleted" });
    }
  },
};
