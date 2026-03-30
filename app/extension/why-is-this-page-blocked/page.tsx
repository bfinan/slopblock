import Link from "next/link";

export default function WhyIsThisPageBlocked() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
          Why was this page blocked?
        </h1>
        <p className="text-base leading-8 text-gray-700 sm:text-lg">
          The page you were trying to view was blocked by Slopblock Zero, a browser extension that blocks AI-generated content.
        </p>
        <p className="mt-4 text-base leading-8 text-gray-700 sm:text-lg">
          You can manage or uninstall the extension in your {" "}
          <Link href="chrome://extensions/" className="text-blue-600 underline hover:text-blue-800">
          Extension Settings
          </Link>
          , or in the <Link href="https://chromewebstore.google.com/detail/slopblock-zero/fghjlgmoofbfekdhldaandocejfdjoic" className="text-blue-600 underline hover:text-blue-800">Chrome Web Store</Link>.
        </p>

        <p className="mt-4 text-base leading-8 text-gray-700 sm:text-lg">
          For product feedback, please email us at <a href="mailto:teamslopblock@proton.me" className="text-blue-600 underline hover:text-blue-800">teamslopblock@proton.me</a>.
        </p>
      </main>
    </div>
  );
}
