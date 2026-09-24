import {
  Button,
  Card,
  Empty,
  Form,
  Image,
  Input,
  Modal,
  Popover,
  Skeleton,
  Switch,
  message,
} from "antd";

import {
  CalendarDays,
  Edit3,
  ExternalLink,
  Eye,
  ImageIcon,
  Link2,
  Plus,
  Smartphone,
  Trash2,
  X,
} from "lucide-react";

import { useState } from "react";

import {
  useBanners,
  useCreateBanner,
  useDeleteBanner,
  useToggleBannerStatus,
  useUpdateBanner,
} from "../hook/Banner";

import { useTheme } from "../../../context/modContext";

import type { Banner } from "../types/banner";

interface BannerFormValues {
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

export default function Banners() {
  const { darkMode } = useTheme();

  // =====================================================
  // HOOKS
  // =====================================================

  const { data, isPending } = useBanners();

  const { mutate: createBanner, isPending: isCreating } = useCreateBanner();

  const { mutate: updateBanner, isPending: isUpdating } = useUpdateBanner();

  const { mutate: deleteBanner, isPending: isDeleting } = useDeleteBanner();

  const { mutate: toggleBannerStatus, isPending: isTogglingStatus } =
    useToggleBannerStatus();

  // =====================================================
  // FORM
  // =====================================================

  const [form] = Form.useForm<BannerFormValues>();

  // =====================================================
  // STATES
  // =====================================================

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // =====================================================
  // DATA
  // =====================================================

  const banners: Banner[] = data?.data ?? [];

  // =====================================================
  // COLORS
  // =====================================================

  const cardClass = darkMode
    ? "!border-[#374151] !bg-[#1F2937]"
    : "!border-gray-200 !bg-white";

  const innerClass = darkMode
    ? "border-[#374151] bg-[#111827]"
    : "border-gray-200 bg-gray-50";

  const titleClass = darkMode ? "text-white" : "text-gray-900";

  const mutedClass = darkMode ? "text-gray-400" : "text-gray-500";

  const inputClass = darkMode
    ? "!border-[#374151] !bg-[#1F2937] !text-white placeholder:!text-gray-500 hover:!border-[#4EA674] focus:!border-[#4EA674]"
    : "";

  const modalClass = darkMode ? "bg-[#111827]" : "bg-white";

  // =====================================================
  // OPEN ADD
  // =====================================================

  const handleOpenAdd = () => {
    form.resetFields();

    form.setFieldsValue({
      title: "",
      subtitle: "",
      image: "",
      mobileImage: "",
      buttonText: "",
      link: "",
      sortOrder: 0,
      isActive: true,
      startDate: "",
      endDate: "",
    });

    setIsAddModalOpen(true);
  };

  // =====================================================
  // CLOSE ADD
  // =====================================================

  const handleCloseAdd = () => {
    setIsAddModalOpen(false);
    form.resetFields();
  };

  // =====================================================
  // CREATE
  // =====================================================

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();

      createBanner(
        {
          title: values.title,
          subtitle: values.subtitle,
          image: values.image,
          mobileImage: values.mobileImage || "",
          buttonText: values.buttonText || "",
          link: values.link || "",
          sortOrder: Number(values.sortOrder),
          isActive: values.isActive,
          startDate: values.startDate
            ? new Date(values.startDate).toISOString()
            : "",
          endDate: values.endDate ? new Date(values.endDate).toISOString() : "",
        },
        {
          onSuccess: () => {
            message.success("Banner muvaffaqiyatli qo‘shildi");

            setIsAddModalOpen(false);
            form.resetFields();
          },

          onError: () => {
            message.error("Banner qo‘shishda xatolik yuz berdi");
          },
        },
      );
    } catch {
      // Validation error
    }
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);

    form.setFieldsValue({
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image,
      mobileImage: banner.mobileImage ?? "",
      buttonText: banner.buttonText ?? "",
      link: banner.link ?? "",
      sortOrder: banner.sortOrder,
      isActive: banner.isActive,

      startDate: banner.startDate
        ? new Date(banner.startDate).toISOString().slice(0, 16)
        : "",

      endDate: banner.endDate
        ? new Date(banner.endDate).toISOString().slice(0, 16)
        : "",
    });
  };

  // =====================================================
  // CLOSE EDIT
  // =====================================================

  const handleCloseEdit = () => {
    setEditingBanner(null);
    form.resetFields();
  };

  // =====================================================
  // UPDATE
  // =====================================================

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      if (!editingBanner) return;

      updateBanner(
        {
          id: editingBanner.id,

          data: {
            title: values.title,
            subtitle: values.subtitle,
            image: values.image,
            mobileImage: values.mobileImage || "",
            buttonText: values.buttonText || "",
            link: values.link || "",
            sortOrder: Number(values.sortOrder),
            isActive: values.isActive,

            startDate: values.startDate
              ? new Date(values.startDate).toISOString()
              : "",

            endDate: values.endDate
              ? new Date(values.endDate).toISOString()
              : "",
          },
        },

        {
          onSuccess: () => {
            message.success("Banner muvaffaqiyatli yangilandi");

            setEditingBanner(null);
            form.resetFields();
          },

          onError: () => {
            message.error("Bannerni yangilashda xatolik yuz berdi");
          },
        },
      );
    } catch {
      // Validation error
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = () => {
    if (!deleteId) return;

    deleteBanner(deleteId, {
      onSuccess: () => {
        message.success("Banner muvaffaqiyatli o‘chirildi");

        setDeleteId(null);
      },

      onError: () => {
        message.error("Bannerni o‘chirishda xatolik yuz berdi");
      },
    });
  };

  // =====================================================
  // ACTIVE / DEACTIVE
  // =====================================================

  const handleToggleStatus = (banner: Banner, checked: boolean) => {
    toggleBannerStatus(
      {
        id: banner.id,

        data: {
          isActive: checked,
        },
      },

      {
        onSuccess: () => {
          message.success(
            checked ? "Banner aktiv qilindi" : "Banner deaktiv qilindi",
          );
        },

        onError: () => {
          message.error("Banner holatini o‘zgartirishda xatolik yuz berdi");
        },
      },
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {[1, 2].map((item) => (
          <Card
            key={item}
            className={`overflow-hidden rounded-2xl ${cardClass}`}
            styles={{
              body: {
                padding: 0,
              },
            }}
          >
            <Skeleton.Image active className="!h-[240px] !w-full" />

            <div className="p-5">
              <Skeleton
                active
                paragraph={{
                  rows: 3,
                }}
              />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="w-full">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${titleClass}`}>
            Banners
          </h1>

          <p className={`mt-1 text-sm ${mutedClass}`}>
            Saytda ko‘rsatiladigan bannerlarni boshqaring
          </p>
        </div>

        <Button
          type="primary"
          icon={<Plus size={17} />}
          onClick={handleOpenAdd}
          className="!h-10 !rounded-xl !px-5"
        >
          Add Banner
        </Button>
      </div>

      {/* =================================================
          EMPTY
      ================================================= */}

      {!banners.length ? (
        <div
          className={`flex min-h-[450px] flex-col items-center justify-center rounded-2xl border ${
            darkMode
              ? "border-[#374151] bg-[#1F2937]"
              : "border-gray-200 bg-white"
          }`}
        >
          <div
            className={`mb-5 flex h-20 w-20 items-center justify-center rounded-2xl ${
              darkMode
                ? "bg-[#111827] text-gray-500"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <ImageIcon size={34} />
          </div>

          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className={mutedClass}>Bannerlar mavjud emas</span>
            }
          />

          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={handleOpenAdd}
            className="!mt-4 !h-10 !rounded-xl"
          >
            Add Banner
          </Button>
        </div>
      ) : (
        /* =================================================
           CARDS
        ================================================= */

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {[...banners]
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((banner) => (
              <Card
                key={banner.id}
                className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                  darkMode
                    ? "!border-[#374151] !bg-[#1F2937] hover:!border-[#4EA674] hover:shadow-[0_0_25px_rgba(78,166,116,0.08)]"
                    : "!border-gray-200 !bg-white hover:!border-gray-300 hover:shadow-lg"
                }`}
                styles={{
                  body: {
                    padding: 0,
                  },
                }}
              >
                {/* IMAGE */}

                <div className="relative h-[240px] overflow-hidden">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    preview
                    width="100%"
                    height="100%"
                    className="!h-full !w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* TOP */}

                  <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                      #{banner.sortOrder}
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md ${
                        banner.isActive
                          ? "border-green-400/20 bg-green-500/20 text-green-300"
                          : "border-red-400/20 bg-red-500/20 text-red-300"
                      }`}
                    >
                      {banner.isActive ? "● Active" : "● Inactive"}
                    </span>
                  </div>

                  {/* BOTTOM */}

                  <div className="absolute bottom-5 left-5 right-5">
                    <h2 className="line-clamp-1 text-xl font-bold text-white">
                      {banner.title}
                    </h2>

                    <p className="mt-1 line-clamp-2 text-sm text-gray-200">
                      {banner.subtitle}
                    </p>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3
                        className={`truncate text-lg font-semibold ${titleClass}`}
                      >
                        {banner.title}
                      </h3>

                      <p className={`mt-1 line-clamp-2 text-sm ${mutedClass}`}>
                        {banner.subtitle}
                      </p>
                    </div>

                    {/* ACTIVE SWITCH */}

                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <Switch
                        size="small"
                        checked={banner.isActive}
                        loading={isTogglingStatus}
                        onChange={(checked) =>
                          handleToggleStatus(banner, checked)
                        }
                      />

                      <span
                        className={`text-[11px] ${
                          banner.isActive ? "text-green-500" : mutedClass
                        }`}
                      >
                        {banner.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* INFO */}

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className={`rounded-xl border p-3 ${innerClass}`}>
                      <div className="mb-2 flex items-center gap-2">
                        <CalendarDays size={15} className={mutedClass} />

                        <span className={`text-xs ${mutedClass}`}>
                          Sort order
                        </span>
                      </div>

                      <p className={`font-semibold ${titleClass}`}>
                        #{banner.sortOrder}
                      </p>
                    </div>

                    <div className={`rounded-xl border p-3 ${innerClass}`}>
                      <div className="mb-2 flex items-center gap-2">
                        <Smartphone size={15} className={mutedClass} />

                        <span className={`text-xs ${mutedClass}`}>Mobile</span>
                      </div>

                      <p
                        className={`font-semibold ${
                          banner.mobileImage ? "text-green-500" : mutedClass
                        }`}
                      >
                        {banner.mobileImage ? "Available" : "No"}
                      </p>
                    </div>
                  </div>

                  {/* LINK */}

                  {banner.link && (
                    <div
                      className={`mt-4 flex items-center gap-2 rounded-xl border px-3 py-2.5 ${innerClass}`}
                    >
                      <Link2 size={15} className="shrink-0 text-blue-500" />

                      <span className={`truncate text-xs ${mutedClass}`}>
                        {banner.link}
                      </span>
                    </div>
                  )}

                  {/* BUTTONS */}

                  <div className="mt-5 grid grid-cols-[1fr_auto_auto_auto] gap-2">
                    {/* DETAILS */}

                    <Button
                      type="primary"
                      icon={<Eye size={16} />}
                      onClick={() => setSelectedBanner(banner)}
                      className="!h-10 !rounded-xl"
                    >
                      Details
                    </Button>

                    {/* LINK */}

                    {banner.link ? (
                      <Button
                        icon={<ExternalLink size={16} />}
                        href={banner.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`!h-10 !w-10 !rounded-xl ${
                          darkMode
                            ? "!border-[#4B5563] !bg-[#111827] !text-gray-300 hover:!border-[#6B7280] hover:!text-white"
                            : ""
                        }`}
                      />
                    ) : (
                      <div className="w-10" />
                    )}

                    {/* EDIT */}

                    <Button
                      icon={<Edit3 size={16} />}
                      onClick={() => handleEdit(banner)}
                      className={`!h-10 !w-10 !rounded-xl ${
                        darkMode
                          ? "!border-[#4B5563] !bg-[#111827] !text-gray-300 hover:!border-[#4EA674] hover:!text-[#4EA674]"
                          : ""
                      }`}
                    />

                    {/* DELETE */}

                    <Popover
                      trigger="click"
                      placement="topRight"
                      open={deleteId === banner.id}
                      onOpenChange={(open) =>
                        setDeleteId(open ? banner.id : null)
                      }
                      rootClassName="banner-delete-popover"
                      content={
                        <div
                          className={`w-[280px] rounded-lg ${
                            darkMode ? "bg-[#111827]" : "bg-white"
                          }`}
                        >
                          <div className="flex  items-start gap-3 p-4">
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
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                Bannerni o‘chirish?
                              </h4>

                              <p
                                className={`mt-1 text-xs leading-5 ${
                                  darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                Ushbu banner o‘chiriladi.
                              </p>
                            </div>
                          </div>

                          <div
                            className={`border-t ${
                              darkMode ? "border-[#374151]" : "border-gray-200"
                            }`}
                          />

                          <div className="flex justify-end gap-2 p-3">
                            <Button
                              size="small"
                              onClick={() => setDeleteId(null)}
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
                              loading={isDeleting}
                              onClick={handleDelete}
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
                          background: darkMode ? "#111827" : "#ffffff",
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
                  </div>
                </div>
              </Card>
            ))}
        </div>
      )}

      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      <Modal
        open={!!selectedBanner}
        onCancel={() => setSelectedBanner(null)}
        footer={null}
        centered
        width={820}
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

          content: {
            padding: 0,
            overflow: "hidden",
            borderRadius: 20,
            background: darkMode ? "#111827" : "#ffffff",
            border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
          },

          body: {
            padding: 0,
          },
        }}
      >
        {selectedBanner && (
          <div className={darkMode ? "bg-[#111827]" : "bg-white"}>
            {/* IMAGE */}

            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={selectedBanner.image}
                alt={selectedBanner.title}
                width="100%"
                height="100%"
                preview
                className="!h-full !w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-7 right-7">
                <span
                  className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md ${
                    selectedBanner.isActive
                      ? "border-green-400/20 bg-green-500/20 text-green-300"
                      : "border-red-400/20 bg-red-500/20 text-red-300"
                  }`}
                >
                  {selectedBanner.isActive ? "● Active" : "● Inactive"}
                </span>

                <h2 className="mt-3 text-2xl font-bold text-white">
                  {selectedBanner.title}
                </h2>

                <p className="mt-1 max-w-2xl text-sm text-gray-200">
                  {selectedBanner.subtitle}
                </p>
              </div>
            </div>

            {/* BODY */}

            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailBox
                  darkMode={darkMode}
                  title="Banner ID"
                  value={selectedBanner.id}
                  breakAll
                />

                <DetailBox
                  darkMode={darkMode}
                  title="Sort Order"
                  value={`#${selectedBanner.sortOrder}`}
                />

                <DetailBox
                  darkMode={darkMode}
                  title="Button Text"
                  value={selectedBanner.buttonText || "Not set"}
                />

                <DetailBox
                  darkMode={darkMode}
                  title="Status"
                  value={selectedBanner.isActive ? "● Active" : "● Inactive"}
                  valueClass={
                    selectedBanner.isActive ? "text-green-500" : "text-red-500"
                  }
                />
              </div>

              {selectedBanner.link && (
                <div
                  className={`mt-4 rounded-2xl border p-4 ${
                    darkMode
                      ? "border-[#374151] bg-[#1F2937]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Link2 size={16} className="text-blue-500" />

                    <span className={`text-xs ${mutedClass}`}>Banner Link</span>
                  </div>

                  <a
                    href={selectedBanner.link}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-sm text-blue-500 hover:underline"
                  >
                    {selectedBanner.link}
                  </a>
                </div>
              )}

              {selectedBanner.mobileImage && (
                <div
                  className={`mt-4 rounded-2xl border p-4 ${
                    darkMode
                      ? "border-[#374151] bg-[#1F2937]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Smartphone size={17} className={mutedClass} />

                    <span className={`text-sm font-medium ${titleClass}`}>
                      Mobile Banner
                    </span>
                  </div>

                  <Image
                    src={selectedBanner.mobileImage}
                    alt="Mobile banner"
                    width="100%"
                    height={180}
                    className="rounded-xl object-cover"
                  />
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  onClick={() => setSelectedBanner(null)}
                  className={`!h-10 !rounded-xl ${
                    darkMode
                      ? "!border-[#374151] !bg-[#1F2937] !text-gray-300"
                      : ""
                  }`}
                >
                  Close
                </Button>

                {selectedBanner.link && (
                  <Button
                    type="primary"
                    icon={<ExternalLink size={16} />}
                    href={selectedBanner.link}
                    target="_blank"
                    className="!h-10 !rounded-xl"
                  >
                    Open Link
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* =================================================
          EDIT MODAL
      ================================================= */}

      <BannerFormModal
        open={!!editingBanner}
        title="Edit Banner"
        description="Banner ma'lumotlarini o‘zgartiring"
        icon={<Edit3 size={21} />}
        form={form}
        darkMode={darkMode}
        loading={isUpdating}
        onCancel={handleCloseEdit}
        onSubmit={handleUpdate}
        submitText="Save Changes"
      />

      {/* =================================================
          ADD MODAL
      ================================================= */}

      <BannerFormModal
        open={isAddModalOpen}
        title="Add Banner"
        description="Yangi banner qo‘shing"
        icon={<Plus size={21} />}
        form={form}
        darkMode={darkMode}
        loading={isCreating}
        onCancel={handleCloseAdd}
        onSubmit={handleCreate}
        submitText="Add Banner"
      />
    </div>
  );
}

// =====================================================
// DETAIL BOX
// =====================================================

interface DetailBoxProps {
  darkMode: boolean;
  title: string;
  value: string;
  breakAll?: boolean;
  valueClass?: string;
}

function DetailBox({
  darkMode,
  title,
  value,
  breakAll,
  valueClass,
}: DetailBoxProps) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        darkMode
          ? "border-[#374151] bg-[#1F2937]"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <p
        className={`mb-2 text-xs ${
          darkMode ? "text-gray-500" : "text-gray-400"
        }`}
      >
        {title}
      </p>

      <p
        className={`text-sm font-semibold ${breakAll ? "break-all" : ""} ${
          valueClass || (darkMode ? "text-gray-100" : "text-gray-900")
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// =====================================================
// BANNER FORM MODAL
// =====================================================

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

function BannerFormModal({
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

        content: {
          padding: 0,
          borderRadius: 20,
          background: darkMode ? "#111827" : "#ffffff",
          border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
          boxShadow: darkMode
            ? "0 30px 100px rgba(0,0,0,0.75)"
            : "0 25px 80px rgba(0,0,0,0.15)",
        },

        body: {
          padding: 0,
        },
      }}
    >
      <div className={darkMode ? "bg-[#111827] p-6" : "bg-white p-6"}>
        {/* HEADER */}

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

        {/* FORM */}

        <Form form={form} layout="vertical">
          {/* TITLE */}

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

          {/* SUBTITLE */}

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

          {/* IMAGE */}

          <Form.Item
            name="image"
            label={<span className={labelClass}>Desktop Image URL</span>}
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

          {/* MOBILE IMAGE */}

          <Form.Item
            name="mobileImage"
            label={<span className={labelClass}>Mobile Image URL</span>}
          >
            <Input
              size="large"
              placeholder="https://example.com/mobile-banner.jpg"
              className={inputClass}
            />
          </Form.Item>

          {/* BUTTON TEXT + LINK */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              name="buttonText"
              label={<span className={labelClass}>Button Text</span>}
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

          {/* SORT + STATUS */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              name="sortOrder"
              label={<span className={labelClass}>Sort Order</span>}
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

          {/* DATES */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              name="startDate"
              label={<span className={labelClass}>Start Date</span>}
            >
              <Input
                type="datetime-local"
                size="large"
                className={inputClass}
              />
            </Form.Item>

            <Form.Item
              name="endDate"
              label={<span className={labelClass}>End Date</span>}
            >
              <Input
                type="datetime-local"
                size="large"
                className={inputClass}
              />
            </Form.Item>
          </div>

          {/* FOOTER */}

          <div
            className="mt-7 flex justify-end gap-3 border-t pt-5"
            style={{
              borderColor: darkMode ? "#374151" : "#e5e7eb",
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
