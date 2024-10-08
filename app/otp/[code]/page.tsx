"use client";
import { verifyOTP } from "@/utils/otpUtils";
import { useState } from "react";

type Props = {
  mail: string;
  verified: boolean | null;
  setVerified: React.Dispatch<React.SetStateAction<boolean | null>>;
};

 const  Page = ({ params }: { params: { code: string }}) => {
  const [otp, setOTP] = useState<string>(params.code);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can add your API call to verify the OTP and complete the signup process
  }
  return (
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
  );
};

export default Page;
