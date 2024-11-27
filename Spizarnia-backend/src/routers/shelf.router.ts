import { Router } from "express";
import { ShelfController } from "../controllers/shelf.controller";

const router = Router();

router.get("/", ShelfController.getAll);
router.get("/:id", ShelfController.getOne);
router.post("/", ShelfController.create);
router.put("/:id", ShelfController.update);
router.delete("/:id", ShelfController.delete);

export default router;
