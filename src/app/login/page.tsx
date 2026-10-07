import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { Button, Container } from "@/components/ui";
import { ArrowRightIcon, LockIcon, MailIcon, ShieldIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 py-16">
      <Container className="max-w-md">
        <div className="flex flex-col items-center text-center">
          <a href="/" aria-label="Back to MenuSnap home">
            <Logo />
          </a>
          <h1 className="mt-8 text-[clamp(1.7rem,4vw,2.3rem)] font-extrabold tracking-tight text-ink">
            Sign in opens with launch
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Paid accounts activate automatically after verified payment. You&rsquo;ll receive
            secure login instructions by email — a password-set link or a one-time magic link.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-3xl border border-line bg-white p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
              <LockIcon className="h-5 w-5" />
            </span>
            <p className="text-sm font-semibold text-ink">
              No plain-text passwords, ever.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
              <MailIcon className="h-5 w-5" />
            </span>
            <p className="text-sm font-semibold text-ink">
              Secure setup links arrive by email after activation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
              <ShieldIcon className="h-5 w-5" />
            </span>
            <p className="text-sm font-semibold text-ink">
              Passwords are hashed with modern algorithms before storage.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button href="/" variant="secondary" withArrow>
            Back to Home
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Already have an account?{" "}
          <a href="/" className="inline-flex items-center gap-1 font-bold text-accent-deep hover:text-accent">
            Go to pricing <ArrowRightIcon className="h-3.5 w-3.5" />
          </a>
        </p>
      </Container>
    </div>
  );
}