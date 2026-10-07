"use client";

import { useEffect, useState } from "react";
import { DEMO_VIDEO_URL, DEMO_WORKFLOW } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { Button, Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon, CloseIcon, PlayIcon } from "@/components/icons";

/* ------------------------------------------------------------------ */
/* Modal player                                                        */
/* ------------------------------------------------------------------ */

function DemoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-night/90 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="MenuSnap demo video"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close video"
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lift">
          {DEMO_VIDEO_URL ? (
            <iframe
              src={DEMO_VIDEO_URL}
              className="h-full w-full"
              title="MenuSnap product demo video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <PlayIcon className="h-7 w-7 text-white/70" />
              </span>
              <p className="text-lg font-bold text-white">Demo video coming soon</p>
              <p className="max-w-sm text-sm leading-relaxed text-white/60">
                Set <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">DEMO_VIDEO_URL</code> in{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">src/lib/data.ts</code> to connect
                your YouTube, Vimeo or self-hosted video.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo section                                                        */
/* ------------------------------------------------------------------ */

export function DemoVideo() {
  const [open, setOpen] = useState(false);

  const openDemo = () => {
    setOpen(true);
    trackEvent("demoStarted", { source: "demo_section" });
  };

  const closeDemo = () => {
    setOpen(false);
    trackEvent("demoCompleted");
  };

  return (
    <section id="demo" className="relative overflow-hidden bg-night text-white">
      <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(255 90 54 / 0.18), transparent)" }}
        aria-hidden="true"
      />

      <Container className="section-pad relative">
        <SectionHeading
          dark
          eyebrow="See MenuSnap in Action"
          title="Research থেকে Ready Menu — দেখুন কীভাবে।"
          description="Two minutes is all you need to understand how MenuSnap turns scattered research into an organized, buildable menu."
        />

        {/* Video container */}
        <Reveal className="mt-12">
          <div
            className="group relative mx-auto aspect-video w-full max-w-4xl cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] transition-transform duration-300 hover:scale-[1.01]"
            onClick={openDemo}
            role="button"
            tabIndex={0}
            aria-label="Play the 2-minute MenuSnap demo"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openDemo();
              }
            }}
          >
            {/* Dashboard thumbnail (CSS-only) */}
            <div className="absolute inset-6 flex flex-col gap-3 opacity-30 sm:inset-10">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/40" />
                <span className="h-3 w-3 rounded-full bg-white/40" />
                <span className="h-3 w-3 rounded-full bg-white/40" />
                <span className="ml-auto h-6 w-44 rounded-md bg-white/15" />
              </div>
              <div className="mt-3 flex gap-2">
                <span className="h-7 w-24 rounded-lg bg-accent/50" />
                <span className="h-7 w-24 rounded-lg bg-white/15" />
                <span className="h-7 w-24 rounded-lg bg-white/15" />
              </div>
              <div className="mt-2 grid flex-1 gap-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.07] px-4 py-3">
                    <span className="h-7 w-7 rounded-md bg-white/20" />
                    <span className="h-2.5 w-1/3 rounded bg-white/25" />
                    <span className="ml-auto h-2.5 w-12 rounded bg-accent/50" />
                  </div>
                ))}
              </div>
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="absolute h-20 w-20 rounded-full bg-accent/40" aria-hidden="true" />
              <span className="animate-pulse-ring absolute h-20 w-20 rounded-full bg-accent/40" aria-hidden="true" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white shadow-pop transition-transform duration-300 group-hover:scale-110">
                <PlayIcon className="h-8 w-8 translate-x-0.5" />
              </span>
            </div>

            <span className="absolute bottom-4 left-4 rounded-full bg-night/70 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur">
              2-Min Product Tour
            </span>
          </div>
        </Reveal>

        {/* Workflow */}
        <Reveal className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3" aria-label="MenuSnap workflow">
            {DEMO_WORKFLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={
                    i === DEMO_WORKFLOW.length - 1
                      ? "rounded-full bg-accent px-3.5 py-1.5 text-[13px] font-bold text-white"
                      : "rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] font-semibold text-white/80"
                  }
                >
                  {step}
                </span>
                {i < DEMO_WORKFLOW.length - 1 && (
                  <ArrowRightIcon className="h-3.5 w-3.5 text-white/30" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <Button href="#pricing" size="lg" withArrow>
            Start Building My Menu
          </Button>
        </div>
      </Container>

      {open && <DemoModal onClose={closeDemo} />}
    </section>
  );
}