import {
  ConfigProvider,
  Form,
  Input,
  Modal,
  Switch,
  Spin,
  message,
  theme,
} from "antd";
import { isAxiosError } from "axios";

import { Image as ImageIcon, Save, Tag } from "lucide-react";

import { useEffect } from "react";

import BrandService from "../hook/Brands";

import { useTheme } from "../../../context/modContext";

import type { CreateBrandInput } from "../types/BrandTypes";
import ImageUpload from "../../components/ImageUpload";

interface BrandModalProps {
  open: boolean;
  brandId?: string;
  onClose: () => void;
}

const { darkAlgorithm, defaultAlgorithm } = theme;

export default function BrandModal({
  open,
  brandId,
  onClose,
}: BrandModalProps) {
  const { darkMode } = useTheme();

  const [form] = Form.useForm<CreateBrandInput>();

  const { data, isPending, useCreateBrand, useUpdateBrand } = BrandService();

  const createBrand = useCreateBrand();

  const updateBrand = useUpdateBrand();

  const isEdit = Boolean(brandId);

  const brandData = data?.data?.find((brand) => brand.id === brandId);

  // FORM DATA
  useEffect(() => {
    if (!open) {
      return;
    }

    if (brandId && brandData) {
      form.setFieldsValue({
        name: brandData.name,
        slug: brandData.slug,
        description: brandData.description,
        logo: brandData.logo,
        isActive: brandData.isActive,
      });
    } else if (!brandId) {
      form.resetFields();

      form.setFieldsValue({
        isActive: true,
      });
    }
  }, [open, brandId, brandData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload: CreateBrandInput = {
        name: values.name.trim(),
        slug: values.slug.trim().toLowerCase(),
        description: values.description?.trim() || "",
        logo: values.logo?.trim() || "",
        isActive: values.isActive ?? true,
      };

      // CREATE
      if (!isEdit) {
        createBrand.mutate(payload, {
          onSuccess: () => {
            message.success("Brand muvaffaqiyatli yaratildi");

            form.resetFields();

            onClose();
          },

          onError: (error: unknown) => {
            message.error(
              (isAxiosError<{ message?: string }>(error)
                ? error.response?.data?.message
                : undefined) || "Brand yaratishda xatolik",
            );
          },
        });

        return;
      }

      // UPDATE
      updateBrand.mutate(
        {
          id: brandId!,
          data: payload,
        },
        {
          onSuccess: () => {
            message.success("Brand muvaffaqiyatli yangilandi");

            form.resetFields();

            onClose();
          },

          onError: (error: unknown) => {
            message.error(
              (isAxiosError<{ message?: string }>(error)
                ? error.response?.data?.message
                : undefined) || "Brandni yangilashda xatolik",
            );
          },
        },
      );
    } catch {
      // validation error
    }
  };

  const loading = createBrand.isPending || updateBrand.isPending;

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,

        token: {
          colorPrimary: "#4EA674",

          colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

          colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",

          colorText: darkMode ? "#F9FAFB" : "#1F2937",

          colorTextSecondary: darkMode ? "#9CA3AF" : "#64748B",

          colorTextPlaceholder: "#9CA3AF",

          colorBorder: darkMode ? "#374151" : "#DCE8E3",

          borderRadius: 6,
        },

        components: {
          Modal: {
            contentBg: darkMode ? "#1F2937" : "#FFFFFF",

            headerBg: darkMode ? "#1F2937" : "#FFFFFF",

            titleColor: darkMode ? "#F9FAFB" : "#263B35",
          },

          Input: {
            activeBorderColor: "#4EA674",

            hoverBorderColor: "#4EA674",

            activeShadow: "none",

            colorIcon: darkMode ? "#9CA3AF" : "#6B7280",
          },

          Button: {
            primaryShadow: "none",
          },
        },
      }}
    >
      <Modal
        open={open}
        onCancel={() => {
          form.resetFields();
          onClose();
        }}
        title={
          <div className="flex items-center gap-3">
            <div
              className={
                darkMode
                  ? "flex h-9 w-9 items-center justify-center rounded-sm bg-[#111827] text-[#4EA674]"
                  : "flex h-9 w-9 items-center justify-center rounded-sm bg-[#EAF6F0] text-[#2F8F68]"
              }
            >
              <Tag size={19} />
            </div>

            <div>
              <h3 className="text-base font-semibold">
                {isEdit ? "Brandni tahrirlash" : "Yangi brand"}
              </h3>

              <p
                className={
                  darkMode
                    ? "mt-0.5 text-xs font-normal text-[#9CA3AF]"
                    : "mt-0.5 text-xs font-normal text-[#64748B]"
                }
              >
                {isEdit
                  ? "Brand ma'lumotlarini yangilang"
                  : "Yangi brand ma'lumotlarini kiriting"}
              </p>
            </div>
          </div>
        }
        width="min(550px, calc(100vw - 24px))"
        centered
        destroyOnClose={false}
        styles={{
          body: { maxHeight: "calc(100dvh - 180px)", overflowY: "auto" },
        }}
        footer={
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                form.resetFields();
                onClose();
              }}
              className={
                darkMode
                  ? "h-10 rounded-sm border border-[#374151] bg-[#111827] px-5 text-sm text-[#D1D5DB] transition hover:border-[#4EA674] hover:text-[#4EA674]"
                  : "h-10 rounded-sm border border-[#DCE8E3] bg-white px-5 text-sm text-[#52665F] transition hover:border-[#4EA674] hover:bg-[#F0F8F4] hover:text-[#2F8F68]"
              }
            >
              Bekor qilish
            </button>

            <button
              type="button"
              disabled={loading || isPending}
              onClick={handleSubmit}
              className="flex h-10 items-center gap-2 rounded-sm bg-[#4EA674] px-5 text-sm font-medium text-white transition hover:bg-[#3D8F60] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Spin
                  size="small"
                  className="[&_.ant-spin-dot-item]:!bg-white"
                />
              ) : (
                <Save size={17} />
              )}

              {isEdit ? "Saqlash" : "Yaratish"}
            </button>
          </div>
        }
      >
        {isEdit && isPending ? (
          <div className="flex h-[300px] items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <Form form={form} layout="vertical" requiredMark={false}>
            {/* NAME */}

            <Form.Item
              name="name"
              label="Brand nomi"
              rules={[
                {
                  required: true,
                  message: "Brand nomini kiriting",
                },

                {
                  min: 2,
                  message: "Kamida 2 ta belgi bo'lishi kerak",
                },
              ]}
            >
              <Input size="large" placeholder="Masalan: Apple" />
            </Form.Item>

            {/* SLUG */}

            <Form.Item
              name="slug"
              label="Slug"
              rules={[
                {
                  required: true,
                  message: "Slugni kiriting",
                },

                {
                  pattern: /^[a-z0-9-]+$/,
                  message: "Faqat kichik harf, raqam va - ishlating",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="apple"
                prefix={
                  <span
                    className={darkMode ? "text-[#6B7280]" : "text-[#9CA3AF]"}
                  >
                    /
                  </span>
                }
              />
            </Form.Item>

            {/* DESCRIPTION */}

            <Form.Item name="description" label="Description">
              <Input.TextArea
                rows={4}
                placeholder="Brand haqida qisqacha ma'lumot..."
                showCount
                maxLength={500}
              />
            </Form.Item>

            {/* LOGO */}

            <Form.Item name="logo" label="Logo">
              <ImageUpload buttonText="Logo yuklash" previewAlt="Brand logo" />
            </Form.Item>

            {/* LOGO PREVIEW */}

            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) => {
                const logo = getFieldValue("logo");

                if (!logo || logo === "string") {
                  return null;
                }

                return (
                  <div
                    className={
                      darkMode
                        ? "mb-5 rounded-sm border border-[#374151] bg-[#111827] p-4"
                        : "mb-5 rounded-sm border border-[#E2EDE9] bg-[#F8FBFA] p-4"
                    }
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <ImageIcon
                        size={16}
                        className={
                          darkMode ? "text-[#4EA674]" : "text-[#2F8F68]"
                        }
                      />

                      <span
                        className={
                          darkMode
                            ? "text-xs text-[#9CA3AF]"
                            : "text-xs text-[#64748B]"
                        }
                      >
                        Logo preview
                      </span>
                    </div>

                    <div
                      className={
                        darkMode
                          ? "flex h-24 items-center justify-center rounded-sm bg-[#1F2937]"
                          : "flex h-24 items-center justify-center rounded-sm bg-white"
                      }
                    >
                      <img
                        src={logo}
                        alt="Brand logo"
                        className="max-h-20 max-w-[180px] object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            </Form.Item>

            {/* ACTIVE */}

            <Form.Item name="isActive" label="Holati" valuePropName="checked">
              <Switch checkedChildren="Faol" unCheckedChildren="Nofaol" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </ConfigProvider>
  );
}
