import { site, isPlaceholder } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import PlaceholderBox from "../components/PlaceholderBox";
import ShirtVote from "../components/ShirtVote";

export default function Shirts() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 pb-10">
      <h1 className="font-display text-4xl sm:text-5xl text-ink">Shirts</h1>
      <p className="font-hand text-xl text-ink/80 mt-1">Pick your favorite. We'll settle it at the meeting.</p>

      <section className="mt-6">
        <DoodleWindow variant="cream" addressText="shirt-vote">
          <h2 className="font-display text-2xl text-ink mb-3">Vote on colors</h2>
          <ShirtVote />
        </DoodleWindow>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-2">
        <DoodleWindow variant="gold" addressText="design">
          <h3 className="font-display text-2xl text-ink mb-2">Design mockup</h3>
          {isPlaceholder(site.shirts.designImage) ? (
            <PlaceholderBox label={site.shirts.designImage} what="shirt design image" aspect="1/1" />
          ) : (
            <img src={site.shirts.designImage} alt="Shirt design" className="w-full rounded-xl border-[2.5px] border-ink doodle-shadow-sm" />
          )}
        </DoodleWindow>
        <DoodleWindow variant="mint" addressText="winner">
          <h3 className="font-display text-2xl text-ink mb-2">Winner</h3>
          {isPlaceholder(site.shirts.winner) ? (
            <PlaceholderBox label={site.shirts.winner} what="winning color (post after the vote)" />
          ) : (
            <p className="font-hand text-ink text-xl">And the winner is: {site.shirts.winner}</p>
          )}
        </DoodleWindow>
      </section>
    </div>
  );
}
