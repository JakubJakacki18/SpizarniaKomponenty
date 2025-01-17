import { Router } from "express";
import { ProductModelController } from "../controllers/productModel.controller";

const router = Router();

router.get("/", ProductModelController.getAll);
router.get("/:id", ProductModelController.getOne);
router.post("/", ProductModelController.create);
router.put("/:id", ProductModelController.update);  
router.delete("/:id", ProductModelController.delete); 
router.post("/checkDuplicate", ProductModelController.checkDuplicate);

export default router;