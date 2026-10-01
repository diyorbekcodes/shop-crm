import {
  ArrowLeft,
  Barcode,
  CalendarDays,
  CheckCircle2,
  Eye,
  Package,
  Percent,
  Star,
  Tag,
  XCircle,
} from "lucide-react";
import { Spin, Tag as AntTag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../service/ProductService";
import { useTheme } from "../../../context/modContext";
import type { ProductImage } from "../types/ProductTypes";
import { resolveImageUrl } from "../../service/UploadService";

interface InfoItemProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  darkMode: boolean;
}

interface StatusItemProps {
  title: string;
  value: boolean;
  darkMode: boolean;
}

const InfoItem = ({ icon, title, value, darkMode }: InfoItemProps) => {
  return (
    <div
      className={
        darkMode
          ? "flex items-center gap-3 rounded-sm border border-[#374151] bg-[#111827] p-4"
          : "flex items-center gap-3 rounded-sm border border-[#E2EDE9] bg-[#F8FBFA] p-4 transition-all duration-200 hover:border-[#CDE5D9] hover:bg-[#F0F8F4]"
      }
    >
      <div
        className={
          darkMode
            ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#1F2937] text-[#4EA674]"
            : "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#EAF6F0] text-[#2F8F68]"
        }
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className={
            darkMode ? "text-xs text-[#9CA3AF]" : "text-xs text-[#64748B]"
          }
        >
          {title}
        </p>

        <p
          className={
            darkMode
              ? "mt-1 truncate font-medium text-[#F9FAFB]"
              : "mt-1 truncate font-medium text-[#263B35]"
          }
        >
          {value || "-"}
        </p>
      </div>
    </div>
  );
};

