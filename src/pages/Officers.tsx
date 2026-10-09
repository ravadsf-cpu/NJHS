import { site } from "../data/site";
import OfficerFlipCard from "../components/OfficerFlipCard";

export default function Officers() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-10">
      <div className="mb-6">
        <h1 className="font-display text-4xl sm:text-5xl text-ink">Meet your officers</h1>
        <p className="font-hand text-xl text-ink/80 mt-1">Tap a card to flip it.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.officers.map((o) => (
          <OfficerFlipCard key={o.name} officer={o} />
        ))}
      </div>
    </div>
  );
}
