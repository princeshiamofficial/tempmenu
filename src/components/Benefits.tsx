import { BENEFITS } from "@/lib/data";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function Benefits() {
  return (
    <section id="benefits" className="section-pad bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Why MenuSnap"
          title="Database নয়। আপনার Menu Planning Shortcut."
          description="MenuSnap is not just a collection of menus — it's a workflow that takes you from blank page to buildable menu."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 90}>
              <article className="group h-full rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-2xl transition-transform duration-300 group-hover:scale-110">
                  <span aria-hidden="true">{benefit.icon}</span>
                </span>
                <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}