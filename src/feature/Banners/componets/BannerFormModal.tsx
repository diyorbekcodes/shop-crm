
import {
  Button,
  Form,
  Input,
  Modal,
  Switch,
} from "antd";

import { X } from "lucide-react";

import type { BannerFormValues } from "../types/BannersType";

interface BannerFormModalProps {
  open: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  form: ReturnType<typeof Form.useForm<BannerFormValues>>[0];
  darkMode: boolean;
  loading: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  submitText: string;
}

export default function BannerFormModal({
  open,
  title,
  description,
  icon,
  form,
  darkMode,
  loading,
  onCancel,
  onSubmit,
  submitText,
}: BannerFormModalProps) {
  const inputClass = darkMode
    ? "!border-[#374151] !bg-[#1F2937] !text-white placeholder:!text-gray-500 hover:!border-[#4EA674] focus:!border-[#4EA674]"
    : "";

  const labelClass = darkMode ? "text-gray-200" : "text-gray-700";

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={600}
      className="banner-modal"
      closeIcon={
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            darkMode
              ? "bg-[#1F2937] text-gray-400 hover:bg-[#374151] hover:text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <X size={17} />
        </div>
      }
      styles={{
        mask: {
          backgroundColor: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(5px)",
        },
       
        body: {
          padding: 0,
        },
      }}
    >
      <div className={darkMode ? "bg-[#111827] p-6" : "bg-white p-6"}>
        <div className="mb-6">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#4EA674]/10 text-[#4EA674]">
            {icon}
          </div>

          <h2
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>

          <p
            className={`mt-1 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {description}
          </p>
        </div>

        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label={<span className={labelClass}>Title</span>}
            rules={[
              {
                required: true,
                message: "Title kiriting",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="New iPhone 15 Pro"
              className={inputClass}
            />
          </Form.Item>

          <Form.Item
            name="subtitle"
            label={<span className={labelClass}>Subtitle</span>}
            rules={[
              {
                required: true,
                message: "Subtitle kiriting",
              },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Titanium. So strong. So light. So Pro."
              className={inputClass}
            />
          </Form.Item>

          <Form.Item
            name="image"
            label={
              <span className={labelClass}>
                Desktop Image URL
              </span>
            }
            rules={[
              {
                required: true,
                message: "Desktop Image URL kiriting",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="https://example.com/banner.jpg"
              className={inputClass}
            />
          </Form.Item>

          <Form.Item
            name="mobileImage"
            label={
              <span className={labelClass}>
                Mobile Image URL
              </span>
            }
          >
            <Input
              size="large"
              placeholder="https://example.com/mobile-banner.jpg"
              className={inputClass}
            />
          </Form.Item>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              name="buttonText"
              label={
                <span className={labelClass}>
                  Button Text
                </span>
              }
            >
              <Input
                size="large"
                placeholder="Shop Now"
                className={inputClass}
              />
            </Form.Item>

            <Form.Item
              name="link"
              label={<span className={labelClass}>Link</span>}
            >
              <Input
                size="large"
                placeholder="/products"
                className={inputClass}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              name="sortOrder"
              label={
                <span className={labelClass}>
                  Sort Order
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Sort order kiriting",
                },
              ]}
            >
              <Input
                type="number"
                size="large"
                min={0}
                placeholder="0"
                className={inputClass}
              />
            </Form.Item>

            <Form.Item
              name="isActive"
              label={<span className={labelClass}>Status</span>}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              name="startDate"
              label={
                <span className={labelClass}>
                  Start Date
                </span>
              }
            >
              <Input
                type="datetime-local"
                size="large"
                className={inputClass}
              />
            </Form.Item>

            <Form.Item
              name="endDate"
              label={
                <span className={labelClass}>
                  End Date
                </span>
              }
            >
              <Input
                type="datetime-local"
                size="large"
                className={inputClass}
              />
            </Form.Item>
          </div>

          <div
            className="mt-7 flex justify-end gap-3 border-t pt-5"
            style={{
              borderColor: darkMode
                ? "#374151"
                : "#e5e7eb",
            }}
          >
            <Button
              onClick={onCancel}
              className={`!h-10 !rounded-xl ${
                darkMode
                  ? "!border-[#374151] !bg-[#1F2937] !text-gray-300 hover:!border-[#4B5563] hover:!bg-[#374151] hover:!text-white"
                  : ""
              }`}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              loading={loading}
              onClick={onSubmit}
              className="!h-10 !rounded-xl"
            >
              {submitText}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
