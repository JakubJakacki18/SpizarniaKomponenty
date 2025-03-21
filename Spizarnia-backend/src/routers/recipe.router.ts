import { Router } from "express";
import { RecipeController } from "../controllers/recipe.controller";

const router = Router();

router.get("/", RecipeController.getAll);
router.get("/:id", RecipeController.getOne);
router.post("/", RecipeController.create);
router.put("/:id", RecipeController.update);
router.delete("/:id", RecipeController.delete);

export default router;
