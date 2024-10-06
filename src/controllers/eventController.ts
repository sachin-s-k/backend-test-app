import { Request, Response } from "express";
import { IEventInteractor } from "../interfaces/IEventInteractor";

export class EventController {
  private eventInteractor: IEventInteractor;

  constructor(eventInteractor: IEventInteractor) {
    this.eventInteractor = eventInteractor;
  }

  async OnFindEvent(req: Request, res: Response) {
    console.log("entered");

    try {
      const { eventId } = req.params;
      if (!eventId) {
        return res.status(400).json({
          success: false,
          message: "Bad Request: Event ID is required.",
        });
      }
      const response = await this.eventInteractor.getEvent(eventId);

      if (!response) {
        return res.status(404).json({
          success: false,
          message: `Event with ID ${eventId} not found.`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Event retrieved successfully.",
        data: response,
      });
    } catch (error: any) {
      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "Invalid Event ID format. Please provide a valid ID.",
        });
      }

      // General error handling for unexpected issues
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching the event.",
        details: error.message,
      });
    }
  }

  async onCreateEvent(req: any, res: Response) {
    try {
      const user = req.user;

      if (!user || !user.userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: User not authenticated.",
        });
      }
      console.log(req.body, "BBBBBBBnnnn=====>");

      const eventEntry = await this.eventInteractor.createEvent(
        user.userId,
        req.body
      );
      // Check if eventEntry is successfully created
      if (!eventEntry) {
        return res.status(400).json({
          success: false,
          message: "Event creation failed. Please try again.",
        });
      }
      // Return success response with created event details
      return res.status(201).json({
        success: true,
        message: "Event created successfully.",
        data: eventEntry,
      });
    } catch (error: any) {
      // res.status(400).json(error.message);
      console.error("Error creating event:", error);

      // Check the type of error and return appropriate response
      if (error.name === "ValidationError") {
        // Handle Mongoose validation errors
        return res.status(422).json({
          success: false,
          message: "Invalid input: Please check the entered data.",
          details: error.message,
        });
      } else if (error.name === "MongoError" && error.code === 11000) {
        // Handle duplicate key errors (e.g., unique fields)
        return res.status(409).json({
          success: false,
          message:
            "Duplicate error: An event with similar data already exists.",
          details: error.message,
        });
      } else {
        // General server error
        return res.status(500).json({
          success: false,
          message: "An unexpected error occurred. Please try again later.",
          details: error.message,
        });
      }
    }
  }

  async OnDeleteEvent(req: any, res: Response) {
    try {
      const { eventId } = req.params;
      const deleteResponse = await this.eventInteractor.removeEvent(eventId);
      if (deleteResponse) {
        res.status(200).json("The event deleted successfully");
      } else {
        // If the event was not found or couldn't be deleted, return a 404 Not Found
        return res.status(404).json({
          success: false,
          message: "Event not found or already deleted.",
        });
      }
    } catch (error: any) {
      console.error("Error deleting event:", error);

      // Handle specific errors based on the type of error
      if (error.name === "CastError") {
        // Handle invalid MongoDB ObjectID errors
        return res.status(400).json({
          success: false,
          message: "Invalid Event ID. Please provide a valid ID.",
        });
      }

      // For other errors, respond with a 500 Internal Server Error
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred while deleting the event.",
        details: error.message,
      });
    }
  }

  async OnUpdateEvent(req: any, res: Response) {
    try {
      const user = req.user;

      if (!user || !user.userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: User not authenticated.",
        });
      }
      const eventId = req.params.eventId;
      const eventData = req.body;

      // Validate eventId
      if (!eventId) {
        return res.status(400).json({
          success: false,
          message: "Bad Request: Event ID is required.",
        });
      }
      const updatedEvent = await this.eventInteractor.changeEvent(
        eventId,
        eventData
      );

      if (!updatedEvent) {
        return res.status(404).json({
          success: false,
          message: `Event not found with ID: ${eventId}`,
        });
      }

      // Send success response with updated event data
      return res.status(200).json({
        success: true,
        message: "Event updated successfully.",
        data: updatedEvent,
      });
    } catch (error: any) {
      console.error("Error updating event:", error);

      // Determine the type of error and send appropriate response
      let statusCode = 500; // Internal Server Error
      let errorMessage = "An error occurred while updating the event.";

      if (error.name === "ValidationError") {
        statusCode = 400; // Bad Request
        errorMessage = "Validation Error: Please check the input data.";
      } else if (error.name === "CastError") {
        statusCode = 400; // Bad Request
        errorMessage = "Invalid Event ID format.";
      }

      return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: error.message,
      });
    }
  }
  async OnEventRegistrationStatus(req: any, res: Response) {
    try {
      const user = req.user;

      if (!user || !user.userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: User not authenticated.",
        });
      }
      const eventId = req.params.eventId;
      const { registrationStatus } = req.body;
      console.log(registrationStatus, "stat=++++++", eventId);

      //Validate eventId
      if (!eventId) {
        return res.status(400).json({
          success: false,
          message: "Bad Request: Event ID is required.",
        });
      }
      const updatedEvent = await this.eventInteractor.registrationStatusChange(
        eventId,
        user.userId,
        registrationStatus
      );

      if (!updatedEvent) {
        return res.status(404).json({
          success: false,
          message: "Event not found. Unable to update registration status.",
        });
      }

      // Successfully updated the registration status
      return res.status(200).json({
        success: true,
        message: "Event registration status updated successfully.",
        event: updatedEvent,
      });
    } catch (error: any) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error: Unable to update registration status.",
      });
    }
  }
}
