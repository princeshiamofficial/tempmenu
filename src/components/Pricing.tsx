"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { COUPON, PLANS, PRICING_TRUST, type BillingPeriod, type PlanId } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { Button, Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { CheckIcon, SparkleIcon } from "@/components/icons";

function formatTaka(value: number): string {
  return value.toLocaleString("en-US");
}

function PriceDisplay({
  planId,
  period,
  couponApplied,
  dark = false,
}: {
  planId: PlanId;
  period: BillingPeriod;
  couponApplied: boolean;
  dark?: boolean;
}) {
  const plan = PLANS.find((p) => p.id === planId)!;
  const priceClass = cn(
    "text-[2.6rem] font-extrabold leading-none tracking-tight",
    dark ? "text-white" : "text-ink",
  );
  const subClass = cn("text-sm font-semibold", dark ? "text-white/60" : "text-muted");

  if (planId === "starter") {
    return (
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className={priceClass}>৳{formatTaka(plan.monthly)}</span>
        <span className={subClass}>/ month</span>
      </p>
    );
  }

  if (period === "1m") {
    return (
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className={priceClass}>৳{formatTaka(plan.monthly)}</span>
        <span className={subClass}>/ 1 Month</span>
      </p>
    );
  }

  const quarterly = plan.quarterly ?? plan.monthly * 3;
  const discounted = couponApplied && planId === "pro" ? quarterly - COUPON.discount : quarterly;

  return (
    <div className="mt-5">
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className={priceClass}>৳{formatTaka(discounted)}</span>
        <span className={subClass}>/ 3 Months</span>
      </p>
      {couponApplied && planId === "pro" && (
        <p className={cn("mt-1.5 text-sm font-semibold", dark ? "text-white/60" : "text-muted")}>
          <span className="line-through opacity-70">৳{formatTaka(quarterly)}</span>
          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-bold text-success">
            <SparkleIcon className="h-3 w-3" /> Save ৳{COUPON.discount}
          </span>
        </p>
      )}
    </div>
  );
}

