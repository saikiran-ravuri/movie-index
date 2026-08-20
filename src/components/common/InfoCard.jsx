function InfoCard({ label, value, icon }) {
  return (
    <article className="rounded-xl border border-[#e6dcc8] bg-white p-5 transition-colors hover:border-[#b8862d]">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e6dcc8] bg-[#f8f4ec] text-[#b8862d]">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            {label}
          </p>

          <h3 className="mt-1 break-words text-sm font-semibold text-[#1f2329] sm:text-base">
            {value}
          </h3>
        </div>
      </div>
    </article>
  );
}

export default InfoCard;


