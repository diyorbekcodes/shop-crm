import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../../service/pages/api";

import type {
  BannerListResponse,
  BannerResponse,
  CreateBannerData,
  UpdateBannerData,
  UpdateBannerStatusData,
} from "../types/banner";

// ====================
// GET ALL BANNERS
// ====================

export const useBanners = () => {
  return useQuery<BannerListResponse>({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await api.get("/admin/banners");

      return res.data;
    },
  });
};

// ====================
// GET BANNER BY ID
// ====================

export const useBannerById = (id: string | null) => {
  return useQuery<BannerResponse>({
    queryKey: ["banner", id],

    queryFn: async () => {
      const res = await api.get(`/admin/banners/${id}`);

      return res.data;
    },

    enabled: !!id,
  });
};

// ====================
// CREATE BANNER
// ====================

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBannerData) => {
      const res = await api.post("/admin/banners", data);

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },
  });
};

// ====================
// UPDATE BANNER
// ====================

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateBannerData;
    }) => {
      const res = await api.patch(`/admin/banners/${id}`, data);

      return res.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });

      queryClient.invalidateQueries({
        queryKey: ["banner", variables.id],
      });
    },
  });
};

// ====================
// DELETE BANNER
// ====================

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/admin/banners/${id}`);

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },
  });
};

// ====================
// ACTIVE / DEACTIVE
// ====================

export const useToggleBannerStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateBannerStatusData;
    }) => {
      const res = await api.patch(`/admin/banners/${id}`, data);

      return res.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });

      queryClient.invalidateQueries({
        queryKey: ["banner", variables.id],
      });
    },
  });
};
