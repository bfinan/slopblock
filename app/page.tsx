import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Slopblock Zero - Block AI slop everywhere.",
  description: "Slopblock Zero is a platform and set of tools for blocking AI-generated content.",
  openGraph: {
    title: "Slopblock Zero - Block AI-generated content on any website.",
    description: "Slopblock Zero is a platform and set of tools for tagging, filtering, and blocking AI-generated content.",
    type: "website",
    images: [
      {
        url: "/slopsign_centered.jpg",
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
    images: ["/slopsign_centered.jpg"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            <span className="font-normal">Block AI-generated Content on </span>
            <span className="font-bold">any website.</span>
          </h1>
          <div className="mb-6 sm:mb-8"></div>
          <p className="mb-8 text-lg text-gray-600 sm:text-xl">
            Development is just getting started. Find out more on the <Link href="/about" className="text-blue-600 underline hover:text-blue-800">About page</Link>.
          </p>
          <div className="w-full max-w-4xl flex justify-center items-center">
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
      </main>
    </div>
  );
}
