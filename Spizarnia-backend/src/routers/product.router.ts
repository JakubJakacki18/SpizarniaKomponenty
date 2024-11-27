import {Router, Request, Response} from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entity/Product';

const router : Router = Router();

router.get('/', async (req : Request, res : Response) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const products = await productRepository.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get("/:id", async (req : Request, res : Response) => {
    try {
        const { id } = req.params;
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }else{
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the product" });
    }
});

router.delete('/:id',async (req : Request, res : Response)=>
    {
        try
        {
            const { id } = req.params;
            const productRepository = AppDataSource.getRepository(Product); 
            const productToDelete = await productRepository.findOneBy({ id: parseInt(id) });
            if (!productToDelete) {
                res.status(404).json({ error: "Product not found" });
            } else
            {
                await productRepository.remove(productToDelete);
                res.status(204).send();
            }
        }catch(error)
        {
            res.status(500).json({error: "Failed to delete product"})
        };
    });


router.post("/", async (req: Request, res: Response) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const newProduct = productRepository.create(req.body);
        const savedProduct = await productRepository.save(newProduct); 

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: "Failed to create product" });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productRepository = AppDataSource.getRepository(Product);
        const existingProduct = await productRepository.findOneBy({ id: parseInt(id) });

        if (!existingProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        productRepository.merge(existingProduct, req.body);
        const updatedProduct = await productRepository.save(existingProduct);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: "Failed to update product" });
    }
});


export default router;