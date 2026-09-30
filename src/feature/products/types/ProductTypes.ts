// ==========================
// Product Image

import type { Meta } from "../../orderManagment/types/TableType";

// ==========================
export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string;
  sortOrder: number;
  isMain: boolean;
  createdAt: string;
}

// ==========================
// Brand
// ==========================
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
}

// ==========================
// Category
// ==========================
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ==========================
// Product Variant (hozircha bo'sh massiv kelmoqda)
// ==========================
export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  price: number;
  stock: number;
  // Backend'dan haqiqiy misol kelganda to'ldiring
}

// ==========================
// Main Product type
// ==========================
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  sku: string;
  barcode: string | null;
  price: number;
  oldPrice: number | null;
  discountPercent: number;
  stock: number;
  reservedStock: number;
  availableStock: number;
  lowStockThreshold: number;
  brandId: string;
  categoryId: string;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  averageRating: number;
  reviewsCount: number;
}

// ==========================
// API response wrapper
// ==========================
export interface ProductsResponse {
  success: boolean;
  data: Product[];
  meta: Meta; // avvalgi Meta interfeysidan foydalanadi
}

// ==========================
// Table row type (frontend)
// ==========================
export interface ProductTableRowData {
  key: string;
  id: string;
  no: number;
  name: string;
  image: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number | null;
  stock: number;
  isActive: boolean;
}
// ==========================
// Sub-types for Create Product
// ==========================
export interface CreateProductImageInput {
  url: string;
  alt: string;
  isMain: boolean;
  sortOrder: number;
}

export interface CreateProductVariantAttributes {
  storage: string;
  ram: string;
  [key: string]: string; // Boshqa atributlar ham bo'lishi mumkin bo'lsa
}

export interface CreateProductVariantInput {
  sku: string;
  price: number;
  stock: number;
  attributes: CreateProductVariantAttributes;
  isActive: boolean;
}

// ==========================
// Create Product Input Type
// ==========================
export interface CreateProductInput {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  sku: string;
  barcode: string;
  price: number;
  oldPrice: number;
  discountPercent: number;
  stock: number;
  lowStockThreshold: number;
  brandId: string;
  categoryId: string;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;
  images: CreateProductImageInput[];
  variants?: CreateProductVariantInput[];
}
export interface ProductImage {
  url: string;
  alt: string;
  isMain: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  sku: string;
  price: number;
  stock: number;
  attributes: {
    storage?: string;
    ram?: string;
    color?: string;
    [key: string]: string | undefined;
  };
  isActive: boolean;
}

export interface UpdateProductInput {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  sku: string;
  barcode: string;

  price: number;
  oldPrice: number;
  discountPercent: number;

  stock: number;
  lowStockThreshold: number;

  brandId: string;
  categoryId: string;

  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;

  images: ProductImage[];

  variants: ProductVariant[];
}
