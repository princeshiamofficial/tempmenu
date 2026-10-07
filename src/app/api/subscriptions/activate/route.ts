import { NextResponse } from "next/server";
import { isSafeId, sanitizeString } from "@/lib/validation";
import type { ActivateSubscriptionRequest, ApiError } from "@/types";

/**
 * POST /api/subscriptions/activate
 *
 * Server-only: activates a subscription for a verified, completed payment.
 * Creates/updates the user account, creates the Subscription row, sets
 * start/expiry dates, and kicks off the secure setup email. Never callable
 * as a free "upgrade" — authorization is required and the linked Payment
 * must already be verified server-side.
 *
 * Stub returns 501 until the backend is wired.
 */

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse<ApiError>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const record = body as Partial<ActivateSubscriptionRequest>;
  const checkoutId = sanitizeString(record.checkoutId, 64);

  if (!checkoutId || !isSafeId(checkoutId)) {
    return NextResponse.json({ ok: false, message: "Invalid checkout reference." }, { status: 400 });
  }

  if (process.env.PAYMENT_GATEWAY !== "configured") {
    return NextResponse.json(
      { ok: false, message: "Subscription activation is not configured yet." },
      { status: 501 },
    );
  }

  /*
   * INTEGRATION POINT (transactional):
   * 1. Load Payment by checkoutId; require status === "completed" and that
   *    it was verified by the gateway webhook (not by client input).
   * 2. Create the User (or find by email) with role customer/agency by plan.
   * 3. Create Subscription { plan, billingPeriod, startDate: now,
   *    expiryDate: now + 1m/3m, status: active }.
   * 4. Generate a cryptographically secure, expiring account-setup token.
   * 5. Send the setup/login email (see /api/auth/setup).
   */

  return NextResponse.json({ ok: false, message: "Subscription activated." }, { status: 501 });
}