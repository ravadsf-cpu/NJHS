import { Children, useState, type ReactNode } from "react";

// Shows the first `initial` items, then a "Show more" button.
// Mobile-only trimming: on desktop (>= md) all items render.

export default function ShowMoreList({
  initial = 3,
  moreLabel = "Show more",
  lessLabel = "Show less",
  children,
}: {
  initial?: number;
  moreLabel?: string;
  lessLabel?: string;
  children: ReactNode;
}) {
  const items = Children.toArray(children);
  const [expanded, setExpanded] = useState(false);
  const needsTrim = items.length > initial;
  const trimmed = !expanded && needsTrim;

  return (
    <>
      {/* MOBILE */}
      <div className="md:hidden flex flex-col gap-3">
        {(trimmed ? items.slice(0, initial) : items).map((child, i) => (
          <div key={i}>{child}</div>
        ))}
        {needsTrim && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="press btn-doodle self-center mt-1"
            aria-expanded={expanded}
          >
            {expanded ? lessLabel : `${moreLabel} (${items.length - initial})`}
          </button>
        )}
      </div>
      {/* DESKTOP: no trimming. */}
      <div className="hidden md:flex md:flex-col md:gap-5">
        {items.map((child, i) => <div key={i}>{child}</div>)}
      </div>
    </>
  );
}
