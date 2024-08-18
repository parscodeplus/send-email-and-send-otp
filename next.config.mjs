import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("@ducanh2912/next-pwa")).default({
      dest: "public",
      // disable: process.env.NODE_ENV === "development",
      // register: true,
      cacheOnFrontEndNav: true,
      aggressiveFrontEndNavCaching: true,
      reloadOnOnline: true,
      swcMinify: true,
      disable: process.env.NODE_ENV === "development",
      workboxOptions: {
        disableDevLogs: true,
      },
      // sw: "service-worker.js",
      // customWorkerDest: "service-worker",
      // cacheStartUrl: true,
      // reloadOnOnline: true,
      // cacheOnFrontEndNav: true,
      // aggressiveFrontEndNavCaching: true,
      fallbacks: {
        // Failed page requests fallback to this.
        document: "/~offline",
        // This is for /_next/.../.json files.
        //data: "/fallback.json",
        // This is for images.
        //image: "/fallback.webp",
        // This is for audio files.
        //audio: "/fallback.mp3",
        // This is for video files.
        //video: "/fallback.mp4",
        // This is for fonts.
        //font: "/fallback-font.woff2",
      },
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};

export default nextConfigFunction;
