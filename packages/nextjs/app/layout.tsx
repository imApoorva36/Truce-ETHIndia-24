'use client'
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

// export const metadata = getMetadata({ title: "Scaffold-ETH 2 App", description: "Built with 🏗 Scaffold-ETH 2" });

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
      <AnonAadhaarProvider
        _artifactslinks={{
          zkey_url: "/circuit_final.zkey",
          vkey_url: "/vkey.json",
          wasm_url: "/aadhaar-verifier.wasm",
        }}>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </AnonAadhaarProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
