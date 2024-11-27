import { Router } from "express";
import { ProductModelController } from "../controllers/productModel.controller";

const router = Router();

// Ścieżki CRUD
router.get("/", ProductModelController.getAll); // Pobierz wszystkie ProductModels z bazy danych
router.get("/:id", ProductModelController.getOne); // Pobierz jeden ProductModel z bazy danych
router.post("/", ProductModelController.create); // Utwórz nowy ProductModel w bazie danych
router.put("/:id", ProductModelController.update); // Zaktualizuj ProductModel w bazie danych 
router.delete("/:id", ProductModelController.delete); // Usuń ProductModel z bazy danych

export default router;