import express, { Router } from "express";
import { EventRepository } from "../repositories/eventRepo";
import { EventInteractor } from "../interactors/eventInteractor";
import { EventController } from "../controllers/eventController";
import jwtAuthMiddleware from "../infrastructure/middlewares/jwtMiddleware";

const eventRouter: Router = express.Router();

const eventRepository = new EventRepository();
const eventInteractor = new EventInteractor(eventRepository);
const eventController = new EventController(eventInteractor);

eventRouter.post(
  "/",
  jwtAuthMiddleware as any,
  (eventController.onCreateEvent as any).bind(eventController)
);
eventRouter.get(
  "/:eventId",
  (eventController.OnFindEvent as any).bind(eventController)
);
eventRouter.put(
  "/:eventId",
  jwtAuthMiddleware as any,
  (eventController.OnUpdateEvent as any).bind(eventController)
);
eventRouter.delete(
  "/:eventId",
  (eventController.OnDeleteEvent as any).bind(eventController)
);
eventRouter.patch(
  "/registration-status/:eventId",
  jwtAuthMiddleware as any,
  (eventController.OnEventRegistrationStatus as any).bind(eventController)
);
export default eventRouter;
