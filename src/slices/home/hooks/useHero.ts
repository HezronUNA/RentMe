import { useEffect, useState } from 'react'
import type { HeroItem } from '../sections/hero/type'
import { getHeroItems } from '../api/getHero'

export function useHero() {
  const [items, setItems] = useState<HeroItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getHeroItems()
      .then(setItems)
      .catch(() => setError('No se pudo cargar el contenido'))
      .finally(() => setLoading(false))
  }, [])

  return { items, loading, error }
}
