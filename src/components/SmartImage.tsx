import { useState, type ReactNode, type SyntheticEvent } from "react";
import { clsx } from "../lib/clsx";

type Props = {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  fallback: ReactNode;
};

// An <img> that swaps in a nice fallback if the file isn't there yet.
// Checks both onError and the "loaded with zero size" case (which happens when
// the dev server returns an SPA fallback HTML page for a missing file).
export default function SmartImage({ src, alt, className, objectPosition, fallback }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.naturalWidth || !img.naturalHeight) {
      setFailed(true);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      onLoad={handleLoad}
      style={objectPosition ? { objectPosition } : undefined}
      className={clsx("w-full h-full object-cover", className)}
    />
  );
}
