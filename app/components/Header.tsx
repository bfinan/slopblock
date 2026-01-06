import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left side: Logo and Title */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo256transparent.png"
            alt="Slopblock Zero Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-2xl">
            <span className="font-bold">Slopblock</span>
            <span className="font-normal"> Zero</span>
          </span>
        </Link>

        {/* Right side: Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-base text-gray-700 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
          <Link
            href="/project"
            className="text-base text-gray-700 hover:text-gray-900 transition-colors"
          >
            Project
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfbDHClcrB1bjsGmc2aJJiL6oghCx_k0kN8ZzRPfZ8F8UyGWQ/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-1 text-base leading-normal text-white hover:bg-blue-700 transition-colors"
          >
            <Image
              src="/c-hair-w.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
            />
            Tag Slop Accounts
          </Link>
        </nav>
      </div>
    </header>
  );
}

