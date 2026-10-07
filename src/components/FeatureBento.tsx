import type { ReactElement } from "react";
import { cn } from "@/lib/cn";
import { BENTO_CARDS, type BentoCard } from "@/lib/data";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon, CheckIcon, FileIcon, GripIcon, SearchIcon, PlusIcon } from "@/components/icons";

/* Mini product previews (CSS-only) */

function DatabasePreview() {
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      {[
        ["N", "Café Nodi", "bg-amber-100 text-amber-800"],
        ["B", "Burger Bari", "bg-accent-soft text-accent-deep"],
        ["G", "Golden Dragon", "bg-red-100 text-red-700"],
      ].map(([initial, name, tone]) => (
        <div key={name} className="flex items-center gap-2.5 rounded-lg border border-line bg-white px-3 py-2">
          <span className={cn("flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-extrabold", tone)}>
            {initial}
          </span>
          <span className="text-xs font-semibold text-ink">{name}</span>
          <span className="ml-auto rounded bg-cream px-1.5 py-0.5 text-[10px] font-bold text-muted">৳ ref</span>
        </div>
      ))}
      <span className="rounded-full border border-dashed border-accent/40 px-3 py-1 text-center text-[11px] font-bold text-accent-deep">
        +500 more restaurants
      </span>
    </div>
  );
}

function SearchPreview() {
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-2">
        <SearchIcon className="h-3.5 w-3.5 text-accent" />
        <span className="text-xs font-semibold text-ink">Chicken Burg…</span>
        <span className="animate-caret ml-auto h-4 w-[2px] rounded bg-accent" />
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-accent-soft px-2.5 py-2">
        <span className="text-[10px] font-extrabold text-accent-deep">Crispy Chicken Burger</span>
        <span className="ml-auto text-[10px] font-bold text-ink">৳260</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-2">
        <span className="text-[10px] font-semibold text-muted">BBQ Chicken Burger</span>
        <span className="ml-auto text-[10px] font-bold text-ink">৳320</span>
      </div>
    </div>
  );
}

function PricePreview() {
  const bars = [45, 60, 72, 88, 55, 78];
  return (
    <div className="flex h-24 items-end gap-2 rounded-lg border border-line bg-white p-3" aria-hidden="true">
      {bars.map((height, i) => (
        <div
          key={i}
          className={cn(
            "flex-1 rounded-t-md",
            i === 3 ? "bg-accent" : "bg-accent/30",
          )}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

function BuilderPreview() {
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      <div className="flex gap-1.5">
        <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-white">Burger</span>
        <span className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-semibold text-muted">Pizza</span>
        <span className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-semibold text-muted">Drinks</span>
      </div>
      {[
        ["Classic Chicken Burger", "৳280"],
        ["BBQ Chicken Burger", "৳320"],
        ["Cold Coffee", "৳180"],
      ].map(([name, price]) => (
        <div key={name} className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2">
          <GripIcon className="h-3 w-3 text-muted/50" />
          <span className="text-xs font-semibold text-ink">{name}</span>
          <span className="ml-auto text-[11px] font-bold text-accent-deep">{price}</span>
        </div>
      ))}
    </div>
  );
}

function CategoriesPreview() {
  return (
    <div className="flex flex-wrap gap-1.5" aria-hidden="true">
      {["Burger", "Pizza", "Rice", "Drinks"].map((c, i) => (
        <span
          key={c}
          className={cn(
            "rounded-full px-2.5 py-1 text-[10px] font-bold",
            i === 0 ? "bg-accent text-white" : "border border-line bg-white text-muted",
          )}
        >
          {c}
        </span>
      ))}
      <span className="flex items-center gap-0.5 rounded-full border border-dashed border-accent/40 px-2 py-1 text-[10px] font-bold text-accent-deep">
        <PlusIcon className="h-2.5 w-2.5" /> New
      </span>
    </div>
  );
}

function ShortlistPreview() {
  return (
    <div className="flex flex-col gap-1.5" aria-hidden="true">
      {["Chicken Burger", "Cold Coffee", "Thai Fried Chicken"].map((name) => (
        <div key={name} className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-success">
            <CheckIcon className="h-3 w-3 text-white" />
          </span>
          <span className="text-[11px] font-semibold text-ink">{name}</span>
        </div>
      ))}
    </div>
  );
}

function ExportPreview() {
  return (
    <div className="flex gap-2" aria-hidden="true">
      <span className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-2 text-[10px] font-extrabold text-ink">
        <FileIcon className="h-3.5 w-3.5 text-accent" /> PDF
      </span>
      <span className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-2 text-[10px] font-extrabold text-ink">
        <FileIcon className="h-3.5 w-3.5 text-success" /> XLSX
      </span>
    </div>
  );
}

function MultiplePreview() {
  return (
    <div className="flex flex-col gap-1.5" aria-hidden="true">
      {[
        ["Café Nodi Project", "bg-accent-soft text-accent-deep"],
        ["Burger Bari Project", "bg-amber-100 text-amber-800"],
      ].map(([name, tone]) => (
        <div key={name} className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-1.5">
          <span className={cn("h-3.5 w-3.5 rounded", tone)} />
          <span className="text-[11px] font-semibold text-ink">{name}</span>
        </div>
      ))}
    </div>
  );
}

const PREVIEWS: Record<BentoCard["id"], () => ReactElement> = {
  database: DatabasePreview,
  search: SearchPreview,
  price: PricePreview,
  builder: BuilderPreview,
  categories: CategoriesPreview,
  shortlist: ShortlistPreview,
  export: ExportPreview,
  multiple: MultiplePreview,
};

const SPANS: Record<BentoCard["size"], string> = {
  lg: "lg:col-span-2 lg:row-span-2",
  md: "lg:col-span-1",
  sm: "lg:col-span-1",
};

export function FeatureBento() {
  return (
    <section id="features" className="section-pad bg-cream">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Menu Planning-এর প্রয়োজনীয় Tools এক জায়গায়।"
          description="Research, compare, shortlist, build and export — the whole workflow, not a pile of disconnected tools."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-fr">
          {BENTO_CARDS.map((card, i) => {
            const Preview = PREVIEWS[card.id];
            return (
              <Reveal
                key={card.id}
                delay={(i % 4) * 90}
                className={cn(
                  "group rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
                  SPANS[card.size],
                )}
              >
                <div className={cn("flex h-full flex-col", card.size === "lg" ? "justify-between gap-8" : "gap-4")}>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-ink">{card.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{card.desc}</p>
                  </div>
                  <div className="rounded-2xl border border-line bg-cream/60 p-3.5">
                    <Preview />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}