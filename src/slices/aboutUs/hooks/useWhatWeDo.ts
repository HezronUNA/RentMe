import { useEffect, useRef } from "react";
import type { AboutSection } from "../sections/whatWeDo/type";
import { Star, Home, ShieldCheck, CheckCircle2, BarChart3 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWhatWeDo, getWhatWeDoRealtime } from "../api/getWhatWeDo";

export const aboutSectionsKey = ["aboutSections"] as const;

export const useWhatWeDo = () => {
  const queryClient = useQueryClient();
  const unsubRef = useRef<(() => void) | undefined>(undefined);

  const query = useQuery<AboutSection[]>({
    queryKey: aboutSectionsKey,
    queryFn: getWhatWeDo,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 60, // 1 hora
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    // Suscripción a cambios en tiempo real
    unsubRef.current = getWhatWeDoRealtime(
      (newSections) => {
        queryClient.setQueryData(aboutSectionsKey, newSections);
      },
      (error) => {
        console.error("Error en la suscripción de about sections:", error);
      }
    );

    return () => {
      unsubRef.current?.();
    };
  }, [queryClient]);

  const items = query.data ?? [];

  const processItems = (items: AboutSection[]) => {
    if (!items.length) return { header: null as AboutSection | null, cards: [] as AboutSection[] };

    // 1) Buscar header por título que contenga "quiénes"
    const idxHeader = items.findIndex((x) =>
      x.title.toLocaleLowerCase().includes("quiénes")
    );

    // 2) Fallback: usar el primer documento como header
    const headerIdx = idxHeader >= 0 ? idxHeader : 0;

    const header = items[headerIdx];
    const cards = items.filter((_, i) => i !== headerIdx);

    return { header, cards };
  };

  const { header, cards } = processItems(items);

  const icons = [Star, Home, ShieldCheck, CheckCircle2, BarChart3];

  const setupCarousel = (carouselRef: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;
  
      let currentIndex = 0;
      
      const scroll = () => {
        if (!carousel) return;
        
        currentIndex = (currentIndex + 1) % cards.length;
        const cardWidth = carousel.offsetWidth * 0.85;
        const scrollPosition = (cardWidth + 16) * currentIndex;
  
        carousel.scrollTo({
          left: scrollPosition,
          behavior: "smooth"
        });
      };
  
      // Autoplay cada 5 segundos
      const interval = setInterval(scroll, 5000);
  
      return () => clearInterval(interval);
    }, [cards.length]);
  };

  return {
    loading: query.isLoading && !query.data,
    header,
    cards,
    icons,
    setupCarousel,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  };
};
