import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button, Container } from "@/components/ui";

const LEGAL_CONTENT: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  terms: {
    title: "Terms & Conditions",
    sections: [
      {
        heading: "1. Service overview",
        body: "MenuSnap is a restaurant menu research and menu building SaaS for Bangladesh. It provides menu references, food-item search and price-reference information to help users plan their own menus.",
      },
      {
        heading: "2. Reference information & ownership",
        body: "Menu references belong to their respective restaurant owners and brands. MenuSnap presents this content as research information only and is not affiliated with, or endorsed by, the restaurants referenced. Users must not present another brand's menu as their own.",
      },
      {
        heading: "3. Prices are references",
        body: "Displayed prices are listed price references only. They may change and are not guarantees, recommendations, or prescriptions of selling prices. Final pricing decisions rest with each business.",
      },
      {
        heading: "4. Paid subscriptions",
        body: "Subscriptions are billed in advance for the selected duration. Activation follows verified server-side payment. Full details of billing, renewal and account access will be published here before launch.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "1. What we collect",
        body: "We collect the information needed to run your account: name, email, phone, subscription status and menu projects you create. Payment details are handled by the payment gateway — card and wallet credentials never reach our servers.",
      },
      {
        heading: "2. How we use it",
        body: "Your data is used to provide the service, activate subscriptions, send secure account-setup emails and support requests. We do not sell personal data.",
      },
      {
        heading: "3. Security",
        body: "Passwords are hashed before storage (never stored in plain text and never emailed). Sensitive operations run server-side with input validation, secure sessions and rate-limiting readiness.",
      },
      {
        heading: "4. Data retention & your rights",
        body: "You may request export or deletion of your data at any time. The complete policy, including cookie and analytics details, will be finalized before public launch.",
      },
    ],
  },
  refund: {
    title: "Refund Policy",
    sections: [
      {
        heading: "1. Launch-period policy",
        body: "Because subscriptions activate instantly after verified payment, we will publish a clear refund window (e.g., 7 days for unused subscriptions) before launch.",
      },
      {
        heading: "2. How refunds are handled",
        body: "Approved refunds are returned through the original payment method within the gateway's processing time. Refund requests must be sent to support@menusnap.app with the transaction reference.",
      },
      {
        heading: "3. Contact",
        body: "Questions about payments or refunds: support@menusnap.app.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(LEGAL_CONTENT).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = LEGAL_CONTENT[slug];
  if (!content) return { title: "Not found" };
  return { title: content.title };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = LEGAL_CONTENT[slug];
  if (!content) notFound();

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-line bg-white/80 backdrop-blur">
        <div className="container-site flex h-16 items-center justify-between">
          <a href="/" aria-label="Back to MenuSnap home">
            <Logo />
          </a>
          <a href="/" className="text-sm font-bold text-muted transition-colors hover:text-ink">
            ← Back to home
          </a>
        </div>
      </header>

      <main className="container-site py-14">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-tight text-ink">
            {content.title}
          </h1>
          <p className="mt-2 rounded-xl bg-accent-soft px-4 py-3 text-sm font-semibold text-accent-deep">
            This document is being finalized ahead of public launch. The outline below will
            be completed with full legal language.
          </p>
          <div className="mt-8 flex flex-col gap-8">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-extrabold text-ink">{section.heading}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{section.body}</p>
              </section>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/" variant="secondary" withArrow>
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}