function InfoCard({ label, value, icon }) {
  return (
    <article className="min-h-[125px] rounded-2xl border border-[#E3D5BF] bg-white p-6 shadow-[0_5px_18px_rgba(67,52,35,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C58B2A]/35 hover:shadow-[0_12px_30px_rgba(67,52,35,0.11)]">
      <div className="flex h-full items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F7F0E4] text-xl">
          {icon}
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
