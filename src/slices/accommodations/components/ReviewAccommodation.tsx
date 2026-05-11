


import { useEffect, useRef, useState } from "react";
import { H2, P } from "@/components/ui/Typography";
// Reutiliza los componentes de la sección de reviews del Home para mantener diseño (rutas con alias @)
import ReviewDesktop from "@/components/home/ReviewDesktop";
import ReviewMobile from "@/components/home/ReviewMobile";
import { STATIC_REVIEWS } from "@/components/home/Reviews";
import type { Review } from "@/types/Reviews";

type Props = {
	title?: string;
	hospedajeId?: string | null;
	limit?: number;
	className?: string;
};

function EmptyCard() {
	return (
		<div className="min-w-full max-w-full flex-shrink-0 p-4">
			{/* Versión móvil */}
			<div className="md:hidden mx-auto w-full max-w-[760px] bg-white rounded-2xl p-6 text-neutral-600 text-sm text-center shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-gray-100">
				Aún no hay reseñas para mostrar.
			</div>

			{/* Versión desktop */}
			<div className="hidden md:block mx-auto w-full max-w-[760px] bg-white rounded-2xl p-10 text-neutral-600 text-sm text-center">
				Aún no hay reseñas para mostrar.
			</div>
		</div>
	);
}

export default function ReviewAccommodation({
	title = "Reseñas del alojamiento",
	hospedajeId = null,
	limit,
	className = "",
}: Props) {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Filtrar reseñas por hospedajeId si se proporciona
	let filteredReviews = STATIC_REVIEWS;
	if (hospedajeId !== null) {
		filteredReviews = STATIC_REVIEWS.filter(r => r.hospedajeId === hospedajeId);
	}

	// Aplicar límite si se especifica
	const originalItems = limit ? filteredReviews.slice(0, limit) : filteredReviews;
	const count = originalItems.length;
	const canNav = count > 1;

	// Create array with cloned elements for infinite effect
	const items = canNav
		? [originalItems[count - 1], ...originalItems, originalItems[0]]
		: originalItems;

	const moveToSlide = (index: number, smooth = true) => {
		if (!canNav) return;
		setIsTransitioning(smooth);
		setCurrentIndex(index);
	};

	const handleTransitionEnd = () => {
		setIsTransitioning(false);
		if (currentIndex >= count + 1) {
			moveToSlide(1, false);
		} else if (currentIndex === 0) {
			moveToSlide(count, false);
		}
	};

	const nextSlide = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		moveToSlide(currentIndex + 1);
	};

	const prevSlide = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		moveToSlide(currentIndex - 1);
	};

	// Touch handling
	const startX = useRef<number | null>(null);
	const onTouchStart = (e: React.TouchEvent) => {
		startX.current = e.touches[0].clientX;
	};

	const onTouchEnd = (e: React.TouchEvent) => {
		if (startX.current == null) return;
		const dx = e.changedTouches[0].clientX - startX.current;
		if (Math.abs(dx) > 30 && canNav) {
			if (dx < 0) nextSlide();
			else prevSlide();
		}
		startX.current = null;
	};

	// Cleanup
	useEffect(() => {
		const timeout = timeoutRef.current;
		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, []);

	return (
		<section className={`relative w-full overflow-hidden px-4 py-16 md:px-8 md:py-24 ${className}`}>
			<div className="absolute inset-0 bg-white" />
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-[-10rem] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/55 blur-3xl" />
				<div className="absolute right-[-8rem] top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/65 blur-3xl" />
				<div className="absolute left-1/2 top-[58%] h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#52655B]/10" />
				<div className="absolute left-1/2 top-[58%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#52655B]/10" />
			</div>

			<div className="relative z-10 mx-auto w-full text-center flex flex-col items-center justify-center gap-8">
				<div className="flex flex-col items-center justify-center gap-3">
					<span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
						Experiencias Verificadas
					</span>
					<H2 className="text-3xl sm:text-4xl">
						{title}
					</H2>
					<P className="text-base text-gray-600 max-w-2xl">
						Descubre lo que nuestros huéspedes dicen de sus experiencias en nuestras propiedades
					</P>
				</div>

				<div className="w-full max-w-[1020px] relative mx-auto">
					<div className="relative pb-10">
						<div className="w-full h-auto relative rounded-[2rem] overflow-hidden flex items-center justify-center">
							<div className="w-full h-full flex items-center justify-center overflow-hidden">
								<div
									className="flex w-full h-auto touch-pan-y min-h-[400px] md:h-full"
									style={{
										transform: `translateX(-${currentIndex * 100}%)`,
										transition: isTransitioning
											? "transform 500ms ease-in-out"
											: "none",
									}}
									onTouchStart={onTouchStart}
									onTouchEnd={onTouchEnd}
									onTransitionEnd={handleTransitionEnd}
								>
									{count === 0 ? (
										<EmptyCard />
									) : (
										items.map((r: Review, idx) => (
											<div
												key={`${r.id}-${idx}`}
												className="min-w-full max-w-full flex-shrink-0 flex items-center justify-center p-4"
											>
												<div className="md:hidden p-6 bg-white/85 rounded-[2rem] flex flex-col justify-center items-center w-full max-w-[640px] shadow-[0_20px_50px_rgba(82,101,91,0.10)] border border-[#52655B]/20 backdrop-blur-sm">
													<ReviewMobile review={r} />
												</div>

												<div className="hidden md:flex p-8 bg-white/85 rounded-[2rem] flex-col justify-center items-center w-full max-w-[640px] shadow-[0_20px_50px_rgba(82,101,91,0.10)] border border-[#52655B]/20 backdrop-blur-sm">
													<ReviewDesktop review={r} />
												</div>
											</div>
										))
									)}
								</div>
							</div>
						</div>

						{canNav && (
							<div className="md:hidden absolute bottom-0 left-0 right-0 flex justify-center gap-2 py-2">
								<div className="flex items-center gap-1.5">
									{[...Array(5)].map((_, idx) => {
										const position = ((currentIndex - 1) % count + count) % count;
										let isActive = false;

										if (count <= 5) {
											isActive = idx === position;
										} else {
											const relativePosition = position % 5;
											isActive = idx === relativePosition;
										}

										return (
											<div
												key={idx}
												className={`w-2 h-2 rounded-full transition-colors ${
													isActive ? "bg-green-600" : "bg-gray-300"
												} shadow-sm`}
											/>
										);
									})}
								</div>
							</div>
						)}

						{canNav && (
							<>
								<button
									aria-label="Anterior"
									className="hidden md:grid absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white hover:scale-105 transition-all shadow-md border border-white hover:cursor-pointer"
									onClick={prevSlide}
								>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
										<path
											d="M14.5 7L9.5 12L14.5 17"
											stroke="#666"
											strokeWidth="2.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
								<button
									aria-label="Siguiente"
									className="hidden md:grid absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white hover:scale-105 transition-all shadow-md border border-white hover:cursor-pointer"
									onClick={nextSlide}
								>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
										<path
											d="M9.5 7L14.5 12L9.5 17"
											stroke="#666"
											strokeWidth="2.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

