import { useState } from "react";

// Takes split ID + domain so the raw HTML never contains a complete email.
// The browser stitches it together only when the component renders.

type Props = { user: string; domain: string; name: string };

export default function OfficerEmail({ user, domain, name }: Props) {
  const [copied, setCopied] = useState(false);
  const email = `${user}@${domain}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <a
        href={`mailto:${email}`}
        aria-label={`Email ${name}`}
        className="press inline-flex items-center gap-1 font-hand text-ink text-base bg-paper ink-line rounded-md px-2 py-0.5 doodle-shadow-sm"
      >
        <span aria-hidden>✉</span>
        <span>{email}</span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${name}'s email`}
        className="press font-hand text-sm bg-cream ink-line rounded-md px-2 py-0.5 doodle-shadow-sm"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
