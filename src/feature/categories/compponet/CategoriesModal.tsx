import { ConfigProvider, Form, Input, InputNumber, Modal, Switch } from "antd";

import { useEffect } from "react";

import foto from "../../../assets/img/iphone1.png";

import type { CategoryType, CreateCategoryType } from "../types/CategoriesType";
import { useTheme } from "../../../context/modContext";
import ImageUpload from "../../components/ImageUpload";

interface Props {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: CreateCategoryType) => void;

  // Edit qilinayotgan category
  editData?: CategoryType | null;
}

export default function CategoriesModal({
  open,
  loading,
  onClose,
  onSubmit,
  editData,
}: Props) {
  const [form] = Form.useForm<CreateCategoryType>();
  const { darkMode } = useTheme();

  useEffect(() => {
    if (!open) return;

    // =========================
    // EDIT
    // =========================

    if (editData) {
      form.setFieldsValue({
        name: editData.name,
        slug: editData.slug,
        description: editData.description || "",
        image: editData.image || null,
        parentId: editData.parentId || undefined,
        isActive: editData.isActive,
        sortOrder: editData.sortOrder ?? 0,
      });

      return;
    }

    // =========================
    // CREATE
    // =========================

    form.resetFields();

    form.setFieldsValue({
      name: "",
      slug: "",
      description: "",
      image: null,
      parentId: undefined,
      isActive: true,
      sortOrder: 0,
    });
  }, [open, editData, form]);

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      console.log("FORM:", values);

      const data: CreateCategoryType = {
        name: values.name,
        slug: values.slug,
        description: values.description || "",
        image: values.image || foto,
        parentId: values.parentId || undefined,
        isActive: values.isActive,
        sortOrder: values.sortOrder ?? 0,
      };

      onSubmit(data);
    } catch (error) {
      console.log("FORM ERROR:", error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4EA674",
          borderRadius: 8,

          colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",
          colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

          colorText: darkMode ? "#F9FAFB" : "#111827",
          colorTextSecondary: darkMode ? "#9CA3AF" : "#6B7280",
          colorTextPlaceholder: darkMode ? "#6B7280" : "#9CA3AF",

          colorBorder: darkMode ? "#374151" : "#D1D5DB",
        },

        components: {
          Modal: {
            contentBg: darkMode ? "#1F2937" : "#FFFFFF",
            headerBg: darkMode ? "#1F2937" : "#FFFFFF",
            titleColor: darkMode ? "#FFFFFF" : "#111827",
            footerBg: darkMode ? "#1F2937" : "#FFFFFF",
            colorIcon: darkMode ? "#9CA3AF" : "#6B7280",
            colorIconHover: darkMode ? "#FFFFFF" : "#111827",
          },

          Input: {
            colorBgContainer: darkMode ? "#374151" : "#FFFFFF",
            colorText: darkMode ? "#FFFFFF" : "#111827",
            colorTextPlaceholder: darkMode ? "#9CA3AF" : "#9CA3AF",

            colorBorder: darkMode ? "#4B5563" : "#D1D5DB",
            hoverBorderColor: "#4EA674",
            activeBorderColor: "#4EA674",
            activeShadow: "0 0 0 2px rgba(78,166,116,0.15)",
          },

          InputNumber: {
            colorBgContainer: darkMode ? "#374151" : "#FFFFFF",
            colorText: darkMode ? "#FFFFFF" : "#111827",

            colorBorder: darkMode ? "#4B5563" : "#D1D5DB",
            hoverBorderColor: "#4EA674",
            activeBorderColor: "#4EA674",
            activeShadow: "0 0 0 2px rgba(78,166,116,0.15)",
          },

          Switch: {
            colorPrimary: "#4EA674",
            colorPrimaryHover: "#5DBA83",

            handleBg: "#FFFFFF",
            trackHeight: 22,
          },

          Form: {
            labelColor: darkMode ? "#D1D5DB" : "#374151",
          },

          Button: {
            colorPrimary: "#4EA674",
            colorPrimaryHover: "#5DBA83",
            colorPrimaryActive: "#3d8f60",
            primaryShadow: "none",
            defaultBg: darkMode ? "#374151" : "#FFFFFF",
            defaultColor: darkMode ? "#F9FAFB" : "#111827",
            defaultBorderColor: darkMode ? "#4B5563" : "#D1D5DB",
            defaultHoverBg: darkMode ? "#4B5563" : "#F3F4F6",
            defaultHoverBorderColor: "#4EA674",
            defaultHoverColor: darkMode ? "#FFFFFF" : "#111827",
          },
        },
      }}
    >
      <Modal
        title={editData ? "Edit Category" : "Create Category"}
        open={open}
        onCancel={onClose}
        onOk={handleSubmit}
        width="min(520px, calc(100vw - 24px))"
        okText={editData ? "Update" : "Create"}
        cancelText="Cancel"
        confirmLoading={loading}
        centered
        styles={{
          body: { maxHeight: "calc(100dvh - 180px)", overflowY: "auto" },
        }}
      >
        <Form form={form} layout="vertical" className="mt-5">
          {/* ================= NAME ================= */}

          <Form.Item
            label="Category name"
            name="name"
            rules={[
              {
                required: true,
                message: "Category nomini kiriting",
              },
            ]}
          >
            <Input placeholder="Smartphones" size="large" />
          </Form.Item>

          {/* ================= SLUG ================= */}

          <Form.Item
            label="Slug"
            name="slug"
            rules={[
              {
                required: true,
                message: "Slug kiriting",
              },
            ]}
          >
            <Input placeholder="smartphones" size="large" />
          </Form.Item>

          {/* ================= DESCRIPTION ================= */}

          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Smartphones category" rows={4} />
          </Form.Item>

          {/* ================= IMAGE ================= */}

          <Form.Item label="Image" name="image">
            <ImageUpload
              buttonText="Kategoriya rasmini yuklash"
              previewAlt="Category image"
            />
          </Form.Item>

          {/* ================= SORT + ACTIVE ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              label="Sort Order"
              name="sortOrder"
              rules={[
                {
                  required: true,
                  message: "Sort order kiriting",
                },
              ]}
            >
              <InputNumber
                min={0}
                className="w-full"
                size="large"
                placeholder="1"
              />
            </Form.Item>

            <Form.Item label="Active" name="isActive" valuePropName="checked">
              <Switch />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}
