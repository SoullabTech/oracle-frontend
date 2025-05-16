import { useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function JournalForm({ element }: { element: string }) {
  const [entry, setEntry] = useState("");

  async function submitEntry() {
    const { data, error } = await supabase.from("journal_entries").insert({
      content: entry,
      element,
      created_at: new Date(),
    });
    if (!error) setEntry(""); // Clear on success
  }

  return (
    <div>
      <textarea value={entry} onChange={(e) => setEntry(e.target.value)} />
      <button onClick={submitEntry}>Save Entry</button>
    </div>
  );
}
