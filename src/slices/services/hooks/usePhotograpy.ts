import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { useEffect } from 'react'
import type { PhotographyService } from '../sections/photograpyService/type'
import { getPhotographyServiceById, getPhotographyServices, onPhotographyServiceSnapshot } from '../api/getPhotograpyService'


export function usePhotographyServices(options?: UseQueryOptions<PhotographyService[], Error>) {
  return useQuery<PhotographyService[], Error>({
    queryKey: ['fotografia', 'list'],
    queryFn: getPhotographyServices,
    ...(options || {})
  })
}

type UsePhotographyServiceOptions = UseQueryOptions<PhotographyService | null, Error> & { realtime?: boolean }

export function usePhotographyService(id?: string | null, options?: UsePhotographyServiceOptions) {
  const queryClient = useQueryClient()
  const realtime = options?.realtime ?? false

  const sanitizedOptions = { ...(options || {}) } as UseQueryOptions<PhotographyService | null, Error>
  // remove custom prop so react-query doesn't complain
  ;(sanitizedOptions as any).realtime = undefined
  // ensure user-provided queryKey doesn't trigger a duplicate-property error
  ;(sanitizedOptions as any).queryKey = undefined

  const queryKey = ['fotografia', id ?? 'null']

  const query = useQuery<PhotographyService | null, Error>({
    queryKey,
    queryFn: async () => {
      if (!id) return null
      return getPhotographyServiceById(id)
    },
    ...(sanitizedOptions as any || {})
  })

  useEffect(() => {
    if (!realtime || !id) return
    const unsub = onPhotographyServiceSnapshot(id, (data) => {
      queryClient.setQueryData(queryKey, data)
    })
    return () => unsub()
  }, [realtime, id, queryClient])

  return query
}