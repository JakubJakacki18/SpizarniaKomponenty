import { Router } from "express";
import { IngredientController } from "../controllers/ingredient.controller";

const router = Router();

// CRUD 
router.get("/", IngredientController.getAll); 
router.get("/:id", IngredientController.getOne);
router.post("/", IngredientController.create);
router.put("/:id", IngredientController.update);
router.delete("/:id", IngredientController.delete);

export default router;
