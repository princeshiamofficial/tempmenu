import { cn } from "@/lib/cn";
import { OLD_WAY, ORGANIZED_POINTS, PAIN_POINTS } from "@/lib/data";
import { Button, Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { CheckIcon, ClockIcon } from "@/components/icons";

/* Scattered "old way" cards — rotations are fixed per index */
const ROTATIONS = ["-rotate-6", "rotate-3", "rotate-2", "-rotate-3", "rotate-3", "-rotate-2", "rotate-6"];
const POSITIONS = [
  "left-[8%] top-[8%]",
  "left-[54%] top-[5%]",
  "left-[14%] top-[36%]",
  "left-[62%] top-[34%]",
  "left-[5%] top-[64%]",
  "left-[52%] top-[60%]",
  "left-[30%] top-[76%]",
];

export function ProblemSection() {
  return (
    <section id="problem" className="section-pad bg-cream">
      <Container>
        <SectionHeading
          eyebrow="The Old Way"
          title="Restaurant Menu Research এত কঠিন হওয়ার কথা না।"
          description="Facebook page, Google search, PDF, screenshot — কোথায় কী আছে, মনে রাখাই কঠিন।"
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
          {/* Chaos visual */}
          <Reveal>
            <div className="relative h-[360px] overflow-hidden rounded-3xl border border-line bg-white/60 sm:h-[400px]">
              <div className="bg-dots absolute inset-0 opacity-50" aria-hidden="true" />
              {OLD_WAY.map((source, i) => (
                <div
                  key={source.label}
                  className={cn(
                    "absolute flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3 shadow-card",
                    ROTATIONS[i],
                    POSITIONS[i],
                  )}
                >
                  <span aria-hidden="true" className="text-base">{source.emoji}</span>
                  <span className="text-sm font-semibold text-ink">{source.label}</span>
                </div>
              ))}
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-2xl bg-ink px-5 py-3.5 shadow-lift">
                <ClockIcon className="h-5 w-5 text-accent" />
                <span className="text-[15px] font-extrabold text-white">Hours of Research</span>
              </div>
            </div>
          </Reveal>

          {/* Pain points */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-center gap-3">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                Sound familiar?
              </p>
              {PAIN_POINTS.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3.5 rounded-2xl border border-line bg-white px-5 py-4 shadow-card transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-base font-extrabold text-accent-deep"
                  >
                    ?
                  </span>
                  <span className="text-[15px] font-bold text-ink">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Transition — organized side */}
        <Reveal className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-balance text-[clamp(1.7rem,3.6vw,2.6rem)] font-extrabold leading-tight tracking-tight text-ink">
              <span className="text-accent">MenuSnap</span> সবকিছু এক জায়গায় নিয়ে আসে।
            </h3>
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              {ORGANIZED_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink shadow-card"
                >
                  <CheckIcon className="h-3.5 w-3.5 text-success" />
                  {point}
                </li>
              ))}
            </ul>
            <Button href="#product" variant="secondary" withArrow size="lg" className="mt-8">
              Explore the Platform
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}