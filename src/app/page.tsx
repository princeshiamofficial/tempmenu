import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { ProblemSection } from "@/components/ProblemSection";
import { DemoVideo } from "@/components/DemoVideo";
import { HowItWorks } from "@/components/HowItWorks";
import { RestaurantExplorer } from "@/components/RestaurantExplorer";
import { SmartSearch } from "@/components/SmartSearch";
import { PriceComparison } from "@/components/PriceComparison";
import { MenuBuilderPreview } from "@/components/MenuBuilderPreview";
import { FeatureBento } from "@/components/FeatureBento";
import { Benefits } from "@/components/Benefits";
import { Audience } from "@/components/Audience";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Pricing } from "@/components/Pricing";
import { PurchaseFlow } from "@/components/PurchaseFlow";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { FAQS } from "@/lib/data";

export default function HomePage() {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MenuSnap",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Restaurant menu research and menu builder for Bangladesh. Explore 500+ restaurant and parlor menu references, research food items and price references, and build your own restaurant menu.",
    offers: [
      { "@type": "Offer", name: "Starter", price: "499", priceCurrency: "BDT" },
      { "@type": "Offer", name: "Pro", price: "999", priceCurrency: "BDT" },
      { "@type": "Offer", name: "Agency", price: "2499", priceCurrency: "BDT" },
    ],
    inLanguage: ["bn", "en"],
    publisher: { "@type": "Organization", name: "MenuSnap" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <ProblemSection />
        <DemoVideo />
        <HowItWorks />
        <RestaurantExplorer />
        <SmartSearch />
        <PriceComparison />
        <MenuBuilderPreview />
        <FeatureBento />
        <Benefits />
        <Audience />
        <BeforeAfter />
        <Pricing />
        <PurchaseFlow />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}