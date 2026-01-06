import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Development Column */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-black">Development</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/bfinan/slopblock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Source Code
                </Link>
              </li>
            </ul>
          </div>

          {/* Find Us On Column */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-black">Find Us On</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://twitter.com/SlopblockZero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8">
          <p className="text-sm text-gray-500">All text on this site was written by a human.</p>
        </div>
      </div>
    </footer>
  );
}

