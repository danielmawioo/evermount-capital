import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logger } from "@/lib/logger";

const GithubCallbackSchema = z.object({
  code: z
    .string({ error: "Authorization code is required" })
    .trim()
    .min(1, "Authorization code is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = GithubCallbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 },
      );
    }

    const { code } = parsed.data;

    // Exchange code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/github/callback`,
        }),
      },
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description || "Authentication failed" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      accessToken: tokenData.access_token,
    });
  } catch (error: unknown) {
    logger.error("GitHub callback error", error);
    return NextResponse.json(
      { error: "Failed to authenticate with GitHub" },
      { status: 500 },
    );
  }
}
