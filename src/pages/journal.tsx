import JournalEntryForm from "@/components/JournalEntryForm";
import Layout from "@/components/Layout"; // Optional: use if your layout includes header/footer
import Head from "next/head";

export default function JournalPage() {
  return (
    <>
      <Head>
        <title>Spiral Journal</title>
      </Head>
      <Layout>
        <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">🌀 Soul Journal Entry</h1>
          <JournalEntryForm />
        </main>
      </Layout>
    </>
  );
}
