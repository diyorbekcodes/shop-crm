import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  message,
  theme,
} from "antd";
import { isAxiosError } from "axios";

import {
  CircleX,
  Save,
  SquarePen,
  StepBack,
  WandSparkles,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router";

import { useTheme } from "../../../context/modContext";

import CategoriesService from "../../categories/service/CategoriesService";

import ProductService from "../../products/service/ProductService";

import type { CreateProductInput } from "../../products/types/ProductTypes";
import BrandService from "../../brands/hook/Brands";
import type { CategoryType } from "../../categories/types/CategoriesType";
import ImageUpload from "../../components/ImageUpload";

const { darkAlgorithm, defaultAlgorithm } = theme;

const COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#EF4444" },
  { name: "Blue", hex: "#3B82F6" },
  { name: "Green", hex: "#22C55E" },
  { name: "Yellow", hex: "#EAB308" },
];

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const generateSku = (name: string) => {
  return (
    name
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 10) || "SKU"
  );
};

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  discountedPrice?: number | null;
  stockQuantity?: number | null;
  categoryId: string;
  brandId: string;
}

export default function AddProduct() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [form] = Form.useForm<ProductFormValues>();

  const { useCreateProduct } = ProductService();

  const { mutate: createProduct, isPending: isSaving } = useCreateProduct();

  const { data: categoriesData, isLoading: categoriesLoading } =
    CategoriesService();

  const { data: brandsData, isPending: isBrands } = BrandService();

  const categories:CategoryType[] = categoriesData?.data ?? [];
  const brands = brandsData?.data ?? [];

  // =========================
  // STATES
  // =========================

  const [taxIncluded, setTaxIncluded] = useState("no");

  const [isUnlimited, setIsUnlimited] = useState(false);

  const [isActive, setIsActive] = useState(true);

  const [isFeatured, setIsFeatured] = useState(false);

  const [mainImageUrl, setMainImageUrl] = useState("");

  const [extraImageUrls, setExtraImageUrls] = useState<string[]>([]);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // =========================
  // ADD IMAGE
  // =========================

  const handleAddImage = (uploadedUrl: string) => {
    const url = uploadedUrl.trim();

    if (!url) {
      return;
    }

    if (url === mainImageUrl || extraImageUrls.includes(url)) {
      message.warning("Bu rasm allaqachon qo'shilgan");
      return;
    }

    setExtraImageUrls((prev) => [...prev, url]);
  };

  // =========================
  // REMOVE IMAGE
  // =========================

  const handleRemoveImage = (index: number) => {
    setExtraImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // =========================
  // RESET
  // =========================

  const resetForm = () => {
    form.resetFields();

    setTaxIncluded("no");

    setIsUnlimited(false);

    setIsActive(true);

    setIsFeatured(false);

    setMainImageUrl("");

    setExtraImageUrls([]);

    setSelectedColor(null);
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (publish: boolean) => {
    try {
      const values = await form.validateFields();

      if (!mainImageUrl.trim()) {
        message.error("Asosiy rasm URL manzilini kiriting");
        return;
      }

      if (
        !isUnlimited &&
        (values.stockQuantity === null ||
          values.stockQuantity === undefined ||
          values.stockQuantity < 0)
      ) {
        message.error(
          "Ombordagi mahsulot sonini kiriting yoki Unlimited ni yoqing",
        );
        return;
      }

      if (
        values.discountedPrice !== null &&
        values.discountedPrice !== undefined &&
        values.discountedPrice >= values.price
      ) {
        message.error("Chegirmali narx asosiy narxdan kichik bo'lishi kerak");
        return;
      }

      const discountPercent =
        values.discountedPrice && values.price
          ? Math.round(
              ((values.price - values.discountedPrice) / values.price) * 100,
            )
          : 0;

      const stock = isUnlimited ? 999999 : (values.stockQuantity ?? 0);

      const productData: CreateProductInput = {
        name: values.name.trim(),

        slug: generateSlug(values.name),

        description: values.description.trim(),

        shortDescription: values.description.trim().slice(0, 120),

        sku: generateSku(values.name),

        barcode: "",

        brandId: values.brandId,

        price: values.price,

        oldPrice: values.discountedPrice ?? 0,

        discountPercent,

        stock,

        lowStockThreshold: 5,

        categoryId: values.categoryId,

        isActive: publish ? isActive : false,

        isFeatured,

        isNew: true,

        isPopular: false,

        images: [
          {
            url: mainImageUrl.trim(),

            alt: values.name.trim(),

            isMain: true,

            sortOrder: 0,
          },

          ...extraImageUrls.map((url, index) => ({
            url,

            alt: values.name.trim(),

            isMain: false,

            sortOrder: index + 1,
          })),
        ],

       
      };

      createProduct(productData, {
        onSuccess: () => {
          message.success(
            publish
              ? "Mahsulot muvaffaqiyatli e'lon qilindi"
              : "Mahsulot qoralama sifatida saqlandi",
          );

          resetForm();
        },

        onError: (error: unknown) => {
          console.error("CREATE PRODUCT ERROR:", error);

          message.error(
            (isAxiosError<{ message?: string }>(error)
              ? error.response?.data?.message
              : undefined) ?? "Mahsulot yaratishda xatolik yuz berdi",
          );
        },
      });
    } catch (error) {
      console.log("FORM VALIDATION ERROR:", error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,

        token: {
          colorPrimary: "#4EA674",

          borderRadius: 8,

          controlHeight: 40,

          colorBgContainer: darkMode ? "#374151" : "#FFFFFF",

          colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

          colorText: darkMode ? "#F9FAFB" : "#111827",

          colorTextSecondary: darkMode ? "#9CA3AF" : "#6B7280",

          colorTextPlaceholder: darkMode ? "#9CA3AF" : "#6B7280",

          colorBorder: darkMode ? "#4B5563" : "#E5E7EB",

          colorBorderSecondary: darkMode ? "#374151" : "#E5E7EB",
        },

        components: {
          Input: {
            colorBgContainer: darkMode ? "#374151" : "#FFFFFF",

            colorText: darkMode ? "#FFFFFF" : "#111827",

            colorTextPlaceholder: darkMode ? "#9CA3AF" : "#6B7280",

            colorBorder: darkMode ? "#4B5563" : "#E5E7EB",

            hoverBorderColor: "#4EA674",

            activeBorderColor: "#4EA674",
          },

          InputNumber: {
            colorBgContainer: darkMode ? "#374151" : "#FFFFFF",

            colorText: darkMode ? "#FFFFFF" : "#111827",

            colorBorder: darkMode ? "#4B5563" : "#E5E7EB",

            hoverBorderColor: "#4EA674",

            activeBorderColor: "#4EA674",
          },

          Select: {
            colorBgContainer: darkMode ? "#374151" : "#FFFFFF",

            colorText: darkMode ? "#FFFFFF" : "#111827",

            colorTextPlaceholder: darkMode ? "#9CA3AF" : "#6B7280",

            colorBorder: darkMode ? "#4B5563" : "#E5E7EB",

            hoverBorderColor: "#4EA674",

            activeBorderColor: "#4EA674",

            colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

            optionSelectedBg: darkMode ? "#4EA674" : "#E8F5EE",

            optionActiveBg: darkMode ? "#4B5563" : "#F3F4F6",
          },

          DatePicker: {
            colorBgContainer: darkMode ? "#374151" : "#FFFFFF",

            colorText: darkMode ? "#FFFFFF" : "#111827",

            colorTextPlaceholder: darkMode ? "#9CA3AF" : "#6B7280",

            colorBorder: darkMode ? "#4B5563" : "#E5E7EB",

            hoverBorderColor: "#4EA674",

            activeBorderColor: "#4EA674",

            colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",
          },

          Radio: {
            colorText: darkMode ? "#F9FAFB" : "#111827",
          },

          Checkbox: {
            colorBgContainer: darkMode ? "#374151" : "#FFFFFF",

            colorText: darkMode ? "#F9FAFB" : "#111827",
          },

          Form: {
            labelColor: darkMode ? "#E5E7EB" : "#111827",

            labelFontSize: 15,
          },

          Switch: {
            colorPrimary: "#4EA674",

            colorPrimaryHover: "#5DBA83",
          },
        },
      }}
    >
      <div
        className={
          darkMode ? "min-h-screen bg-[#111827]" : "min-h-screen bg-[#F8FAFC]"
        }
      >
        {/* ================= HEADER ================= */}

        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className={
              darkMode
                ? "flex items-center justify-center w-9 h-9 rounded-sm bg-[#1F2937] border border-[#374151] text-[#9CA3AF] hover:bg-[#374151] hover:text-white transition-colors cursor-pointer"
                : "flex items-center justify-center w-9 h-9 rounded-sm bg-white border border-[#E5E7EB] text-[#6A717F] hover:bg-[#F3F4F6] hover:text-[#023337] transition-colors cursor-pointer"
            }
          >
            <StepBack size={20} />
          </button>

          <p
            className={
              darkMode
                ? "text-white text-[22px] font-bold"
                : "text-[#023337] text-[22px] font-bold"
            }
          >
            Add Products
          </p>
        </div>

        {/* ================= FORM ================= */}

        <Form form={form} layout="vertical" requiredMark={false}>
          <div className="w-full flex flex-col lg:flex-row gap-5 mt-9">
            {/* ================= LEFT ================= */}

            <div
              className={
                darkMode
                  ? "w-full min-w-0 lg:flex-[1.25] rounded-sm bg-[#1F2937] shadow-[0px_1px_3px_0px_#00000066] p-4 md:p-6"
                  : "w-full min-w-0 lg:flex-[1.25] rounded-sm bg-white shadow-[0px_1px_3px_0px_#00000033] p-4 md:p-6"
              }
            >
              {/* BASIC DETAILS */}

              <p
                className={
                  darkMode
                    ? "text-[22px] font-bold text-white"
                    : "text-[22px] font-bold text-[#23272E]"
                }
              >
                Basic Details
              </p>

              {/* PRODUCT NAME */}

              <Form.Item
                name="name"
                label="Product Name"
                className="mt-6"
                rules={[
                  {
                    required: true,
                    message: "Mahsulot nomini kiriting",
                  },
                  {
                    min: 2,
                    message:
                      "Mahsulot nomi kamida 2 ta belgidan iborat bo'lishi kerak",
                  },
                ]}
              >
                <Input placeholder="Phone name" className="h-[40px]" />
              </Form.Item>

              {/* DESCRIPTION */}

              <Form.Item
                name="description"
                label="Product Description"
                rules={[
                  {
                    required: true,
                    message: "Mahsulot tavsifini kiriting",
                  },
                ]}
              >
                <div
                  className={
                    darkMode
                      ? "bg-[#374151] p-3 rounded-sm"
                      : "bg-[#F9FAFB] p-3 rounded-sm"
                  }
                >
                  <Input.TextArea
                    bordered={false}
                    rows={4}
                    placeholder="Mahsulot tavsifini yozing..."
                    className={
                      darkMode
                        ? "!bg-transparent !text-white"
                        : "!bg-transparent !text-[#111827]"
                    }
                  />

                  <div className="flex justify-end gap-2.5 mt-5">
                    <SquarePen
                      size={20}
                      className="cursor-pointer text-gray-400"
                    />

                    <WandSparkles
                      size={20}
                      className="cursor-pointer text-gray-400"
                    />
                  </div>
                </div>
              </Form.Item>

              {/* PRICING */}

              <p
                className={
                  darkMode
                    ? "text-[22px] font-bold text-white mt-8"
                    : "text-[22px] font-bold text-[#23272E] mt-8"
                }
              >
                Pricing
              </p>

              {/* PRICE */}

              <div className="mt-4">
                <Form.Item
                  name="price"
                  label="Product Price"
                  rules={[
                    {
                      required: true,
                      message: "Mahsulot narxini kiriting",
                    },
                    {
                      type: "number",
                      min: 1,
                      message: "Narx 0 dan katta bo'lishi kerak",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    className="w-full h-[40px]"
                    placeholder="0"
                    addonAfter="UZS"
                  />
                </Form.Item>
              </div>

              {/* DISCOUNT + TAX */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* DISCOUNT */}

                <Form.Item
                  name="discountedPrice"
                  label={
                    <>
                      Discounted Price{" "}
                      <span className="text-gray-400 font-normal">
                        (Optional)
                      </span>
                    </>
                  }
                >
                  <InputNumber
                    min={0}
                    className="w-full h-[40px]"
                    placeholder="0"
                  />
                </Form.Item>

                {/* TAX */}

                <div>
                  <p
                    className={
                      darkMode
                        ? "text-white text-[15px] font-bold mb-2"
                        : "text-[#023337] text-[15px] font-bold mb-2"
                    }
                  >
                    Tax Included
                  </p>

                  <Radio.Group
                    value={taxIncluded}
                    onChange={(e) => setTaxIncluded(e.target.value)}
                  >
                    <div className="flex flex-col gap-2">
                      <Radio value="yes">Yes</Radio>

                      <Radio value="no">No</Radio>
                    </div>
                  </Radio.Group>
                </div>
              </div>

              {/* EXPIRATION */}

              <div className="mt-2">
                <p
                  className={
                    darkMode
                      ? "text-white font-bold text-[15px] mb-3"
                      : "text-[#023337] font-bold text-[15px] mb-3"
                  }
                >
                  Expiration
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <DatePicker className="w-full h-[40px]" placeholder="Start" />

                  <DatePicker className="w-full h-[40px]" placeholder="End" />
                </div>
              </div>

              {/* INVENTORY */}

              <p
                className={
                  darkMode
                    ? "text-white text-[22px] font-bold mt-8 mb-5"
                    : "text-[#23272E] text-[22px] font-bold mt-8 mb-5"
                }
              >
                Inventory
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* STOCK */}

                <Form.Item
                  name="stockQuantity"
                  label="Stock Quantity"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (isUnlimited) {
                          return Promise.resolve();
                        }

                        if (value === undefined || value === null) {
                          return Promise.reject(
                            new Error("Stock quantity kiriting"),
                          );
                        }

                        if (value < 0) {
                          return Promise.reject(
                            new Error("Stock 0 dan kichik bo'lmasligi kerak"),
                          );
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    disabled={isUnlimited}
                    className="w-full h-[40px]"
                    placeholder={isUnlimited ? "Unlimited" : "0"}
                  />
                </Form.Item>

                {/* STATUS */}

                <Form.Item label="Stock Status" className="mb-0">
                  <Select
                    className="w-full"
                    value={isActive ? "In Stock" : "Out of Stock"}
                    onChange={(value) => setIsActive(value === "In Stock")}
                    options={[
                      {
                        value: "In Stock",
                        label: "In Stock",
                      },
                      {
                        value: "Out of Stock",
                        label: "Out of Stock",
                      },
                    ]}
                  />
                </Form.Item>
              </div>

              {/* UNLIMITED */}

              <div className="flex gap-2 items-center mt-2">
                <Switch checked={isUnlimited} onChange={setIsUnlimited} />

                <p
                  className={
                    darkMode
                      ? "text-white text-[15px]"
                      : "text-[#023337] text-[15px]"
                  }
                >
                  Unlimited
                </p>
              </div>

              {/* FEATURED */}

              <div className="flex items-center gap-2 mt-5">
                <Checkbox
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />

                <p
                  className={
                    darkMode
                      ? "text-gray-300 text-[15px]"
                      : "text-[#6A717F] text-[15px]"
                  }
                >
                  Highlight this product in a featured section.
                </p>
              </div>

              {/* BUTTONS */}

              <div className="mt-8 flex flex-col-reverse items-stretch justify-end gap-3 sm:flex-row sm:items-center sm:gap-5">
                <Button
                  type="default"
                  loading={isSaving}
                  onClick={() => handleSubmit(false)}
                  className={
                    darkMode
                      ? "!h-[42px] !px-4 !bg-[#374151] !border-[#4B5563] !text-white"
                      : "!h-[42px] !px-4"
                  }
                >
                  <Save size={18} />
                  Save to draft
                </Button>

                <Button
                  type="primary"
                  loading={isSaving}
                  onClick={() => handleSubmit(true)}
                  className="!h-[42px] !px-4 !font-bold"
                >
                  Publish Product
                </Button>
              </div>
            </div>

            {/* ================= RIGHT ================= */}

            <div
              className={
                darkMode
                  ? "w-full min-w-0 lg:flex-1 p-4 md:p-6 rounded-sm bg-[#1F2937] shadow-[0px_1px_3px_0px_#00000066]"
                  : "w-full min-w-0 lg:flex-1 p-4 md:p-6 rounded-sm bg-white shadow-[0px_1px_3px_0px_#00000033]"
              }
            >
              {/* IMAGE */}

              <p
                className={
                  darkMode
                    ? "text-white font-bold text-[22px]"
                    : "text-[#23272E] font-bold text-[22px]"
                }
              >
                Upload Product Image
              </p>

              {/* MAIN IMAGE */}

              <div className="mt-5">
                <p
                  className={
                    darkMode
                      ? "text-white text-[15px] font-bold"
                      : "text-[#023337] text-[15px] font-bold"
                  }
                >
                  Asosiy rasm
                </p>

                <div className="mt-3 min-w-0">
                  <ImageUpload
                    value={mainImageUrl}
                    onChange={setMainImageUrl}
                    buttonText="Asosiy rasmni yuklash"
                    previewAlt="Product main image"
                  />
                </div>
              </div>

              {/* EXTRA IMAGES */}

              <div className="mt-5">
                <p
                  className={
                    darkMode
                      ? "text-white text-[15px] font-bold"
                      : "text-[#023337] text-[15px] font-bold"
                  }
                >
                  Qo'shimcha rasmlar
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {extraImageUrls.map((url, index) => (
                    <div
                      key={`${url}-${index}`}
                      className={
                        darkMode
                          ? "border border-[#4B5563] rounded-lg relative p-1"
                          : "border border-[#E5E7EB] rounded-lg relative p-1"
                      }
                    >
                      <img
                        src={url}
                        alt="Product"
                        className="w-full h-20 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />

                      <button
                        type="button"
                        className="absolute top-1 right-1 cursor-pointer"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CircleX
                          size={16}
                          color={darkMode ? "#9CA3AF" : "#6A717F"}
                        />
                      </button>
                    </div>
                  ))}

                  {/* ADD IMAGE */}

                  <ImageUpload
                    onChange={handleAddImage}
                    buttonText="Qo'shimcha rasm qo'shish"
                    previewAlt="Additional product image"
                  />
                </div>
              </div>

              {/* CATEGORY */}

              <div className="mt-8">
                <p
                  className={
                    darkMode
                      ? "text-white font-bold text-[22px]"
                      : "text-[#23272E] font-bold text-[22px]"
                  }
                >
                  Categories
                </p>

                <Form.Item
                  name="categoryId"
                  label="Product Category"
                  className="mt-5"
                  rules={[
                    {
                      required: true,
                      message: "Kategoriyani tanlang",
                    },
                  ]}
                >
                  <Select
                    placeholder="Kategoriyani tanlang"
                    loading={categoriesLoading}
                    className="w-full"
                    options={categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                  />
                </Form.Item>
              </div>

              {/* BRAND */}

              <div className="mt-2">
                <p
                  className={
                    darkMode
                      ? "text-white font-bold text-[22px]"
                      : "text-[#23272E] font-bold text-[22px]"
                  }
                >
                  Brands
                </p>

                <Form.Item
                  name="brandId"
                  label="Product Brand"
                  className="mt-5"
                  rules={[
                    {
                      required: true,
                      message: "Brendni tanlang",
                    },
                  ]}
                >
                  <Select
                    placeholder="Brendni tanlang"
                    loading={isBrands}
                    className="w-full"
                    options={brands.map((brand) => ({
                      label: brand.name,
                      value: brand.id,
                    }))}
                  />
                </Form.Item>
              </div>

              {/* COLORS */}

              <div className="mt-2">
                <p
                  className={
                    darkMode
                      ? "text-white font-bold text-[15px]"
                      : "text-[#023337] font-bold text-[15px]"
                  }
                >
                  Select your color
                  <span className="text-gray-400 font-normal">
                    {" "}
                    (ixtiyoriy)
                  </span>
                </p>

                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  {COLORS.map((color) => (
                    <button
                      type="button"
                      key={color.name}
                      onClick={() =>
                        setSelectedColor((prev) =>
                          prev === color.name ? null : color.name,
                        )
                      }
                      style={{
                        background: color.hex,
                      }}
                      className={`cursor-pointer rounded-lg w-12 h-12 border ${
                        selectedColor === color.name
                          ? "border-[#4EA674] border-2"
                          : darkMode
                            ? "border-[#6B7280]"
                            : "border-[#00000033]"
                      }`}
                      aria-label={color.name}
                    />
                  ))}
                </div>

                {selectedColor && (
                  <p
                    className={
                      darkMode
                        ? "text-gray-300 text-sm mt-2"
                        : "text-gray-500 text-sm mt-2"
                    }
                  >
                    Tanlangan rang: {selectedColor}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Form>
      </div>
    </ConfigProvider>
  );
}
