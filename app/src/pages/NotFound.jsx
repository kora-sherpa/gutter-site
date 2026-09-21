import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 pb-20 pt-40 text-center">
      <h1 className="text-[36px] font-bold">Page not yet migrated</h1>
      <p className="mt-4 text-muted">
        This route isn't wired up in the new React app yet. It may still exist on the legacy static site.
      </p>
      <Link to="/" className="mt-8 inline-block font-bold text-orange-dark">
        Back to Home
      </Link>
    </main>
  );
}
