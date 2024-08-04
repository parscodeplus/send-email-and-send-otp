"use server";
// import { generateSecureOTP, hashOTP, storeOTPHash } from "@/utils/otpUtils";
import { renderVerifyOTP } from "@/utils/renderVerifyOTP";
import { mail_sender } from "@/action";
import {  generateOTPToken } from '@/utils/jwt';
import { generateSecureOTP } from "@/utils/otpUtils";
export const sendMailOtp = async (to: string) => {

    const code = generateSecureOTP(); // generating 6 digits OTP using crypto.randomBytes(4)
    const emailHtml = renderVerifyOTP(Number(code)); // rendering React-email component to HTML
   
    // sending mail
    const [ data, err ] = await mail_sender ({
      from: process.env.MAIL_FROM,
      to: to,
      subject: `کد تایید شما از [تایم یاد ]`,
      message: emailHtml,
      nameSender:"Timeyad",
      nameto:""
    
    });
    const token =await generateOTPToken(to, code);
    return { data, err,token,code };
  };