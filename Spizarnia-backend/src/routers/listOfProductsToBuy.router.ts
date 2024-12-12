import { Router } from "express";
import { ListOfProductsToBuyController } from "../controllers/listOfProductsToBuy.controller";

const router = Router();

// CRUD 
router.get("/", ListOfProductsToBuyController.getAll); 
router.post("/", ListOfProductsToBuyController.create);
router.put("/:id", ListOfProductsToBuyController.update);
router.delete("/:id", ListOfProductsToBuyController.delete);

export default router;
