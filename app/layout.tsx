import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Orbitron, M_PLUS_Rounded_1c } from "next/font/google";

const orbitron = Orbitron({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

const mPlusRounded1c = M_PLUS_Rounded_1c({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digimon Library",
  description:
    "A comprehensive library to explore and learn about your favorite Digimon characters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mPlusRounded1c.className}>
      <body className={`antialiased`}>
        <Suspense
          fallback={
            <div className="absolute w-full h-full flex justify-center items-center">
              <h1 className="text-white">Loading...</h1>
            </div>
          }
        >
          {children}
        </Suspense>
      </body>
    </html>
  );
}
