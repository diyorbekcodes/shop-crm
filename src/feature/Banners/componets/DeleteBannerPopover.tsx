
import { Button, Popover } from "antd";
import { Trash2 } from "lucide-react";

interface DeleteBannerPopoverProps {
  open: boolean;
  darkMode: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteBannerPopover({
  open,
  darkMode,
  loading,
  onOpenChange,
  onCancel,
  onDelete,
}: DeleteBannerPopoverProps) {
  return (
    <Popover
      trigger="click"
      placement="topRight"
      open={open}
      onOpenChange={onOpenChange}
      rootClassName="banner-delete-popover"
      content={
        <div
          className={`w-[280px] rounded-lg ${
            darkMode ? "bg-[#111827]" : "bg-white"
          }`}
        >
          <div className="flex items-start gap-3 p-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                darkMode
                  ? "border border-red-500/20 bg-red-500/10 text-red-400"
                  : "border border-red-100 bg-red-50 text-red-500"
              }`}
            >
              <Trash2 size={18} />
            </div>

            <div>
              <h4
                className={`text-sm font-semibold ${
                  darkMode
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                Bannerni o‘chirish?
              </h4>

              <p
                className={`mt-1 text-xs leading-5 ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Ushbu banner o‘chiriladi.
              </p>
            </div>
          </div>

          <div
            className={`border-t ${
              darkMode
                ? "border-[#374151]"
                : "border-gray-200"
            }`}
          />

          <div className="flex justify-end gap-2 p-3">
            <Button
              size="small"
              onClick={onCancel}
              className={
                darkMode
                  ? "!h-8 !rounded-lg !border-[#374151] !bg-[#1F2937] !text-gray-300"
                  : "!h-8 !rounded-lg"
              }
            >
              Cancel
            </Button>

            <Button
              danger
              size="small"
              loading={loading}
              onClick={onDelete}
              icon={<Trash2 size={14} />}
              className={`!h-8 !rounded-lg !px-3 ${
                darkMode
                  ? "!border-red-500/40 !bg-red-500/10 !text-red-400 hover:!border-red-500/60 hover:!bg-red-500/20 hover:!text-red-300"
                  : "!border-red-200 !bg-red-50 !text-red-500 hover:!border-red-300 hover:!bg-red-100"
              }`}
            >
              Delete
            </Button>
          </div>
        </div>
      }
      styles={{
        body: {
          padding: 0,
          border: darkMode
            ? "1px solid #374151"
            : "1px solid #E5E7EB",
          borderRadius: 16,
          background: darkMode
            ? "#111827"
            : "#ffffff",
          boxShadow: darkMode
            ? "0 20px 50px rgba(0,0,0,0.55)"
            : "0 15px 40px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Button
        danger
        icon={<Trash2 size={16} />}
        className={`!h-10 !w-10 !rounded-xl ${
          darkMode
            ? "!border-red-900/60 !bg-red-950/40 !text-red-400 hover:!border-red-500/60 hover:!bg-red-500/10"
            : "!border-red-200 !bg-red-50 !text-red-500"
        }`}
      />
    </Popover>
  );
}
