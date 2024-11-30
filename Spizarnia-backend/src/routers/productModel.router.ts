import { Router } from "express";
import { ProductModelController } from "../controllers/productModel.controller";

const router = Router();

// Ścieżki CRUD
router.get("/", ProductModelController.getAll);
router.get("/:id", ProductModelController.getOne);
router.post("/", ProductModelController.create);
router.put("/:id", ProductModelController.update);  
router.delete("/:id", ProductModelController.delete); 

export default router;