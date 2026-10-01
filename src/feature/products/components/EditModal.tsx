import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  message,
  theme,
} from "antd";
import { isAxiosError } from "axios";

import { useEffect } from "react";

import { useTheme } from "../../../context/modContext";

import CategoriesService from "../../categories/service/CategoriesService";
import Brands from "../../brands/hook/Brands";
import ProductService from "../service/ProductService";

import type { UpdateProductInput } from "../types/ProductTypes";
import { Plus, Save, Trash2 } from "lucide-react";
import type { CategoryType } from "../../categories/types/CategoriesType";
import ImageUpload from "../../components/ImageUpload";

const { darkAlgorithm, defaultAlgorithm } = theme;

interface Props {
  open: boolean;
  productId?: string;
  onClose: () => void;
}

export default function EditModal({
  open,
  productId,
  onClose,
}: Props) {
  const { darkMode } = useTheme();

  const [form] = Form.useForm<UpdateProductInput>();

  const { useUpdateProduct, useProductById } = ProductService();

  const { data: productData, isLoading: productLoading } =
    useProductById(productId);

  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const { data: categoriesData, isLoading: categoriesLoading } =
    CategoriesService();

  const { data:brandsData, isPending:isBrands } = Brands();

  const categories:CategoryType[] = categoriesData?.data ?? [];

  const brands = brandsData?.data ?? [];

  // ========================================
  // PRODUCT DATA -> FORM
  // ========================================

  useEffect(() => {
    if (!open || !productData) return;

    const product = productData?.data ?? productData;

    form.setFieldsValue({
      name: product.name ?? "",

      slug: product.slug ?? "",

      description: product.description ?? "",

      shortDescription: product.shortDescription ?? "",

      sku: product.sku ?? "",

      barcode: product.barcode ?? "",

      price: product.price ?? 0,

      oldPrice: product.oldPrice ?? 0,

      discountPercent: product.discountPercent ?? 0,

      stock: product.stock ?? 0,

      lowStockThreshold: product.lowStockThreshold ?? 5,

      brandId: product.brandId ?? "",

      categoryId: product.categoryId ?? "",

      isActive: product.isActive ?? true,

      isFeatured: product.isFeatured ?? false,

      isNew: product.isNew ?? false,

      isPopular: product.isPopular ?? false,

      images: product.images ?? [],

      variants: product.variants ?? [],
    });
  }, [open, productData, form]);

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!productId) {
        message.error("Product ID topilmadi");
        return;
      }

      const payload: UpdateProductInput = {
        name: values.name.trim(),

        slug: values.slug.trim(),

        description: values.description.trim(),

        shortDescription: values.shortDescription.trim(),

        sku: values.sku.trim(),

        barcode: values.barcode?.trim() ?? "",

        price: values.price,

        oldPrice: values.oldPrice ?? 0,

        discountPercent: values.discountPercent ?? 0,

        stock: values.stock ?? 0,

        lowStockThreshold: values.lowStockThreshold ?? 5,

        brandId: values.brandId,

        categoryId: values.categoryId,

        isActive: values.isActive,

        isFeatured: values.isFeatured,

        isNew: values.isNew,

        isPopular: values.isPopular,

        images: values.images ?? [],

        variants: values.variants ?? [],
      };

      updateProduct(
        {
          id: productId,
          data: payload,
        },
        {
          onSuccess: () => {
            message.success("Mahsulot muvaffaqiyatli yangilandi");

            form.resetFields();

            onClose();
          },

          onError: (error: unknown) => {
            console.error("UPDATE PRODUCT ERROR:", error);

            message.error(
              (isAxiosError<{ message?: string }>(error)
                ? error.response?.data?.message
                : undefined) ??
                "Mahsulotni yangilashda xatolik yuz berdi",
            );
          },
        },
      );
    } catch (error) {
      console.log("UPDATE VALIDATION ERROR:", error);
    }
  };

  // ========================================
  // CLOSE
  // ========================================

  const handleClose = () => {
    form.resetFields();

    onClose();
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

            colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

            optionSelectedBg: darkMode ? "#4EA674" : "#E8F5EE",

            optionActiveBg: darkMode ? "#4B5563" : "#F3F4F6",
          },

          Modal: {
            contentBg: darkMode ? "#1F2937" : "#FFFFFF",

            headerBg: darkMode ? "#1F2937" : "#FFFFFF",

            footerBg: darkMode ? "#1F2937" : "#FFFFFF",
          },

          Form: {
            labelColor: darkMode ? "#E5E7EB" : "#111827",
          },

          Checkbox: {
            colorText: darkMode ? "#F9FAFB" : "#111827",
          },

          Switch: {
            colorPrimary: "#4EA674",

            colorPrimaryHover: "#5DBA83",
          },
        },
      }}
    >
      <Modal
        open={open}
        title={
          <span
            className={
              darkMode
                ? "text-white text-[20px] font-bold"
                : "text-[#023337] text-[20px] font-bold"
            }
          >
            Edit Product
          </span>
        }
        onCancel={handleClose}
        footer={null}
        width="min(750px, calc(100vw - 16px))"
        centered
        destroyOnHidden
        loading={productLoading}
        styles={{
          body: { maxHeight: "calc(100dvh - 180px)", overflowY: "auto" },
        }}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          {/* ========================= */}
          {/* BASIC DETAILS */}
          {/* ========================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Product Name"
              rules={[
                {
                  required: true,
                  message: "Mahsulot nomini kiriting",
                },
              ]}
            >
              <Input placeholder="iPhone 15 Pro" />
            </Form.Item>

            <Form.Item
              name="sku"
              label="SKU"
              rules={[
                {
                  required: true,
                  message: "SKU kiriting",
                },
              ]}
            >
              <Input placeholder="IPH15P-256" />
            </Form.Item>
          </div>

          {/* SLUG */}

          <Form.Item
            name="slug"
            label="Slug"
            rules={[
              {
                required: true,
                message: "Slug kiriting",
              },
            ]}
          >
            <Input placeholder="iphone-15-pro" />
          </Form.Item>

          {/* DESCRIPTION */}

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Description kiriting",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Product description" />
          </Form.Item>

          {/* SHORT DESCRIPTION */}

          <Form.Item name="shortDescription" label="Short Description">
            <Input.TextArea rows={2} placeholder="Short description" />
          </Form.Item>

          {/* ========================= */}
          {/* PRICING */}
          {/* ========================= */}

          <p
            className={
              darkMode
                ? "text-white text-[18px] font-bold mb-4"
                : "text-[#23272E] text-[18px] font-bold mb-4"
            }
          >
            Pricing
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Price kiriting",
                },
              ]}
            >
              <InputNumber min={0} className="w-full" placeholder="14999000" />
            </Form.Item>

            <Form.Item name="oldPrice" label="Old Price">
              <InputNumber min={0} className="w-full" placeholder="0" />
            </Form.Item>

            <Form.Item name="discountPercent" label="Discount %">
              <InputNumber
                min={0}
                max={100}
                className="w-full"
                placeholder="0"
              />
            </Form.Item>
          </div>

          {/* ========================= */}
          {/* INVENTORY */}
          {/* ========================= */}

          <p
            className={
              darkMode
                ? "text-white text-[18px] font-bold mb-4"
                : "text-[#23272E] text-[18px] font-bold mb-4"
            }
          >
            Inventory
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              name="stock"
              label="Stock"
              rules={[
                {
                  required: true,
                  message: "Stock kiriting",
                },
              ]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>

            <Form.Item name="lowStockThreshold" label="Low Stock Threshold">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>

          {/* ========================= */}
          {/* CATEGORY / BRAND */}
          {/* ========================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              name="categoryId"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Kategoriyani tanlang",
                },
              ]}
            >
              <Select
                loading={categoriesLoading}
                placeholder="Kategoriyani tanlang"
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
            </Form.Item>

            <Form.Item
              name="brandId"
              label="Brand"
              rules={[
                {
                  required: true,
                  message: "Brendni tanlang",
                },
              ]}
            >
              <Select
                loading={isBrands}
                placeholder="Brendni tanlang"
                options={brands.map((brand) => ({
                  label: brand.name,
                  value: brand.id,
                }))}
              />
            </Form.Item>
          </div>

          {/* ========================= */}
          {/* BARCODE */}
          {/* ========================= */}

          <Form.Item name="barcode" label="Barcode">
            <Input placeholder="Barcode" />
          </Form.Item>

          {/* ========================= */}
          {/* STATUS */}
          {/* ========================= */}

          <div
            className={
              darkMode
                ? "border border-[#374151] rounded-lg p-4 mb-5"
                : "border border-[#E5E7EB] rounded-lg p-4 mb-5"
            }
          >
            <p
              className={
                darkMode
                  ? "text-white font-bold mb-4"
                  : "text-[#23272E] font-bold mb-4"
              }
            >
              Product Status
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                name="isActive"
                valuePropName="checked"
                className="mb-0"
              >
                <div className="flex items-center gap-3">
                  <Switch />

                  <span>Active</span>
                </div>
              </Form.Item>

              <Form.Item
                name="isFeatured"
                valuePropName="checked"
                className="mb-0"
              >
                <Checkbox>Featured Product</Checkbox>
              </Form.Item>

              <Form.Item name="isNew" valuePropName="checked" className="mb-0">
                <Checkbox>New Product</Checkbox>
              </Form.Item>

              <Form.Item
                name="isPopular"
                valuePropName="checked"
                className="mb-0"
              >
                <Checkbox>Popular Product</Checkbox>
              </Form.Item>
            </div>
          </div>

          {/* ========================= */}
          {/* IMAGE */}
          {/* ========================= */}

          <p
            className={
              darkMode
                ? "text-white font-bold mb-3"
                : "text-[#23272E] font-bold mb-3"
            }
          >
            Main Image
          </p>

          <Form.List name="images">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <div
                    key={key}
                    className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_100px_auto]"
                  >
                    <Form.Item
                      name={[name, "url"]}
                      rules={[{ required: true, message: "Rasm yuklang" }]}
                      className="min-w-0"
                    >
                      <ImageUpload previewAlt="Product image" />
                    </Form.Item>

                    <Form.Item name={[name, "sortOrder"]}>
                      <InputNumber min={0} className="w-full" />
                    </Form.Item>

                    <Button
                      danger
                      aria-label="Remove product image"
                      icon={<Trash2 size={16} />}
                      onClick={() => remove(name)}
                    />
                  </div>
                ))}

                <Button
                  type="dashed"
                  icon={<Plus size={16} />}
                  onClick={() =>
                    add({
                      url: "",
                      alt: form.getFieldValue("name") ?? "",
                      isMain: fields.length === 0,
                      sortOrder: fields.length,
                    })
                  }
                  className="w-full sm:w-auto"
                >
                  Add image
                </Button>
              </>
            )}
          </Form.List>

          {/* ========================= */}
          {/* FOOTER */}
          {/* ========================= */}

          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={handleClose}
              disabled={isUpdating}
              className="h-[40px]"
            >
              Cancel
            </Button>

            <Button
              type="primary"
              loading={isUpdating}
              onClick={handleSubmit}
              className="h-[40px] px-6 font-bold"
            >
              <Save size={17} />
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}
