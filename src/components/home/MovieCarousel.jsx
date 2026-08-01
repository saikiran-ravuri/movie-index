import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function MovieCarousel({ children, ariaLabel = "Movie carousel" }) {
  const carouselRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateScrollButtons() {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    const tolerance = 2;

    setCanScrollLeft(scrollLeft > tolerance);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - tolerance);
  }

  function scrollCarousel(direction) {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const scrollDistance = Math.max(carousel.clientWidth * 0.8, 320);

    carousel.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return undefined;
    }

    updateScrollButtons();

    carousel.addEventListener("scroll", updateScrollButtons, {
      passive: true,
    });

    window.addEventListener("resize", updateScrollButtons);

    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(carousel);

    return () => {
      carousel.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div className="group relative">
      {canScrollLeft && (
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel} left`}
          onClick={() => scrollCarousel("left")}
          className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E3D7C4] bg-[#FFFDF8]/95 text-[#1F2329] shadow-[0_8px_22px_rgba(67,52,35,0.16)] backdrop-blur-sm transition-all duration-300 hover:border-[#B8862D] hover:bg-[#B8862D] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#B8862D]/20 md:h-11 md:w-11 md:opacity-0 md:group-hover:opacity-100"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div
        ref={carouselRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {canScrollRight && (
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel} right`}
          onClick={() => scrollCarousel("right")}
          className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E3D7C4] bg-[#FFFDF8]/95 text-[#1F2329] shadow-[0_8px_22px_rgba(67,52,35,0.16)] backdrop-blur-sm transition-all duration-300 hover:border-[#B8862D] hover:bg-[#B8862D] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#B8862D]/20 md:h-11 md:w-11 md:opacity-0 md:group-hover:opacity-100"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

export default MovieCarousel;
