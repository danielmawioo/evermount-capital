import { NextResponse } from "next/server";

/** Social OAuth is not implemented. Do not exchange GitHub codes. */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "Social sign-in is not available. Use email and password.",
    },
    { status: 501 },
  );
}
