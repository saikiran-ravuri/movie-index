function MovieCarousel({ children, ariaLabel = "Movie carousel" }) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  );
}

export default MovieCarousel;


