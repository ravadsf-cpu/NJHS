import { useState } from "react";
import { meetings } from "../data/meetings";
import MeetingCard from "../components/MeetingCard";
import DoodleWindow from "../components/DoodleWindow";
import { FolderDoodle } from "../components/Doodles";

export default function MeetingMinutes() {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const current = meetings.filter((m) => m.year === "2026-27");
  const archive = meetings.filter((m) => m.year === "2025-26");

  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 pb-10">
      <h1 className="font-display text-4xl sm:text-5xl text-ink">Meeting minutes</h1>
      <p className="font-hand text-xl text-ink/80 mt-1">
        What we talked about and the slides. Newest first.
      </p>

      <section className="mt-6">
        <h2 className="font-display text-2xl text-ink mb-3">2026 to 2027</h2>
        <div className="grid gap-4">
          {current.map((m, i) => <MeetingCard key={m.date} m={m} index={i} />)}
        </div>
      </section>

      <section className="mt-10">
        <button
          type="button"
          onClick={() => setArchiveOpen((o) => !o)}
          aria-expanded={archiveOpen}
          className="press w-full text-left"
        >
          <DoodleWindow variant="mint" addressText="archive/2025-26">
            <div className="flex items-center gap-3">
              <FolderDoodle className="w-14 h-10 shrink-0" />
              <div className="flex-1">
                <div className="font-display text-2xl text-ink">2025 to 2026 archive</div>
                <div className="font-hand text-ink/70 text-sm">
                  {archiveOpen ? "Click to close" : `${archive.length} meetings. Click to open.`}
                </div>
              </div>
              <div aria-hidden className="font-hand text-2xl text-ink/70">{archiveOpen ? "−" : "+"}</div>
            </div>
          </DoodleWindow>
        </button>
        {archiveOpen && (
          <div className="mt-4 grid gap-4">
            {archive.map((m, i) => <MeetingCard key={m.date} m={m} index={i} />)}
          </div>
        )}
      </section>
    </div>
  );
}
