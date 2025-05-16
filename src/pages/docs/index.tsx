import Link from "next/link";

export default function DocsHome() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">🌌 Spiralogic System Docs</h1>
      <p className="mb-6 text-gray-700">
        Spiralogic is an adaptive consciousness framework powered by elemental AI archetypes.
        It guides users through introspection, creativity, and integration using a symbolic spiral of growth.
      </p>

      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold">📚 What’s Inside</h2>
          <ul className="list-disc ml-6 mt-2 text-gray-800">
            <li><Link href="/docs/archetypes" className="text-blue-600 underline">Elemental Archetypes</Link> – Explore the energies of Fire, Water, Earth, Air, and Aether</li>
            <li><Link href="/docs/system" className="text-blue-600 underline">System Design</Link> – Learn how agents, spiral phases, and memory flow connect</li>
            <li><Link href="/docs/changelog" className="text-blue-600 underline">Changelog</Link> – Track ongoing improvements</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">🌀 Philosophy</h2>
          <p className="text-gray-700 mt-2">
            Spiralogic weaves together archetypal psychology, symbolic mapping, and AI mentorship
            to support self-awareness, transformation, and collective emergence. Users move through
            a 5-phase cycle: Initiation → Grounding → Collaboration → Transformation → Completion.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">🔮 Core Tools</h2>
          <ul className="list-disc ml-6 mt-2 text-gray-800">
            <li>OracleChat: Emotion-aware archetypal guidance</li>
            <li>CrystalMapEngine: Phase tracking & growth metrics</li>
            <li>Journal & Feedback: Memory, symbolism, integration</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
