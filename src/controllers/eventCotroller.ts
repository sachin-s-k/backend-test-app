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
}
