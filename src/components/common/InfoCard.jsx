function InfoCard({ label, value, icon }) {
  return (
    <article className="group min-h-[124px] rounded-2xl border border-[#E2D3BC] bg-white p-6 shadow-md transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#C58B2A]/40 hover:shadow-lg">
      <div className="flex h-full items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8DBC7] bg-[#F7F0E4] text-xl transition-transform duration-300 group-hover:scale-105">
          <span aria-hidden="true">{icon}</span>
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            {label}
          </p>

          <h3 className="mt-2 break-words text-base font-semibold leading-6 text-stone-900 sm:text-lg">
            {value}
          </h3>
        </div>
      </div>
    </article>
  );
}

export default InfoCard;
