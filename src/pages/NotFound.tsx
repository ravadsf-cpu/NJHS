import { Link } from "react-router-dom";
import DoodleWindow from "../components/DoodleWindow";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 pt-16 pb-10">
      <DoodleWindow variant="coral" addressText="404.html">
        <h1 className="font-display text-5xl text-ink">404</h1>
        <p className="font-hand text-xl text-ink/80 mt-2">
          This page doesn't exist. Maybe a typo?
        </p>
        <Link to="/" className="btn-doodle mt-4 press inline-flex">
          Back home
        </Link>
      </DoodleWindow>
    </div>
  );
}
