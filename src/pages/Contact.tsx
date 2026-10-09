import { site, isPlaceholder } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import PlaceholderBox from "../components/PlaceholderBox";
import { EnvelopeDoodle } from "../components/Doodles";

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 pb-10">
      <h1 className="font-display text-4xl sm:text-5xl text-ink">Questions?</h1>
      <p className="font-hand text-xl text-ink/80 mt-1">{site.contact.note}</p>

      <section className="mt-6 grid gap-5 md:grid-cols-2">
        <DoodleWindow variant="cream" addressText="sponsor">
          <div className="flex items-start gap-3">
            <EnvelopeDoodle className="w-16 h-12 shrink-0" />
            <div className="flex-1">
              <h3 className="font-display text-2xl text-ink">Sponsor</h3>
              {isPlaceholder(site.contact.sponsorName) ? (
                <PlaceholderBox label={site.contact.sponsorName} what="sponsor's name" />
              ) : (
                <p className="font-body text-ink mt-1">{site.contact.sponsorName}</p>
              )}
              <div className="mt-2">
                {isPlaceholder(site.contact.sponsorEmail) ? (
                  <PlaceholderBox label={site.contact.sponsorEmail} what="sponsor's email" />
                ) : (
                  <a className="btn-doodle btn-gold press inline-flex" href={`mailto:${site.contact.sponsorEmail}`}>
                    Email the sponsor
                  </a>
                )}
              </div>
            </div>
          </div>
        </DoodleWindow>

        <DoodleWindow variant="mint" addressText="form">
          <h3 className="font-display text-2xl text-ink">Send us a message</h3>
          <p className="font-body text-ink/80 mt-1">
            Drop your question in the form. An officer will get back to you.
          </p>
          <div className="mt-3">
            {isPlaceholder(site.contact.questionsFormLink) ? (
              <PlaceholderBox label={site.contact.questionsFormLink} what="Google Form URL" />
            ) : (
              <a className="btn-doodle btn-coral press inline-flex" href={site.contact.questionsFormLink} target="_blank" rel="noreferrer">
                Open the form →
              </a>
            )}
          </div>
          <p className="font-body text-ink/70 text-xs mt-3">
            Heads up: we don't post student emails here. Those contain student ID numbers, so they stay off the public site.
          </p>
        </DoodleWindow>
      </section>
    </div>
  );
}
