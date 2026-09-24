import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../../service/pages/api";

import type {
  BrandDetailsResponse,
  BrandsResponse,
  CreateBrandInput,
  UpdateBrandInput,
} from "../types/BrandTypes";

const BrandService = () => {
  const queryClient = useQueryClient();

  // GET BRANDS
  const { data, isPending } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await api.get<BrandsResponse>("/admin/brands");

      return response.data;
    },
  });

  // CREATE BRAND
  const useCreateBrand = () => {
    return useMutation({
      mutationFn: async (data: CreateBrandInput) => {
        const response = await api.post("/admin/brands", data);

        return response.data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["brands"],
        });
      },
    });
  };

  // UPDATE BRAND
  const useUpdateBrand = () => {
    return useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: UpdateBrandInput;
      }) => {
        const response = await api.patch(`/admin/brands/${id}`, data);

        return response.data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["brands"],
        });
      },
    });
  };

  // DELETE BRAND
  const useDeleteBrand = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const response = await api.delete(`/admin/brands/${id}`);

        return response.data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["brands"],
        });
      },
    });
  };
  const useDetails = (id?: string) => {
    return useQuery({
      queryKey: ["brand", id],
      queryFn: async () => {
        const response = await api.get(`/admin/brands/${id}`);
        return response.data;
      },
      enabled: !!id,
    });
  };

  return {
    data,
    isPending,
    useCreateBrand,
    useUpdateBrand,
    useDeleteBrand,
    useDetails,
  };
};

export default BrandService;
