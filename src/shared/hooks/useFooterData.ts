import { useQuery } from '@tanstack/react-query';
import { getFooterData } from '@/shared/api/getFooterData';
import type { FooterData } from '@/shared/types/footer';

export function useFooterData() {
  return useQuery<FooterData | null>({
    queryKey: ['footerData'],
    queryFn: getFooterData,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
}
