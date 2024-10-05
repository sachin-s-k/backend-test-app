export interface IOTP {
  mobileNumber: string;
  otp: string;
  verified: boolean;
  createdAt: Date;
  expiresAt: Date;
}
