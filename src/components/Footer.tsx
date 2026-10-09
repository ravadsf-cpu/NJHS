import { Link } from "react-router-dom";
import { site } from "../data/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/news", label: "News" },
  { to: "/events", label: "Events" },
  { to: "/officers", label: "Officers" },
  { to: "/shirts", label: "Shirts" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t-[2.5px] border-ink bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="font-hand text-ink text-lg">{site.footer.tagline}</div>
        <nav className="flex flex-wrap gap-x-3 gap-y-1 sm:ml-auto">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="press font-hand text-ink/80 hover:text-ink text-base underline decoration-dotted underline-offset-2"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
