import { Request, Response } from "express";
import { IEventInteractor } from "../interfaces/IEventInteractor";

export class EventController {
  private eventInteractor: IEventInteractor;

  constructor(eventInteractor: IEventInteractor) {
    this.eventInteractor = eventInteractor;
  }

  async OnFindEvent(req: Request, res: Response) {
    console.log("entered");

    const { eventId } = req.params;
    const response = await this.eventInteractor.getEvent(eventId);
    return res.status(200).json(response);
  }
  async onCreateEvent(req: any, res: Response) {
    const { user } = req.user;
    const eventEntry = await this.eventInteractor.createEvent(req.body);
  }

  async OnDeleteEvent(req: any, res: Response) {
    try {
      const { eventId } = req.params;
      const deleteResponse = await this.eventInteractor.removeEvent(eventId);
      if (deleteResponse) {
        res.status(200).json("The event deleted successfully");
      }
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
}
