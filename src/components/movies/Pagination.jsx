import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ page, totalPages, onPrevious, onNext }) {
  return (
    <div className="mt-12 flex items-center justify-center gap-6">
      <button
        type="button"
        onClick={onPrevious}
        disabled={page === 1}
        className="inline-flex items-center gap-2 rounded-full border border-[#D9C9AE] bg-white px-5 py-2.5 text-sm font-semibold text-[#1F2329] transition hover:border-[#B8862D] hover:text-[#9B6417] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <span className="rounded-full bg-[#F3EBDE] px-5 py-2 text-sm font-semibold text-[#1F2329]">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={page === totalPages}
        className="inline-flex items-center gap-2 rounded-full bg-[#B8862D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9F7225] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default Pagination;
