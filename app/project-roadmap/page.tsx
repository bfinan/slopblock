import Link from "next/link";

export default function ProjectRoadmap() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">Project Roadmap 🗺️</h1>
        <p className="mb-6 text-base leading-7 text-gray-700 sm:text-lg">Here's what's next for Slopblock Zero. </p>
        <h2 className="mb-4 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl">Coming soon - Version 1.2</h2>
        <ul className="list-disc list-inside mb-6 text-base leading-7 text-gray-700 sm:text-lg"><li>
          Deeply expanded list of AI Slop Accounts
        </li>
        <li>
          <Link href="https://curate.kleros.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Kleros Curate</Link> support for human-curated Lists
        </li>
        <li>
          Support for downloading updated lists
        </li>
        </ul>

        <h2 className="mb-4 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl">Coming eventually - Project Wishlist</h2>
        <ul className="list-disc list-inside mb-6 text-base leading-7 text-gray-700 sm:text-lg"><li>
          Firefox support
        </li>
        <li>
          Platform-level blocking: Automatically block AI Slop Accounts on individual platforms.
        </li>
        </ul>
        <h2 className="mb-4 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl">Contribute</h2>
        <p className="mb-6 text-base leading-7 text-gray-700 sm:text-lg">You can help by <Link href="https://github.com/slopblockzero/slopblockzero/issues" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">requesting features</Link> or <Link href="https://github.com/slopblockzero/slopblockzero/pulls" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">contributing to the source code</Link>.</p>
        <p className="mb-6 text-base leading-7 text-gray-700 sm:text-lg">Have other product feedback? Email us at <a href="mailto:teamslopblock@proton.me" className="text-blue-600 underline hover:text-blue-800">teamslopblock@proton.me</a>.</p>

        <p>Initially development of this project is part of the <Link href="https://kleros.io/fellowship/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">9th Kleros Fellowship of Justice</Link>. </p>
      </main>


    </div>
  );
}
