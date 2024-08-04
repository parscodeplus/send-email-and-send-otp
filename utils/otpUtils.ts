import crypto from "crypto";

// Mock database to store OTP hashes
const otpDatabase: { [email: string]: string } = {};

/**
 * This function generates a secure six-digit OTP (one-time password) using
 * crypto.randomBytes. First 4 bytes from the buffer as an unsigned 32-bit big-endian integer
 * and then takes the modulo 1000000 (i.e., 10^6) to ensure that the OTP is a 6-digit number.
 * @returns A 6-digit secure OTP (One-Time Password) as a number.
 */
export const generateSecureOTP = (): number => {
  const buffer = crypto.randomBytes(4);
  const OTP = buffer.readUInt32BE(0) % 1000000;
  return Number(OTP.toString().padStart(6, "0"));
};

/**
 * This function takes in an OTP (one-time password) as a number, hashes it using SHA-256 algorithm,
 * and returns the hashed value as a hexadecimal string.
 * @param {number} otp - The `otp` parameter is a number that represents a one-time password.
 * @returns The function `hashOTP` returns a string which is the hexadecimal representation of the
 * SHA-256 hash of the input `otp` number.
 */
export const hashOTP = (otp: number): string => {
  const hash = crypto.createHash("sha256");
  hash.update(otp.toString());
  return hash.digest("hex");
};

/**
 * Mock function to simulate reading the hashed OTP from a database.
 * @param {string} email - The email address to look up in the database.
 * @returns A Promise that resolves to the stored OTP hash for the given email.
 */
const readOTPHash = async (email: string): Promise<string> => {
  return otpDatabase[email];
};

/**
 * Mock function to simulate storing the hashed OTP in a database.
 * @param {string} email - The email address associated with the OTP.
 * @param {string} hash - The hashed OTP to store.
 */
export const storeOTPHash = async (email: string, hash: string): Promise<void> => {
  otpDatabase[email] = hash;
};

/**
 * The function verifies if the hashed OTP matches the hashed OTP stored in the database for a given
 * email.
 * @param {string} email - A string representing the email address of the user who is trying to verify
 * their OTP (One-Time Password).
 * @param {number} otp - The `otp` parameter is a number representing the One-Time Password that needs
 * to be verified.
 * @returns The function `verifyOTP` is returning a Promise that resolves to a boolean value. The
 * boolean value indicates whether the hashed OTP (one-time password) matches the hash stored for the
 * given email address.
 */
export const verifyOTP = async (email: string, otp: number): Promise<boolean> => {
  const hash = await readOTPHash(email);
  const hashedOTP = hashOTP(otp);
  return hashedOTP === hash;
};

// // Example usage:
// (async () => {
//   const email = "user@example.com";
//   const otp = generateSecureOTP();
//   const hashedOTP = hashOTP(otp);

//   await storeOTPHash(email, hashedOTP);

//   const isVerified = await verifyOTP(email, otp);
//   console.log(`OTP verified: ${isVerified}`);
// })();
