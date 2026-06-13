"use client";

import { useEffect } from "react";
import { boot, shutdown } from "@intercom/messenger-js-sdk";

export default function IntercomProvider() {
  useEffect(() => {
    const enabled = process.env.NEXT_PUBLIC_ENABLE_INTERCOM === "true";
    const appId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

    if (!enabled || !appId) {
      return;
    }

    boot({ app_id: appId });

    return () => {
      shutdown();
    };
  }, []);

  return null;
}
