import { Router } from "express";
import { 
    getAllTodosCtrl,
    posTodosCtrl,
    deleteTodosctrl,
    updateTodosCtrl
} from "../controllers/todos.controllers.js";
import  validarJwt from "../middlewares/validar-jwt.js";
const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);

todosRouter.post("/", validarJwt, posTodosCtrl);

todosRouter.delete("/:id", validarJwt, deleteTodosctrl);

todosRouter.put("/:id", validarJwt, updateTodosCtrl);

export { todosRouter };