export function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>("1m");
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  /* Track pricing viewed once */
  useEffect(() => {
    const el = pricingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackEvent("pricingViewed");
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const changePeriod = (next: BillingPeriod) => {
    if (next === period) return;
    setPeriod(next);
    trackEvent("billingPeriodChanged", { period: next });
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === COUPON.code) {
      setCouponApplied(true);
      setCouponError(null);
      trackEvent("couponUsed", { code, discount: COUPON.discount });
    } else {
      setCouponApplied(false);
      setCouponError(code === "" ? "Enter a coupon code first." : "Invalid coupon code.");
    }
  };

  const checkoutHref = (planId: PlanId): string => {
    const params = new URLSearchParams({ plan: planId, period });
    if (couponApplied && planId === "pro") params.set("coupon", COUPON.code);
    return `/checkout?${params.toString()}`;
  };

  return (
    <section id="pricing" className="section-pad bg-cream" ref={pricingRef}>
      <Container>
        <SectionHeading
          eyebrow="Simple Pricing"
          title="আপনার Business-এর জন্য সঠিক Plan বেছে নিন।"
          description="Start with Starter, grow with Pro. Every plan includes access to the 500+ menu reference database."
        />

        {/* Billing toggle */}
        <Reveal className="mt-10 flex justify-center">
          <div
            className="relative grid grid-cols-2 rounded-2xl border border-line bg-white p-1.5 shadow-card"
            role="group"
            aria-label="Billing period"
          >
            <span
              className={cn(
                "absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-xl bg-ink transition-transform duration-300 ease-out",
                period === "3m" && "translate-x-full",
              )}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => changePeriod("1m")}
              aria-pressed={period === "1m"}
              className={cn(
                "relative z-10 rounded-xl px-6 py-2.5 text-sm font-bold transition-colors duration-200",
                period === "1m" ? "text-white" : "text-muted hover:text-ink",
              )}
            >
              1 Month
            </button>
            <button
              type="button"
              onClick={() => changePeriod("3m")}
              aria-pressed={period === "3m"}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition-colors duration-200",
                period === "3m" ? "text-white" : "text-muted hover:text-ink",
              )}
            >
              3 Months
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-extrabold transition-colors duration-200",
                  period === "3m" ? "bg-accent text-white" : "bg-accent-soft text-accent-deep",
                )}
              >
                SAVE MORE
              </span>
            </button>
          </div>
        </Reveal>

        {/* Plans */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const isPro = plan.popular;
            return (
              <Reveal key={plan.id} delay={i * 100}>
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 sm:p-8",
                    isPro
                      ? "border border-accent/40 bg-night text-white shadow-pop lg:-my-4 lg:scale-[1.03]"
                      : "border border-line bg-white shadow-card hover:-translate-y-1 hover:shadow-lift",
                  )}
                >
                  {isPro && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-pop">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className={cn("text-lg font-extrabold", isPro ? "text-white" : "text-ink")}>
                        {plan.name}
                      </h3>
                      {plan.launch && isPro && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-extrabold text-accent-deep">
                          🔥 Launch Offer
                        </span>
                      )}
                    </div>
                    <p className={cn("mt-1 text-sm", isPro ? "text-white/60" : "text-muted")}>
                      {plan.tagline}
                    </p>
                  </div>

                  <PriceDisplay
                    planId={plan.id}
                    period={period}
                    couponApplied={couponApplied}
                    dark={isPro}
                  />

                  <ul className={cn("mt-6 flex flex-col gap-2.5 border-t pt-6", isPro ? "border-white/10" : "border-line")}>
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                            isPro ? "bg-accent/25 text-accent" : "bg-accent-soft text-accent-deep",
                          )}
                        >
                          <CheckIcon className="h-3 w-3" />
                        </span>
                        <span className={cn("text-sm font-medium", isPro ? "text-white/85" : "text-ink")}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-1 items-end">
                    <Button
                      href={checkoutHref(plan.id)}
                      variant={isPro ? "primary" : "secondary"}
                      size="lg"
                      withArrow={isPro}
                      className="w-full"
                      onClick={() => {
                        trackEvent("planSelected", { plan: plan.id, period });
                        trackEvent("checkoutStarted", { plan: plan.id, period });
                      }}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Coupon */}
        <Reveal className="mt-10">
          <div className="mx-auto max-w-md rounded-2xl border border-line bg-white p-5 shadow-card">
            <p className="text-center text-sm font-semibold text-muted">
              Have a launch coupon?{" "}
              <span className="rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[13px] font-extrabold text-accent-deep">
                {COUPON.code}
              </span>
            </p>
            <div className="mt-3 flex gap-2">
              <label htmlFor="coupon-input" className="sr-only">
                Coupon code
              </label>
              <input
                id="coupon-input"
                type="text"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value.toUpperCase());
                  setCouponError(null);
                }}
                placeholder="Enter coupon code"
                className={cn(
                  "w-full rounded-xl border bg-cream/60 px-4 py-2.5 text-sm font-semibold uppercase text-ink placeholder:normal-case placeholder:font-medium placeholder:text-muted/70 focus:outline-none",
                  couponApplied
                    ? "border-success/60 bg-success/5"
                    : couponError
                      ? "border-red-400"
                      : "border-line focus:border-accent/50",
                )}
              />
              {couponApplied ? (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-success px-4 text-sm font-bold text-white">
                  <CheckIcon className="h-4 w-4" /> Applied
                </span>
              ) : (
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="shrink-0 rounded-xl bg-ink px-5 text-sm font-bold text-white transition-colors hover:bg-ink/85"
                >
                  Apply
                </button>
              )}
            </div>
            {couponError && <p className="mt-2 text-xs font-semibold text-red-500">{couponError}</p>}
            {couponApplied && period !== "3m" && (
              <p className="mt-2 text-xs font-medium text-muted">
                {COUPON.code} applies to the Pro 3-month plan — switch the toggle to see your
                discount.
              </p>
            )}
            {couponApplied && period === "3m" && (
              <p className="mt-2 text-xs font-semibold text-success">
                Pro 3-month plan: ৳1,999 → ৳1,499. You save ৳{COUPON.discount}.
              </p>
            )}
          </div>
        </Reveal>

        {/* Trust strip */}
        <Reveal className="mt-12">
          <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
            {PRICING_TRUST.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 shadow-card"
              >
                <span className="text-xl" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-[13px] font-bold text-ink">{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}