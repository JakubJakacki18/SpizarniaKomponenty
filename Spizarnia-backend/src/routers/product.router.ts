import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();
//CRUD
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getOne);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);
export default router;
