"use server";
import jwt from 'jsonwebtoken';
const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

if (!secret) {
  throw new Error("JWT Secret key is not defined");
}

export const generateOTPToken = async (email: string, otp: number): Promise<string> => {
  const payload = { email, otp };
  return jwt.sign(payload, secret, { expiresIn: '1m' });
};

export const verifyOTPToken = async (token: string, otp: number): Promise<boolean> => {
  try {
    const decoded = jwt.verify(token, secret) as { email: string; otp: number };
    return decoded.otp === otp;
  } catch (err) {
    console.error("Error verifying OTP token:", err);
    return false;
  }
};
