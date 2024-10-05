import express, { Router } from "express";
import { EventRepo } from "../repositories/eventRepo";
import { EventInteractor } from "../interactors/eventInteractor";
import { EventController } from "../controllers/eventCotroller";

const eventRouter: Router = express.Router();

const eventRepo = new EventRepo();
const eventInteractor = new EventInteractor(eventRepo);
const eventController = new EventController(eventInteractor);

eventRouter.post("/");
eventRouter.get(
  "/:eventId",
  (eventController.OnFindEvent as any).bind(eventController)
);
eventRouter.get("/");
eventRouter.put("/:eventId");
eventRouter.delete("/:eventId");
export default eventRouter;
