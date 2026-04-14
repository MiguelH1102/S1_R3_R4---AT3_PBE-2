import { Router } from "express";
import categoriController from "../controllers/categoriaController.js";

const categoriaRoutes = Router();

categoriaRoutes.post('/', categoriController.criar);
categoriaRoutes.put('/:id', categoriController.editar);
categoriaRoutes.delete('/:id', categoriController.deletar);
categoriaRoutes.get('/', categoriController.selecionar);



export default categoriaRoutes