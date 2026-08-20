import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ page, totalPages, onPrevious, onNext }) {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={page === 1}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#e6dcc8] bg-white px-4 py-2 text-sm font-semibold text-[#1f2329] transition-colors hover:border-[#b8862d] hover:text-[#b8862d] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <span className="rounded-full bg-white border border-[#e6dcc8] px-4 py-2 text-xs font-semibold text-[#1f2329]">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={page === totalPages}
        className="inline-flex items-center gap-1.5 rounded-full bg-[#b8862d] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#9b6417] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;

