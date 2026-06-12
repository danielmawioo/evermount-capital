"use client";

import { useEffect } from "react";
import { boot, shutdown } from "@intercom/messenger-js-sdk";

export default function IntercomProvider() {
  useEffect(() => {
    // Initialize Intercom when component mounts
    boot({
      app_id: "215468836564265", // 🛑 Replace with your real Intercom app ID
    });

    return () => {
      // Cleanup when component unmounts
      shutdown();
    };
  }, []);

  return null; // It doesn't render anything visible
}
