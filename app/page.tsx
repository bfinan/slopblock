import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://slopblockzero.com";

export const metadata: Metadata = {
  title: "Slopblock Zero - Block AI slop everywhere.",
  description: "Slopblock Zero is a platform and set of tools for blocking AI-generated content.",
  openGraph: {
    title: "Slopblock Zero - Block AI-generated content on any website.",
    description: "Slopblock Zero is a platform and set of tools for tagging, filtering, and blocking AI-generated content.",
    type: "website",
    url: siteUrl,
    siteName: "Slopblock Zero",
    images: [
      {
        url: `${siteUrl}/slopsign_centered.jpg`,
        width: 1200,
        height: 630,
        alt: "Slopblock Zero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slopblock Zero - Block AI-generated content everywhere.",
    description: "Slopblock Zero is a platform and set of tools for blocking AI-generated content.",
    images: [`${siteUrl}/slopsign_centered.jpg`],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 md:gap-20">
          <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row md:items-center md:justify-center">
            <div className="max-w-2xl text-center md:text-left">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              <span className="font-normal text-gray-800">Tired of </span>
              <span className="font-bold text-red-800">AI Slop? </span>
              <br />
              <span className="font-bold text-black">Just block it.</span>
            </h1>
            {/** paragraph spacing   */}
            <div className="mb-5"></div>

            <p className="text-lg leading-relaxed text-gray-800 sm:text-2xl">
              Join a community of users blocking  {/* this will be a dynamic number || over <strong>20</strong> */} AI Slop Accounts on {/* so will this one */}<strong>5</strong> of the largest platforms.{" "}
            </p>

            <Link
              href="https://slopblockzero.com/install"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit max-w-full items-center gap-3 rounded-xl bg-green-500 px-5 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:text-lg mx-auto md:mx-0"
            >
              <Image
                src="/www/svg/google-chrome.svg"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 shrink-0"
                unoptimized
              />
              <span>Get Slopblock for Chrome</span>
            </Link>
            </div>
            <div className="flex w-full max-w-[400px] justify-center md:w-auto md:flex-shrink-0">
              <div className="overflow-hidden rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.12)]">
                <Image
                  src="/slopsign_centered.jpg"
                  alt="Slopblock sign"
                  width={400}
                  height={400}
                  className="h-auto w-full max-h-[400px] max-w-[400px]"
                  priority
                />
              </div>
            </div>
          </div>

          <section
            className="w-full border-t border-gray-200 pt-12 md:pt-16"
            aria-labelledby="browse-authentic-heading"
          >
            <h2
              id="browse-authentic-heading"
              className="text-center text-2xl font-semibold text-gray-900 sm:text-3xl md:text-left"
            >
              Browse the authentic web
            </h2>
          </section>
        </div>
      </main>
    </div>
  );
}
