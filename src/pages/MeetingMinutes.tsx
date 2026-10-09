import { useState } from "react";
import { meetings, type Meeting } from "../data/meetings";
import MeetingCard from "../components/MeetingCard";
import DoodleWindow from "../components/DoodleWindow";
import { FolderDoodle } from "../components/Doodles";
import { clsx } from "../lib/clsx";

function CompactRow({ m }: { m: Meeting }) {
  const [open, setOpen] = useState(false);
  const slidesHref = m.slidesLocal || m.slidesUrl || "";
  const preview = m.recap.length > 90 ? `${m.recap.slice(0, 90)}…` : m.recap;
  return (
    <li className="bg-paper ink-line rounded-xl doodle-shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="press w-full text-left p-3 flex items-start gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="font-hand text-ink/80 text-xs">{m.display}</div>
          <div className="font-body text-ink text-sm leading-snug mt-0.5">{open ? m.recap : preview}</div>
        </div>
        <span aria-hidden className={clsx("inline-flex items-center justify-center w-7 h-7 bg-paper ink-line rounded-full font-hand text-base transition-transform shrink-0", open && "rotate-180")}>⌃</span>
      </button>
      {open && slidesHref && (
        <div className="px-3 pb-3">
          <a
            href={slidesHref}
            target={slidesHref.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="btn-doodle btn-gold press inline-flex"
          >
            View slides →
          </a>
        </div>
      )}
    </li>
  );
}

export default function MeetingMinutes() {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const current = meetings.filter((m) => m.year === "2026-27");
  const archive = meetings.filter((m) => m.year === "2025-26");

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6 md:pt-8 pb-10">
      <h1 className="font-display text-ink">Meeting minutes</h1>
      <p className="font-hand text-ink/80 mt-1" style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>
        What we talked about and the slides. Newest first.
      </p>

      <section className="mt-5 md:mt-6">
        <h2 className="font-display text-ink mb-3">2026 to 2027</h2>
        {/* MOBILE */}
        <ul className="md:hidden space-y-2">
          {current.map((m) => <CompactRow key={m.date} m={m} />)}
        </ul>
        {/* DESKTOP */}
        <div className="hidden md:grid gap-4">
          {current.map((m, i) => <MeetingCard key={m.date} m={m} index={i} />)}
        </div>
      </section>

      <section className="mt-8 md:mt-10">
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
                <div className="font-display text-ink">2025 to 2026 archive</div>
                <div className="font-hand text-ink/70 text-sm">
                  {archiveOpen ? "Tap to close" : `${archive.length} meetings. Tap to open.`}
                </div>
              </div>
              <div aria-hidden className="font-hand text-2xl text-ink/70">{archiveOpen ? "−" : "+"}</div>
            </div>
          </DoodleWindow>
        </button>
        {archiveOpen && (
          <>
            {/* MOBILE */}
            <ul className="md:hidden mt-4 space-y-2">
              {archive.map((m) => <CompactRow key={m.date} m={m} />)}
            </ul>
            {/* DESKTOP */}
            <div className="hidden md:grid mt-4 gap-4">
              {archive.map((m, i) => <MeetingCard key={m.date} m={m} index={i} />)}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
