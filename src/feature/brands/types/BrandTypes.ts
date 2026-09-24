export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;

  _count: {
    products: number;
  };
}

export interface BrandsResponse {
  success: boolean;
  data: Brand[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateBrandInput {
  name: string;
  slug: string;
  description: string;
  logo: string;
  isActive: boolean;
}

export interface UpdateBrandInput {
  name: string;
  slug: string;
  description: string;
  logo: string;
  isActive: boolean;
}
export interface BrandProduct {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number | null;
  images?: {
    id: string;
    url: string;
    isMain: boolean;
  }[];
}

export interface BrandCount {
  products: number;
}

export interface BrandDetails {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  products: BrandProduct[];
  _count: BrandCount;
}

export interface BrandDetailsResponse {
  success: boolean;
  data: Brand;
}
