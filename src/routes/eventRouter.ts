import express, { Router } from "express";

const eventRouter: Router = express.Router();

eventRouter.get("/");
eventRouter.post("/");
eventRouter.get("/:eventId");
eventRouter.put("/:eventId");
eventRouter.delete("/:eventId");
export default eventRouter;
