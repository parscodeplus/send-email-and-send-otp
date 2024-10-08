// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] });

import type { Metadata, Viewport } from "next";

// const APP_NAME = "PWA App";
// const APP_DEFAULT_TITLE = "My Awesome PWA App";
// const APP_TITLE_TEMPLATE = "%s - PWA App";
// const APP_DESCRIPTION = "Best PWA app in the world!";

// export const metadata: Metadata = {
//   applicationName: APP_NAME,
//   title: {
//     default: APP_DEFAULT_TITLE,
//     template: APP_TITLE_TEMPLATE,
//   },
//   description: APP_DESCRIPTION,
//   manifest: "/manifest.json",
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "default",
//     title: APP_DEFAULT_TITLE,
//     // startUpImage: [],
//   },
//   formatDetection: {
//     telephone: false,
//   },
//   openGraph: {
//     type: "website",
//     siteName: APP_NAME,
//     title: {
//       default: APP_DEFAULT_TITLE,
//       template: APP_TITLE_TEMPLATE,
//     },
//     description: APP_DESCRIPTION,
//   },
//   twitter: {
//     card: "summary",
//     title: {
//       default: APP_DEFAULT_TITLE,
//       template: APP_TITLE_TEMPLATE,
//     },
//     description: APP_DESCRIPTION,
//   },
// };

// export const viewport: Viewport = {
//   themeColor: "#FFFFFF",
// };
export const metadata: Metadata = {
  title: "Create Next App",
  manifest: "/manifest.json", // we are accessing our manifest file here
  description: "Generated by create next app",
};

import RegisterPWA from "./register-pwa";
import InstallPWAButton from "@/components/install-PWA-button";
// Whether we are running as an installed PWA or not.
// const isInstalledPWA = window.matchMedia('(display-mode: window-controls-overlay)').matches ||
//                        window.matchMedia('(display-mode: standalone)').matches;
// console.log(isInstalledPWA);
import Script from "next/script";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    
    <html lang="en">
      {/* <head><link rel="manifest" href="/manifest.json" />  </head> */}
      <body className={inter.className}>
        {/* <RegisterPWA /> */}

        {/* <InstallPWAButton /> */}
        {children}
      <Toaster />
      </body>
    </html>
  );
}
