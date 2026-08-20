import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f8f4ec] px-6 py-12">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold text-[#b8862d]">
          404 Error
        </p>

        <h1 className="mt-2 font-['Cormorant_Garamond'] text-4xl font-bold text-[#1f2329] sm:text-5xl">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm text-stone-600">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#b8862d] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9b6417]"
        >
          <Compass size={16} aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;

