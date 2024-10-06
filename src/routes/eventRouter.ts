import express, { Router } from "express";
import { EventRepository } from "../repositories/eventRepo";
import { EventInteractor } from "../interactors/eventInteractor";
import { EventController } from "../controllers/eventController";

const eventRouter: Router = express.Router();

const eventRepository = new EventRepository();
const eventInteractor = new EventInteractor(eventRepository);
const eventController = new EventController(eventInteractor);

eventRouter.post(
  "/",
  (eventController.onCreateEvent as any).bind(eventController)
);
eventRouter.get(
  "/:eventId",
  (eventController.OnFindEvent as any).bind(eventController)
);
eventRouter.put("/:eventId");
eventRouter.delete(
  "/:eventId",
  (eventController.OnDeleteEvent as any).bind(eventController)
);
export default eventRouter;
