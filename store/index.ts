import create from "zustand";
import crypto from "crypto";

// ????? ???????? ???? ????
interface OTPState {
  otpDatabase: { [email: string]: string };
  generateSecureOTP: () => number;
  hashOTP: (otp: number) => string;
  storeOTPHash: (email: string, hash: string) => void;
  readOTPHash: (email: string) => string | undefined;
  verifyOTP: (email: string, otp: number) => boolean;
}

export const useOTPStore = create<OTPState>((set, get) => ({
  otpDatabase: {},
  generateSecureOTP: () => {
    const buffer = crypto.randomBytes(4);
    const OTP = buffer.readUInt32BE(0) % 1000000;
    return Number(OTP.toString().padStart(6, "0"));
  },
  hashOTP: (otp: number) => {
    const hash = crypto.createHash("sha256");
    hash.update(otp.toString());
    return hash.digest("hex");
  },
  storeOTPHash: (email: string, hash: string) => {
    const { otpDatabase } = get();
    set({
      otpDatabase: {
        ...otpDatabase,
        [email]: hash,
      },
    });
  },
  readOTPHash: (email: string) => {
    const { otpDatabase } = get();
    return otpDatabase[email];
  },
  verifyOTP: (email: string, otp: number) => {
    const { hashOTP, readOTPHash } = get();
    const hash = readOTPHash(email);
    if (!hash) return false;
    const hashedOTP = hashOTP(otp);
    return hashedOTP === hash;
  },
}));

(async () => {
  const email = "user@example.com";
  const otp = useOTPStore.getState().generateSecureOTP();
  const hashedOTP = useOTPStore.getState().hashOTP(otp);

  useOTPStore.getState().storeOTPHash(email, hashedOTP);

  const isVerified = useOTPStore.getState().verifyOTP(email, otp);
  console.log(`OTP verified: ${isVerified}`);
})();
