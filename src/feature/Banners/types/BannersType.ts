// types/banner.ts

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  mobileImage: string | null;
  buttonText: string | null;
  link: string | null;
  sortOrder: number;
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BannerListResponse {
  success: boolean;
  data: Banner[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BannerResponse {
  success: boolean;
  data: Banner;
}

export interface CreateBannerData {
  title: string;
  subtitle: string;
  image: string;
  mobileImage: string;
  buttonText: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export interface UpdateBannerData {
  title: string;
  subtitle: string;
  image: string;
  mobileImage: string;
  buttonText: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export interface UpdateBannerStatusData {
  isActive: boolean;
}
