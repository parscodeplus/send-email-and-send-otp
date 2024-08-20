"use client";
import { sendMailOtp } from "@/action/sendOtp";
import { Button } from "@/components/ui/button";
import { verifyOTPToken } from "@/utils/jwt";  // ???? ???? ?? ????? ????
import React, { useState } from "react";
import { up_manifest } from "@/action/up-manifest";
import { useServerAction } from "zsa-react";
import NotificationSender from "@/components/notification-sender";
import dynamic from 'next/dynamic'
import { CustomSlider } from "@/components/custom-slider";
import { ProductScrollArea } from "@/components/product-scrollArea";

const Notifications = dynamic(() => import("../components/notifications"), {
  ssr: false, // Make sure to render component client side to access window and Notification API's
})
function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOTP] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { execute , isPending} = useServerAction(up_manifest)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const [data,err]= await execute({
      name:"app next timeyad",
      scope:"/",
      short_name:"تایم",
      start_url:"/"
    })
    alert(data?.accepted)
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    console.log("Token:", token);
    console.log("OTP:", otp);

    try {
      const isValid = await verifyOTPToken(token, parseInt(otp));
      console.log("IsValid:", isValid);
      
      if (isValid) {
        setSuccess(true);
      } else {
        setOTP("");
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying OTP token:", err);
      setError("An error occurred during OTP verification. Please try again.");
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const { data, err, token, code } = await sendMailOtp("parscodeplus@gmail.com");
      if (err) {
        setError("Failed to send OTP. Please try again.");
        setIsLoading(false);
        return;
      }
      setToken((await token).toString());
      setOTP(code.toString());
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("An error occurred while sending OTP. Please try again.");
    }
    setIsLoading(false);
  };
 
  return (
    <>
    <ProductScrollArea />
    {/* <CustomSlider /> */}
    {/* <Notifications /> */}
      <Button onClick={handleSendOtp} disabled={isLoading}>
        {isLoading ? "Sending..." : "Send OTP"}
      </Button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {success && <div className="text-green-500 mt-4">OTP verified successfully!</div>}
      <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="otp" className="block mb-2 font-bold text-white">
            Enter the 6-digit OTP sent to your email address
          </label>
          <input
            type="text"
            name="otp"
            id="otp"
            value={otp}
            onChange={handleChange}
            className="w-full px-4 py-2 leading-tight border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
            maxLength={6}
            minLength={6}
            pattern="[0-9]{6}"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-[#635f07] rounded hover:bg-[#2b2902] focus:outline-none focus:shadow-outline"
          >
            Verify OTP
          </button>
        </div>
      </form>
    </>
  );
}

export default Page;
