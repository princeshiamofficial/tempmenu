import type { Metadata } from "next";
import { Manrope, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://menusnap.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MenuSnap — Restaurant Menu Research & Menu Builder Bangladesh",
    template: "%s | MenuSnap",
  },
  description:
    "Explore 500+ restaurant and parlor menu references, research food items and prices, and build your own restaurant menu with MenuSnap.",
  keywords: [
    "Restaurant Menu Builder Bangladesh",
    "Restaurant Menu Software",
    "Menu Research Bangladesh",
    "Food Menu Builder",
    "Restaurant Menu Planning Software",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "MenuSnap",
    title: "MenuSnap — Restaurant Menu Research & Menu Builder Bangladesh",
    description:
      "Explore 500+ restaurant and parlor menu references, research food items and prices, and build your own restaurant menu with MenuSnap.",
    locale: "bn_BD",
    alternateLocale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "MenuSnap — Restaurant Menu Research & Menu Builder Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MenuSnap — Restaurant Menu Research & Menu Builder Bangladesh",
    description:
      "Explore 500+ restaurant and parlor menu references, research food items and prices, and build your own restaurant menu with MenuSnap.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${manrope.variable} ${notoSansBengali.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-base text-ink">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}