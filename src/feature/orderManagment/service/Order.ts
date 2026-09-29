import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../service/pages/api";
import type { Order, OrderStatus } from "../types/TableType";
interface ProductDetailsResponse {
  success: boolean;
  data: Order;
}

const OrderService = () => {
  const queryClient = useQueryClient();
  const { isPending, data } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await api.get("/admin/orders");
      return await res.data.data;
    },
  });
  const useProductDetails = (orderId: string) => {
    return useQuery({
      queryKey: ["productDetails", orderId],
      queryFn: async () => {
        const res = await api.get<ProductDetailsResponse>(
          `/admin/orders/${orderId}`,
        );
        return res.data;
      },
      enabled: !!orderId, // orderId bo'lmasa so'rov yubormaydi
    });
  };
  const useUpdateOrderStatus = () => {
    return useMutation({
      mutationFn: async ({
        orderId,
        status,
        comment,
      }: {
        orderId: string;
        status: OrderStatus;
        comment?: string;
      }) => {
        const res = await api.patch(`/admin/orders/${orderId}/status`, {
          status,
          comment: comment ?? "",
        });

        return res.data;
      },

      onSuccess: (_data, variables) => {
        // Orders tableni yangilash
        queryClient.invalidateQueries({
          queryKey: ["order"],
        });

        // Tanlangan order detailni yangilash
        queryClient.invalidateQueries({
          queryKey: ["productDetails", variables.orderId],
        });
      },
    });
  };
  return {
    isPending,
    data,
    useProductDetails,
    useUpdateOrderStatus,
  };
};
export default OrderService;
