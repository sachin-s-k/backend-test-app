import { Request, Response } from "express";
import { IRegisterInteractor } from "../interfaces/IRegisterInteractor";
import { EmailService } from "../infrastructure/utils/nodeMailer";
import { validationResult } from "express-validator";

export class RegisterController {
  private registerInteractor: IRegisterInteractor;
  private emailService: EmailService;

  constructor(registerInteractor: IRegisterInteractor) {
    this.registerInteractor = registerInteractor;
    this.emailService = new EmailService();
  }

  async OnRegister(req: Request, res: Response) {
    const eventId = req.params.eventId;
    console.log(eventId, "even");

    const { teamCode, participantType, members, teamImage } = req.body;

    const hasUniqueEmailsAndMobiles = (members: any) => {
      const emailSet = new Set();
      const mobileSet = new Set();

      for (const member of members) {
        if (emailSet.has(member.email)) {
          return {
            valid: false,
            message: "Each participant must have a unique email address.",
          };
        }
        if (mobileSet.has(member.mobile)) {
          return {
            valid: false,
            message: "Each participant must have a unique mobile number.",
          };
        }

        emailSet.add(member.email);
        mobileSet.add(member.mobile);
      }

      return { valid: true, message: "" }; // All emails and mobile numbers are unique
    };
    const { valid, message } = hasUniqueEmailsAndMobiles(members);
    if (!valid) {
      return res.status(400).json({ message }); // Send specific validation error message
    }

    // const data: any = [memberOne, memberTwo, memberThree];
    // console.log(data);
    // console.log(data.length, "====>", participantType);
    const transformMembers = (members: any) => {
      return members.map((member: any) => {
        return {
          email: member.email,
          firstName: member.firstName,
          lastName: member.lastName,
          mobileNumber: member.mobile,
          institute:
            member.institute === "other"
              ? member.customInstitute
              : member.institute, // Use customInstitute if institute is "other"
        };
      });
    };

    // Get the transformed members
    const updatedMembers = transformMembers(members);

    try {
      let registeredData: any;
      if (updatedMembers.length > 1) {
        console.log("teamm=======>");

        registeredData = await this.registerInteractor.registerParticipant(
          teamCode,
          eventId,
          "team",
          updatedMembers,
          teamImage
        );
      } else {
        registeredData = await this.registerInteractor.registerParticipant(
          teamCode,
          eventId,
          "solo",
          updatedMembers,
          teamImage
        );
      }

      console.log(registeredData, "returnnn");
      const loginLink = "http://localhost:3000/signin/";
      // Send notification email to all team members
      await this.emailService.sendEventNotification(
        registeredData.teamMembers,
        registeredData.eventDataEntry.title,
        loginLink
      );
      return res.status(200).json({
        success: true,
        message: "Event registered successfully",
        data: registeredData.teamMembers,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async OnVerifyMobileNumber(req: Request, res: Response) {
    console.log("enetrddd");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number provided.",
        errors: errors.array(),
      });
    }

    try {
      const { mobileNumber, email } = req.body;
      const response = await this.registerInteractor.verifiyMobileNumber(
        mobileNumber,
        email
      );

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  async OnVerifyOtp(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP number provided.",
          errors: errors.array(),
        });
      }
      const { mobileNumber, otp } = req.body;
      const response = await this.registerInteractor.verifyOtp(
        mobileNumber,
        otp
      );
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async OnFindTeamCode(req: Request, res: Response) {
    console.log("team Code");

    try {
      const { teamCode } = req.body;
      const teamCodeData = await this.registerInteractor.checkTeamCode(
        teamCode
      );
      res.status(200).json(teamCodeData);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async OnGetInstitute(req: Request, res: Response) {
    console.log("institue data");

    const instituteData = await this.registerInteractor.getInstitute();
    return res.status(200).json(instituteData);
  }

  async OnGetVerifiedNumbers(req: Request, res: Response) {
    const verifieNumberResponse =
      await this.registerInteractor.getVerifiedNumbers();
    if (verifieNumberResponse.length) {
      return res.status(200).json({ data: verifieNumberResponse });
    } else {
      return res.status(200).json({ data: [] });
    }
  }
}
