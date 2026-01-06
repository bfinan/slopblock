import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-4 sm:px-6">
        {/* Left side: Logo and Title */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo256transparent.png"
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
          <Link
            href="/project"
            className="hidden sm:block text-base text-gray-700 hover:text-gray-900 transition-colors"
          >
            Project
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfbDHClcrB1bjsGmc2aJJiL6oghCx_k0kN8ZzRPfZ8F8UyGWQ/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 rounded-md bg-blue-600 px-3 py-1 sm:px-4 text-sm sm:text-base leading-normal text-white hover:bg-blue-700 transition-colors"
          >
            <Image
              src="/c-hair-w.svg"
              alt=""
              width={20}
              height={20}
              className="h-4 w-4 sm:h-5 sm:w-5"
              unoptimized
            />
            <span className="hidden sm:inline">Tag Slop Accounts</span>
            <span className="sm:hidden">Tag</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

