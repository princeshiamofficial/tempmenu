import { AUDIENCE } from "@/lib/data";
import { Button, Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export function Audience() {
  return (
    <section id="audience" className="section-pad bg-cream">
      <Container>
        <SectionHeading
          eyebrow="Who It's For"
          title="MenuSnap কার জন্য?"
          description="From your first restaurant to a full agency practice — if you build menus, MenuSnap helps you plan them."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((audience, i) => (
            <Reveal key={audience.title} delay={(i % 4) * 80}>
              <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-2xl transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {audience.icon}
                </span>
                <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink">{audience.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{audience.desc}</p>
                <a
                  href="#pricing"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-accent-deep transition-colors hover:text-accent"
                >
                  Find Your Menu
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </article>
            </Reveal>
          ))}

          {/* Filled CTA slot */}
          <Reveal delay={80}>
            <div className="flex h-full flex-col justify-between rounded-3xl bg-ink p-6 shadow-lift">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                  Not sure yet?
                </p>
                <h3 className="mt-3 text-lg font-extrabold leading-snug text-white">
                  আপনার Business-এর জন্য নিজের Menu তৈরি করুন।
                </h3>
              </div>
              <Button href="#pricing" variant="dark" withArrow className="mt-8 w-full">
                Find Your Menu
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}