import type { Review } from "../type";

export default function ReviewDesktop({ review }: { review: Review }) {
  return (
    <div className="px-10 py-10 w-full">
      <div className="flex flex-row items-start gap-8">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden bg-green-200 grid place-items-center text-green-900 font-bold text-3xl shrink-0">
          {getInitials(review.nombreHuesped)}
        </div>

        {/* Contenido */}
        <div className="flex-1 text-left">
          <div className="text-2xl font-title font-semibold text-green-900 mb-2">
            {review.nombreHuesped}
          </div>
          <p className="text-neutral-800 font-body text-lg mb-4">
            {review.mensaje}
          </p>
          <div className="flex gap-1.5 justify-start">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                width="22" height="22" viewBox="0 0 24 24"
                fill={i < review.calificacion ? '#FFD700' : '#E5E7EB'}
                aria-hidden="true"
              >
                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}