const StatusItem = ({ title, value, darkMode }: StatusItemProps) => {
  return (
    <div
      className={
        darkMode
          ? "rounded-sm border border-[#374151] bg-[#111827] p-4"
          : "rounded-sm border border-[#E2EDE9] bg-white p-4 shadow-[0_1px_4px_rgba(15,23,42,0.03)]"
      }
    >
      <div className="flex items-center gap-3">
        <div
          className={
            value
              ? "flex h-9 w-9 items-center justify-center rounded-sm bg-[#EAF6F0]"
              : "flex h-9 w-9 items-center justify-center rounded-sm bg-[#FEF2F2]"
          }
        >
          {value ? (
            <CheckCircle2 size={19} className="text-[#2F8F68]" />
          ) : (
            <XCircle size={19} className="text-[#EF4444]" />
          )}
        </div>

        <span
          className={
            darkMode
              ? "font-medium text-[#F9FAFB]"
              : "font-medium text-[#263B35]"
          }
        >
          {title}
        </span>
      </div>

      <p
        className={
          value
            ? "mt-3 text-sm font-medium text-[#2F8F68]"
            : "mt-3 text-sm font-medium text-[#EF4444]"
        }
      >
        {value ? "Yes" : "No"}
      </p>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const { useProductById } = ProductService();

  const { data: response, isPending, isError } = useProductById(id);

  const product = response?.data ?? response;

  if (isPending) {
    return (
      <div
        className={
          darkMode
            ? "flex min-h-screen items-center justify-center bg-[#111827]"
            : "flex min-h-screen items-center justify-center bg-[#F4F7F6]"
        }
      >
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div
        className={
          darkMode
            ? "flex min-h-screen flex-col items-center justify-center bg-[#111827] text-white"
            : "flex min-h-screen flex-col items-center justify-center bg-[#F4F7F6] text-[#263B35]"
        }
      >
        <Package size={50} className="mb-4 opacity-50" />

        <h2 className="text-xl font-semibold">Mahsulot topilmadi</h2>

        <button
          onClick={() => navigate("/products")}
          className={
            darkMode
              ? "mt-5 rounded-sm bg-[#4EA674] px-5 py-2.5 text-white transition hover:bg-[#429363]"
              : "mt-5 rounded-sm bg-[#2F8F68] px-5 py-2.5 text-white transition hover:bg-[#267856]"
          }
        >
          Mahsulotlarga qaytish
        </button>
      </div>
    );
  }

  const productImages = (product.images ?? []) as ProductImage[];
  const mainImage =
    productImages.find((image) => image.isMain)?.url ||
    productImages[0]?.url ||
    "";

  const extraImages = productImages.filter((image) => image.url !== mainImage);

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price);
  };

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-[#111827] px-3 py-4 text-[#F9FAFB] sm:px-6 sm:py-6"
          : "min-h-screen bg-[#F4F7F6] px-3 py-4 text-[#263B35] sm:px-6 sm:py-6"
      }
    >
      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/products")}
            className={
              darkMode
                ? "flex h-10 w-10 items-center justify-center rounded-sm border border-[#374151] bg-[#1F2937] text-[#D1D5DB] transition hover:border-[#4EA674] hover:text-[#4EA674]"
                : "flex h-10 w-10 items-center justify-center rounded-sm border border-[#DCE8E3] bg-white text-[#52706A] shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition hover:border-[#CDE5D9] hover:bg-[#EAF6F0] hover:text-[#2F8F68]"
            }
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-2xl font-semibold">Mahsulot tafsilotlari</h1>

            <p
              className={
                darkMode
                  ? "mt-1 text-sm text-[#9CA3AF]"
                  : "mt-1 text-sm text-[#64748B]"
              }
            >
              Mahsulot haqida batafsil ma'lumot
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/products")}
          className={
            darkMode
              ? "h-10 rounded-sm border border-[#374151] bg-[#1F2937] px-4 text-sm text-[#D1D5DB] transition hover:border-[#4EA674] hover:text-[#4EA674]"
              : "h-10 rounded-sm border border-[#DCE8E3] bg-white px-4 text-sm text-[#365C52] shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition hover:border-[#CDE5D9] hover:bg-[#EAF6F0] hover:text-[#2F8F68]"
          }
        >
          Products
        </button>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(380px,0.85fr)_minmax(0,1.15fr)]">
        {/* LEFT */}
        <div
          className={
            darkMode
              ? "self-start rounded-sm border border-[#374151] bg-[#1F2937] p-6 xl:sticky xl:top-6"
              : "self-start rounded-sm border border-[#E2EDE9] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] xl:sticky xl:top-6"
          }
        >
          {/* MAIN IMAGE */}
          <div
            className={
              darkMode
                ? "flex h-64 items-center justify-center rounded-sm border border-[#374151] bg-[#111827] p-3 sm:h-[420px]"
                : "flex h-64 items-center justify-center rounded-sm border border-[#E6EFEB] bg-[#F8FBFA] p-3 sm:h-[420px]"
            }
          >
            {mainImage ? (
              <img
                src={resolveImageUrl(mainImage)}
                alt={product.name}
                className="h-full w-full object-contain p-8"
              />
            ) : (
              <div
                className={
                  darkMode
                    ? "flex flex-col items-center text-[#6B7280]"
                    : "flex flex-col items-center text-[#94A3B8]"
                }
              >
                <Package size={60} strokeWidth={1.5} />
                <span className="mt-3 text-sm">Rasm mavjud emas</span>
              </div>
            )}
          </div>

          {/* EXTRA IMAGES */}
          {extraImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {extraImages.map((image, index) => (
                <div
                  key={index}
                  className={
                    darkMode
                      ? "flex h-24 items-center justify-center rounded-sm border border-[#374151] bg-[#111827] p-2"
                      : "flex h-24 items-center justify-center rounded-sm border border-[#E2EDE9] bg-[#F8FBFA] p-2"
                  }
                >
                  <img
                    src={resolveImageUrl(image.url) || undefined}
                    alt={image.alt || product.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}

          {/* PRODUCT NAME */}
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-semibold">{product.name}</h2>

              {product.isNew && <AntTag color="green">NEW</AntTag>}

              {product.isFeatured && <AntTag color="blue">FEATURED</AntTag>}
            </div>

            <p
              className={
                darkMode
                  ? "mt-2 text-sm text-[#9CA3AF]"
                  : "mt-2 text-sm text-[#64748B]"
              }
            >
              {product.shortDescription || "-"}
            </p>
          </div>

          {/* PRICE */}
          <div
            className={
              darkMode
                ? "mt-7 rounded-sm border border-[#374151] bg-[#111827] p-5"
                : "mt-7 rounded-sm border border-[#E2EFE9] bg-[#F0F8F4] p-5"
            }
          >
            <p
              className={
                darkMode ? "text-sm text-[#9CA3AF]" : "text-sm text-[#64748B]"
              }
            >
              Narxi
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span
                className={
                  darkMode
                    ? "text-3xl font-bold text-[#4EA674]"
                    : "text-3xl font-bold text-[#2F8F68]"
                }
              >
                ${formatPrice(product.price)}
              </span>

              {product.oldPrice && (
                <span
                  className={
                    darkMode
                      ? "text-sm text-[#6B7280] line-through"
                      : "text-sm text-[#94A3B8] line-through"
                  }
                >
                  ${formatPrice(product.oldPrice)}
                </span>
              )}

              {product.discountPercent > 0 && (
                <span
                  className={
                    darkMode
                      ? "rounded-sm bg-[#14532D] px-2.5 py-1 text-xs font-medium text-[#86EFAC]"
                      : "rounded-sm bg-[#DCFCE7] px-2.5 py-1 text-xs font-medium text-[#15803D]"
                  }
                >
                  -{product.discountPercent}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="min-w-0 space-y-5">
          {/* BASIC INFO */}
          <div
            className={
              darkMode
                ? "rounded-sm border border-[#374151] bg-[#1F2937] p-6"
                : "rounded-sm border border-[#E2EDE9] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
            }
          >
            <div className="mb-5 flex items-center gap-2">
              <Package
                size={20}
                className={darkMode ? "text-[#4EA674]" : "text-[#2F8F68]"}
              />

              <h3 className="text-lg font-semibold">Asosiy ma'lumotlar</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                darkMode={darkMode}
                icon={<Tag size={18} />}
                title="Slug"
                value={product.slug}
              />

              <InfoItem
                darkMode={darkMode}
                icon={<Barcode size={18} />}
                title="SKU"
                value={product.sku}
              />

              <InfoItem
                darkMode={darkMode}
                icon={<Barcode size={18} />}
                title="Barcode"
                value={product.barcode || "-"}
              />

              <InfoItem
                darkMode={darkMode}
                icon={<Package size={18} />}
                title="Stock"
                value={product.stock}
              />

              <InfoItem
                darkMode={darkMode}
                icon={<Package size={18} />}
                title="Available stock"
                value={product.availableStock}
              />

              <InfoItem
                darkMode={darkMode}
                icon={<Package size={18} />}
                title="Reserved stock"
                value={product.reservedStock}
              />

              <InfoItem
                darkMode={darkMode}
                icon={<Percent size={18} />}
                title="Discount"
                value={`${product.discountPercent}%`}
              />

              <InfoItem
                darkMode={darkMode}
                icon={<Eye size={18} />}
                title="Views"
                value={product.viewsCount}
              />
            </div>
          </div>

          {/* BRAND & CATEGORY */}
          <div
            className={
              darkMode
                ? "rounded-sm border border-[#374151] bg-[#1F2937] p-6"
                : "rounded-sm border border-[#E2EDE9] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
            }
          >
            <h3 className="mb-5 text-lg font-semibold">Brand va kategoriya</h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                darkMode={darkMode}
                icon={<Tag size={18} />}
                title="Brand"
                value={product.brand?.name || "-"}
              />

              <InfoItem
                darkMode={darkMode}
                icon={<Package size={18} />}
                title="Category"
                value={product.category?.name || "-"}
              />

              <InfoItem
                darkMode={darkMode}
                icon={<Star size={18} />}
                title="Rating"
                value={product.averageRating || 0}
              />

              <InfoItem
                darkMode={darkMode}
                icon={<Star size={18} />}
                title="Reviews"
                value={product.reviewsCount || 0}
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div
            className={
              darkMode
                ? "rounded-sm border border-[#374151] bg-[#1F2937] p-6"
                : "rounded-sm border border-[#E2EDE9] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
            }
          >
            <h3 className="mb-4 text-lg font-semibold">Description</h3>

            <div
              className={
                darkMode
                  ? "rounded-sm border border-[#374151] bg-[#111827] p-4 text-sm leading-6 text-[#D1D5DB]"
                  : "rounded-sm border border-[#E6EFEB] bg-[#F8FBFA] p-4 text-sm leading-6 text-[#52665F]"
              }
            >
              {product.description || "Description mavjud emas."}
            </div>
          </div>

          {/* STATUS */}
          <div
            className={
              darkMode
                ? "rounded-sm border border-[#374151] bg-[#1F2937] p-6"
                : "rounded-sm border border-[#E2EDE9] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
            }
          >
            <h3 className="mb-5 text-lg font-semibold">Status</h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <StatusItem
                darkMode={darkMode}
                title="Active"
                value={product.isActive}
              />

              <StatusItem
                darkMode={darkMode}
                title="Featured"
                value={product.isFeatured}
              />

              <StatusItem
                darkMode={darkMode}
                title="New product"
                value={product.isNew}
              />

              <StatusItem
                darkMode={darkMode}
                title="Popular"
                value={product.isPopular}
              />
            </div>
          </div>

          {/* DATES */}
          <div
            className={
              darkMode
                ? "rounded-sm border border-[#374151] bg-[#1F2937] p-6"
                : "rounded-sm border border-[#E2EDE9] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
            }
          >
            <h3 className="mb-5 text-lg font-semibold">Sana</h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                darkMode={darkMode}
                icon={<CalendarDays size={18} />}
                title="Created"
                value={formatDate(product.createdAt)}
              />

              <InfoItem
                darkMode={darkMode}
                icon={<CalendarDays size={18} />}
                title="Updated"
                value={formatDate(product.updatedAt)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
