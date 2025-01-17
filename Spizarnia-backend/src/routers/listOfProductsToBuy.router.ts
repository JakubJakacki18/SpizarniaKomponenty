import { Router } from "express";
import { ListOfProductsToBuyController } from "../controllers/listOfProductsToBuy.controller";

const router = Router();

// CRUD 
router.get("/", ListOfProductsToBuyController.getAll);
router.get("/:id", ListOfProductsToBuyController.getOne); 
router.post("/", ListOfProductsToBuyController.create);
router.patch("/:id", ListOfProductsToBuyController.updateQuantityById);
router.delete("/:id", ListOfProductsToBuyController.delete);
router.delete('/deleteAll', ListOfProductsToBuyController.deleteAll);

export default router;
