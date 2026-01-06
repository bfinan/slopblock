import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">About</h1>
        <p className="mb-8 text-base leading-7 text-gray-700 sm:text-lg">
          Slopblock Zero is a platform and set of tools for blocking AI-generated content. Similar to AdBlock or uBlock Origin, our goal is to give you tools to control the amount of AI-generated content you see.
        </p>
        
        <h2 className="mb-4 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl">AI Slop</h2>
        <p className="mb-4 text-base leading-7 text-gray-700 sm:text-lg">
          Recent advances in artificial intelligence (AI) make it possible to generate realistic images, text, videos, and other forms of media with a computer. While the quality of this generated media is subjective, the increase in its volume has been rapid. In 2025, Web firm{" "}
          <Link
            href="http://archive.ph/JLai0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            FivePercent
          </Link>{" "}
          estimated that "the quantity of AI-generated articles being published on the web surpassed the quantity of human-written articles".
        </p>
        <p className="mb-6 text-base leading-7 text-gray-700 sm:text-lg">
          AI-generated content is referred to as "slop". "Slop" was the{" "}
          <Link
            href="https://www.merriam-webster.com/wordplay/word-of-the-year"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Merriam-Webster word of the year
          </Link>{" "}
          for 2025 due to AI content's increasing saturation of social media platforms. <em>Last Week Tonight</em> did a full episode that explains the social problems that AI slop introduces. The video is 30 minutes long and contains adult language, but I'd recommend it if you have the time. My suspicion is that you want to keep reading right now.
        </p>
        <div className="my-8 aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/TWpg1RmzAbc?si=kVWUdh3IVpdHWoLw"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        
        <h2 className="mb-4 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl">Tools to Block AI Slop</h2>
        <p className="mb-4 text-base leading-7 text-gray-700 sm:text-lg">
          Individual social media platforms such as X/Twitter, YouTube, and Facebook have made changes to label AI slop. These tools are insufficient, as it is easier to generate slop than it is to moderate it.
        </p>
        <p className="mb-4 text-base leading-7 text-gray-700 sm:text-lg">
          The companies that host these platforms are also incentivized to allow it. AI slop engages users and drives revenue for them. Additionally, the companies that host these platforms make money from generating AI slop, and often encourage their users to make AI slop.
        </p>
        <p className="mb-6 text-base leading-7 text-gray-700 sm:text-lg">
          The ubiquity of all of this AI slop creates a need for a way to filter it. But how?
        </p>
        
        <h2 className="mb-4 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl">Slopblock Zero</h2>
        <p className="mb-4 text-base leading-7 text-gray-700 sm:text-lg">
          Development is just beginning on Slopblock Zero, a filtering tool designed for users who want to block as much AI Slop as possible.
        </p>
        <p className="mb-4 text-base leading-7 text-gray-700 sm:text-lg">
          Users in the community will submit accounts that they believe to post AI slop. These accounts will be added to a list. Curation of the list will be handled by the arbitration service{" "}
          <Link
            href="https://kleros.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Kleros
          </Link>
          .
        </p>
        <p className="mb-4 text-base leading-7 text-gray-700 sm:text-lg">
          Using an AI Slop Account List, we can develop tools such as a Google Chrome browser extension that allow people to choose what they see by filtering or blocking AI slop.
        </p>
        <p className="mb-6 text-base leading-7 text-gray-700 sm:text-lg">
          More details on the project's implementation can be found on the{" "}
          <Link
            href="/project"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Project page
          </Link>
          .
        </p>
        
        <h2 className="mb-4 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl">Conclusion</h2>
        <p className="mb-6 text-base leading-7 text-gray-700 sm:text-lg">
          The amount of AI slop out there is likely to continue increasing. It's up to you to decide if you want to accept it. We're here to help.
        </p>
      </main>
    </div>
  );
}

