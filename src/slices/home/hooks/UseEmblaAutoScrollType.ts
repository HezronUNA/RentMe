// src/shared/hooks/useEmblaAutoScroll.ts
import { useCallback, useEffect } from 'react'
import type { EmblaOptionsType } from 'embla-carousel' 
import useEmblaCarousel from 'node_modules/embla-carousel-react/esm/components/useEmblaCarousel'

// Define the AutoScrollOptionsType if not imported from elsewhere
type AutoScrollOptionsType = {
  speed?: number
  startDelay?: number
  stopOnInteraction?: boolean
  stopOnMouseEnter?: boolean
  restartDelay?: number
}

type UseEmblaAutoScrollType = {
  options?: EmblaOptionsType
  autoScrollOptions?: AutoScrollOptionsType
}

export const useEmblaAutoScroll = ({ 
  options = {}, 
}: UseEmblaAutoScrollType = {}) => {
  
  const defaultOptions: EmblaOptionsType = {
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: true,
    ...options
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    defaultOptions,
    []
  )

  const stopAutoScroll = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return
    autoScroll.stop()
  }, [emblaApi])

  const startAutoScroll = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return
    autoScroll.play()
  }, [emblaApi])

  const onMouseEnter = useCallback(() => {
    stopAutoScroll()
  }, [stopAutoScroll])

  const onMouseLeave = useCallback(() => {
    startAutoScroll()
  }, [startAutoScroll])

  useEffect(() => {
    if (!emblaApi) return
    
    // Iniciar auto-scroll cuando el carousel esté listo
    const autoScroll = emblaApi.plugins()?.autoScroll
    if (autoScroll) {
      autoScroll.play()
    }
  }, [emblaApi])

  return {
    emblaRef,
    emblaApi,
    stopAutoScroll,
    startAutoScroll,
    onMouseEnter,
    onMouseLeave
  }
}
