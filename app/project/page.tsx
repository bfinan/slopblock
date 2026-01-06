import Link from "next/link";

export default function Project() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">Project</h1>
        <p className="mb-6 text-base leading-7 text-gray-700 sm:text-lg">Initial development of this project is part of the <Link href="https://kleros.io/fellowship/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">9th Kleros Fellowship of Justice</Link>, which takes place from now until June 15. </p>
        <p className="mb-6 text-base leading-7 text-gray-700 sm:text-lg">This page will be updated later this January with a more detailed explanation of the project plan.</p>
        <p className="mb-6 text-base leading-7 text-gray-700 sm:text-lg">
          For now, you can read the complete{" "}
          <Link
            href="https://docs.google.com/document/d/1fwKC_P2cv28VKaOwNOHYWpIFeQW8dGt6JDrcpt4CQRA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Project Proposal here
          </Link>
          .
        </p>
        <p className="mb-6 text-base leading-7 text-gray-700 sm:text-lg">Please bug me in real life so that I keep working on the features.</p>
      </main>
    </div>
  );
}

