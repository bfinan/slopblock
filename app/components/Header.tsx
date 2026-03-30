import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const tagSlopAccountsUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSfbDHClcrB1bjsGmc2aJJiL6oghCx_k0kN8ZzRPfZ8F8UyGWQ/viewform?usp=publish-editor";

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-4 sm:px-6">
        {/* Left side: Logo and Title */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo/logo256transparent.png"
            alt="SB"
            width={40}
            height={40}
            className="h-8 w-8 sm:h-10 sm:w-10"
            priority
            unoptimized
          />
          <span className="text-xl sm:text-2xl">
            <span className="font-bold">Slopblock</span>
            <span className="font-normal"> Zero</span>
          </span>
        </Link>

        {/* Right side: Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/about"
            className="hidden sm:block text-base text-gray-700 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
          <details className="group relative hidden sm:block">
            <summary className="flex list-none cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-base text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 [&::-webkit-details-marker]:hidden">
              Project
              <span className="text-gray-700" aria-hidden="true">
                ▾
              </span>
            </summary>
            <div className="absolute left-0 top-full z-20 mt-2 hidden min-w-52 rounded-md border border-gray-200 bg-white py-1 shadow-md group-open:block">
              <Link
                href="/project-roadmap"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Project Roadmap
              </Link>
              <Link
                href={tagSlopAccountsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Tag Slop Accounts
              </Link>
            </div>
          </details>
          <Link
            href="https://chromewebstore.google.com/detail/slopblock-zero/fghjlgmoofbfekdhldaandocejfdjoic"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 rounded-md bg-green-600 px-3.5 py-1.5 sm:px-4.5 sm:py-1.5 text-base sm:text-lg leading-none text-white hover:bg-green-700 transition-colors"
          >
            <span><strong>Install</strong></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

