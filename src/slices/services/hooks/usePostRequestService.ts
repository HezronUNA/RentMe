import { useMutation } from "@tanstack/react-query";
import { postReservaServicio } from "@/slices/services/api/postRequestService";
import type { ReservaServicio } from "../sections/serviceDetail/type";

export function usePostReservaServicio() {
  return useMutation({
    mutationFn: (data: ReservaServicio) => postReservaServicio(data),
  });
}