import {Router} from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entity/Product';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const products = await productRepository.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});



export default router;