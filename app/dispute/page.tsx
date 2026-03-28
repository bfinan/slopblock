import Link from "next/link";

type DisputePageProps = {
  searchParams: Promise<{ comment?: string | string[] }>;
};

export default async function Dispute({ searchParams }: DisputePageProps) {
  const params = await searchParams;
  const raw = params.comment;
  const intendedUrl =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
          Dispute a Page Tagged as AI Slop
        </h1>
        <p className="mb-8 text-base leading-7 text-gray-700 sm:text-lg">
          Was a page incorrectly tagged as an AI Slop Account?
        </p>
        <p>
          Currently, disputes are resolved manually by the Slopblock Zero team. Please email <Link href="mailto:teamslopblock@proton.me" className="text-blue-600 underline hover:text-blue-800">teamslopblock@proton.me</Link> with the details of the page in question.
        </p>
        {intendedUrl ? (
          <p className="text-base leading-7 text-gray-700 sm:text-lg">
            <span className="font-medium text-gray-900">Page you were trying to open: </span>
            <span className="break-all font-mono text-sm text-gray-800 sm:text-base">{intendedUrl}</span>
          </p>
        ) : null}
      </main>
    </div>
  );
}
