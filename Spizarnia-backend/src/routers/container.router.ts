import { AppDataSource } from "../data-source";
import { Container } from "../entity/Container";
import { Product } from "../entity/Product";
import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const containerRepository = AppDataSource.getRepository(Container);
        const containers = await containerRepository.find({
            relations: ["products"], 
        });
        res.status(200).json(containers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch containers" });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const containerRepository = AppDataSource.getRepository(Container);
        const container = await containerRepository.findOne({
            where: { id: parseInt(id) },
            relations: ["products"],
        });

        if (!container) {
            res.status(404).json({ error: "Container not found" });
            return;
        }

        res.status(200).json(container);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the container" });
    }
});


router.post("/", async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const { name, maxQuantity } = req.body;

        const containerRepository = AppDataSource.getRepository(Container);
        const newContainer = containerRepository.create({
            name,
            maxQuantity,
        });

        await containerRepository.save(newContainer);
        res.status(201).json(newContainer);
    } catch (error) {
        res.status(500).json({ error: "Failed to create container" });
    }
});


router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, maxQuantity } = req.body;

        const containerRepository = AppDataSource.getRepository(Container);
        const container = await containerRepository.findOneBy({ id: parseInt(id) });

        if (!container) {
            res.status(404).json({ error: "Container not found" });
            return;
        }

        container.name = name ?? container.name;
        container.maxQuantity = maxQuantity ?? container.maxQuantity;

        await containerRepository.save(container);
        res.status(200).json(container);
    } catch (error) {
        res.status(500).json({ error: "Failed to update container" });
    }
});


router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const containerRepository = AppDataSource.getRepository(Container);
        const container = await containerRepository.findOneBy({ id: parseInt(id) });

        if (!container) {
            res.status(404).json({ error: "Container not found" });
            return;
        }

        await containerRepository.remove(container);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete container" });
    }
});

router.post("/:id/products", async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const { name, quantity, unit, price, expirationDate } = req.body; 

        const containerRepository = AppDataSource.getRepository(Container);
        const productRepository = AppDataSource.getRepository(Product);    

        const container = await containerRepository.findOne({
            where: { id: parseInt(id) },
            relations: ["products"], 
        });
        if (!container) {
            res.status(404).json({ error: "Container not found" });
            return;
        }
        const currentProductCount = container.products ? container.products.length : 0;
        if (currentProductCount >= container.maxQuantity) {
            res.status(400).json({ error: "Container has reached its maximum capacity" });
            return;
        }

        const newProduct = productRepository.create({
            name,
            quantity,
            unit,
            price,
            expirationDate,
            container,
        });

        await productRepository.save(newProduct);

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add product to container" });
    }
});

export default router;