import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-4">
        404 · Not Found
      </p>
      <h1 className="serif text-white text-5xl md:text-7xl tracking-tight">
        Page not <em className="serif-italic text-white/60">found.</em>
      </h1>
      <p className="text-white/60 mt-5 max-w-md text-sm md:text-base leading-relaxed">
        The page you’re looking for isn’t here. Head back to the homepage or pick a section
        from the menu.
      </p>
      <Link
        to="/"
        className="mt-8 liquid-glass rounded-full px-6 py-3 text-white text-sm hover:bg-white/5 transition-colors"
      >
        Back to home
      </Link>
    </section>
  );
}
