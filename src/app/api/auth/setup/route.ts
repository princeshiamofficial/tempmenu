import { NextResponse } from "next/server";
import { isEmail, isSafeId, sanitizeString } from "@/lib/validation";
import type { ApiError, SetupEmailRequest } from "@/types";

/**
 * POST /api/auth/setup
 *
 * Sends a secure account-setup email containing a one-time, expiring link
 * that lets the customer set a password (or use a magic link). Plain-text
 * passwords are never stored and never emailed.
 *
 * Stub returns 501 until email + auth backend are wired.
 */

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse<ApiError>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const record = body as Partial<SetupEmailRequest>;
  const userId = sanitizeString(record.userId, 64);
  const email = sanitizeString(record.email, 200);

  if (!userId || !isSafeId(userId)) {
    return NextResponse.json({ ok: false, message: "Invalid user reference." }, { status: 400 });
  }
  if (!email || !isEmail(email)) {
    return NextResponse.json({ ok: false, message: "A valid email is required." }, { status: 400 });
  }

  if (process.env.EMAIL_PROVIDER !== "configured") {
    return NextResponse.json(
      { ok: false, message: "Account setup email service is not configured yet." },
      { status: 501 },
    );
  }

  /*
   * INTEGRATION POINT:
   * 1. Generate a secure random token (>= 32 bytes, e.g. crypto.randomBytes).
   * 2. Store a hash of the token with an expiry (e.g. 24h) — never the raw
   *    token, mirroring password-hashing practice.
   * 3. Email a link like /auth/set-password?token=<token> (or magic login).
   * 4. On use, hash-compare the presented token, mark it single-use, and
   *    let the user set a password (hashed with argon2/bcrypt server-side).
   * Never log or email the raw token beyond the intended recipient.
   */

  return NextResponse.json({ ok: false, message: "Setup email queued." }, { status: 501 });
}