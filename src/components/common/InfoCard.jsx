function InfoCard({ label, value, icon }) {
  return (
    <article className="group min-h-[124px] rounded-2xl border border-[#E2D3BC] bg-white p-6 shadow-[0_6px_18px_rgba(67,52,35,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C58B2A]/40 hover:shadow-[0_12px_28px_rgba(67,52,35,0.10)]">
      <div className="flex h-full items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8DBC7] bg-[#F7F0E4] text-[#B8862D] transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
            {label}
          </p>

          <h3 className="mt-2 break-words text-base font-semibold leading-6 text-[#1F2329] sm:text-lg">
            {value}
          </h3>
        </div>
      </div>
    </article>
  );
}

export default InfoCard;
