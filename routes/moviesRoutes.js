import { Router } from "express";
import { MovieCrontroller } from "../controllers/movieController.js";
export const moviesRouter = Router();

moviesRouter.get("/", MovieCrontroller.getAll);
moviesRouter.get("/:id", MovieCrontroller.getId);
moviesRouter.post("/", MovieCrontroller.post);
moviesRouter.delete("/:id", MovieCrontroller.delete);
moviesRouter.patch("/:id", MovieCrontroller.update);
