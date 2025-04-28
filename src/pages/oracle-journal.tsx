// pages/oracle-journal.tsx

import { SpiralParticles } from "@/components/SpiralParticles";
import { OracleJournalForm } from "@/components/OracleJournalForm";

export default function OracleJournalPage() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <SpiralParticles />
      <div className="relative z-10 flex flex-col items-center pt-20 px-6">
        <OracleJournalForm oracleName="YourOracleNameHere" />
      </div>
    </div>
  );
}
