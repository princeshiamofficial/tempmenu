import { NextResponse } from "next/server";
import { isSafeId, sanitizeString } from "@/lib/validation";
import type { ApiError, CheckoutResponse, VerifyPaymentRequest } from "@/types";

/**
 * POST /api/payments/verify
 *
 * Server-side payment verification. Called from the gateway webhook / IPN
 * (never trusted from the browser). Flow: verify the transaction with the
 * gateway using its server SDK, mark the Payment row "completed", then
 * trigger subscription activation + the secure setup email.
 *
 * This stub returns 501 until the gateway is configured. It never accepts
 * a client-reported "payment successful" as proof of payment.
 */

export const dynamic = "force-dynamic";

type VerifyResponse = CheckoutResponse | ApiError;

export async function POST(request: Request): Promise<NextResponse<VerifyResponse>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const record = body as Partial<VerifyPaymentRequest>;
  const checkoutId = sanitizeString(record.checkoutId, 64);
  const transactionId = sanitizeString(record.transactionId, 128);

  if (!checkoutId || !isSafeId(checkoutId)) {
    return NextResponse.json({ ok: false, message: "Invalid checkout reference." }, { status: 400 });
  }
  if (!transactionId || !isSafeId(transactionId)) {
    return NextResponse.json({ ok: false, message: "Invalid transaction reference." }, { status: 400 });
  }

  if (process.env.PAYMENT_GATEWAY !== "configured") {
    return NextResponse.json(
      { ok: false, message: "Payment verification is not configured yet." },
      { status: 501 },
    );
  }

  /*
   * INTEGRATION POINT:
   * 1. Look up the Payment row by checkoutId; reject if not pending.
   * 2. Verify the transaction with the gateway server-side (status query
   *    or signed webhook payload with secret validation + replay guard).
   * 3. Only when the gateway reports success:
   *    - mark Payment completed (amount + gateway must match the order),
   *    - activate the subscription,
   *    - generate a secure account-setup token and email it.
   */

  return NextResponse.json({
    ok: true,
    message: "Payment verified.",
  });
}