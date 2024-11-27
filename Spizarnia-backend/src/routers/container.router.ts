import { Router } from "express";
import { ContainerController } from "../controllers/container.controller";

const router = Router();
//CRUD
router.get("/", ContainerController.getAll);
router.get("/:id", ContainerController.getOne);
router.post("/", ContainerController.create);
router.put("/:id", ContainerController.update);
router.delete("/:id", ContainerController.delete);

export default router;
