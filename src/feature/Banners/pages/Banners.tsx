import {
  Button,
  Card,
  Empty,
  Form,
  Image,
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

import BannerDetailsModal from "../componets/BannerDetailsModal";
import BannerFormModal from "../componets/BannerFormModal";
import DeleteBannerPopover from "../componets/DeleteBannerPopover";

import type { BannerFormValues } from "../types/BannersType";
import type { Banner } from "../types/BannersType";

const Banners = () => {
  const { darkMode } = useTheme();

  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading } = useBanners();

  const { mutate: createBanner, isPending: isCreating } = useCreateBanner();

  const { mutate: updateBanner, isPending: isUpdating } = useUpdateBanner();

  const { mutate: deleteBanner, isPending: isDeleting } = useDeleteBanner();

  const { mutate: toggleBannerStatus } = useToggleBannerStatus();

  const [form] = Form.useForm<BannerFormValues>();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const banners: Banner[] = data?.data ?? [];

  /* =========================
     THEME CLASSES
  ========================= */

  const cardClass = `
    rounded-[12px]
    overflow-hidden
    border
    transition-all
    duration-200
    ${darkMode ? "bg-[#1F2937] border-[#374151]" : "bg-white border-[#E5E7EB]"}
  `;

  const innerClass = darkMode ? "bg-[#111827]" : "bg-[#F9FAFB]";

  const titleClass = darkMode ? "text-[#F9FAFB]" : "text-[#111827]";

  const mutedClass = darkMode ? "text-[#9CA3AF]" : "text-[#6B7280]";

  /* =========================
     ADD BANNER
  ========================= */

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

  const handleCloseAdd = () => {
    setIsAddModalOpen(false);
    form.resetFields();
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();

      createBanner(
        {
          title: values.title,
          subtitle: values.subtitle,
          image: values.image,
          mobileImage: values.mobileImage,
          buttonText: values.buttonText,
          link: values.link,
          sortOrder: Number(values.sortOrder),
          isActive: values.isActive,
          startDate: values.startDate
            ? new Date(values.startDate).toISOString()
            : undefined,
          endDate: values.endDate
            ? new Date(values.endDate).toISOString()
            : undefined,
        },
        {
          onSuccess: () => {
            messageApi.success("Banner muvaffaqiyatli qo‘shildi");
            handleCloseAdd();
          },
          onError: () => {
            messageApi.error("Banner qo‘shishda xatolik yuz berdi");
          },
        },
      );
    } catch {
      // validation error
    }
  };

  /* =========================
     EDIT BANNER
  ========================= */

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);

    form.setFieldsValue({
      title: banner.title ?? "",
      subtitle: banner.subtitle ?? "",
      image: banner.image ?? "",
      mobileImage: banner.mobileImage ?? "",
      buttonText: banner.buttonText ?? "",
      link: banner.link ?? "",
      sortOrder: banner.sortOrder ?? 0,
      isActive: banner.isActive ?? true,

      startDate: banner.startDate
        ? new Date(banner.startDate).toISOString().slice(0, 16)
        : "",

      endDate: banner.endDate
        ? new Date(banner.endDate).toISOString().slice(0, 16)
        : "",
    });
  };

  const handleCloseEdit = () => {
    setEditingBanner(null);
    form.resetFields();
  };

  const handleUpdate = async () => {
    if (!editingBanner) return;

    try {
      const values = await form.validateFields();

      updateBanner(
        {
          id: editingBanner.id,
          data: {
            title: values.title,
            subtitle: values.subtitle,
            image: values.image,
            mobileImage: values.mobileImage,
            buttonText: values.buttonText,
            link: values.link,
            sortOrder: Number(values.sortOrder),
            isActive: values.isActive,
            startDate: values.startDate
              ? new Date(values.startDate).toISOString()
              : undefined,
            endDate: values.endDate
              ? new Date(values.endDate).toISOString()
              : undefined,
          },
        },
        {
          onSuccess: () => {
            messageApi.success("Banner muvaffaqiyatli yangilandi");

            handleCloseEdit();
          },

          onError: () => {
            messageApi.error("Banner yangilashda xatolik yuz berdi");
          },
        },
      );
    } catch {
      // validation error
    }
  };

  /* =========================
     DELETE BANNER
  ========================= */

  const handleDelete = () => {
    if (!deleteId) return;

    deleteBanner(deleteId, {
      onSuccess: () => {
        messageApi.success("Banner muvaffaqiyatli o‘chirildi");

        setDeleteId(null);
      },

      onError: () => {
        messageApi.error("Banner o‘chirishda xatolik yuz berdi");
      },
    });
  };

  /* =========================
     TOGGLE STATUS
  ========================= */

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
          messageApi.success(
            checked ? "Banner faollashtirildi" : "Banner o‘chirildi",
          );
        },

        onError: () => {
          messageApi.error("Banner statusini o‘zgartirishda xatolik");
        },
      },
    );
  };

  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        {contextHolder}

        <div className="flex flex-col gap-5">
          <Skeleton
            active
            className={
              darkMode
                ? "[&_.ant-skeleton-title]:!bg-[#374151] [&_.ant-skeleton-paragraph>li]:!bg-[#374151]"
                : ""
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
            {Array.from({ length: 2 }).map((_, index) => (
              <Card
                key={index}
                className={darkMode ? "!bg-[#1F2937] !border-[#374151]" : ""}
              >
                <Skeleton
                  active
                  avatar={false}
                  paragraph={{ rows: 5 }}
                  className={
                    darkMode
                      ? "[&_.ant-skeleton-title]:!bg-[#374151] [&_.ant-skeleton-paragraph>li]:!bg-[#374151]"
                      : ""
                  }
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-4 md:p-6">
      {contextHolder}

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className={`text-2xl font-semibold ${titleClass}`}>Banners</h1>

          <p className={`mt-1 text-sm ${mutedClass}`}>
            Saytingizdagi bannerlarni boshqaring
          </p>
        </div>

        <Button
          type="primary"
          icon={<Plus size={17} />}
          onClick={handleOpenAdd}
          className="!h-10 !rounded-lg"
        >
          Add Banner
        </Button>
      </div>

      {/* =========================
          EMPTY
      ========================= */}

      {banners.length === 0 ? (
        <div
          className={`
            min-h-[400px]
            flex
            items-center
            justify-center
            rounded-[12px]
            border
            ${
              darkMode
                ? "bg-[#1F2937] border-[#374151]"
                : "bg-white border-[#E5E7EB]"
            }
          `}
        >
          <Empty
            image={
              <ImageIcon
                size={52}
                className={darkMode ? "text-[#6B7280]" : "text-[#9CA3AF]"}
              />
            }
            description={
              <span className={mutedClass}>Hozircha bannerlar mavjud emas</span>
            }
          >
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={handleOpenAdd}
            >
              Add Banner
            </Button>
          </Empty>
        </div>
      ) : (
        /* =========================
           BANNER GRID
        ========================= */

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
          {[...banners]
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
            .map((banner) => (
              <div key={banner.id} className={cardClass}>
                {/* =========================
                    IMAGE
                ========================= */}

                <div className="relative h-[210px] overflow-hidden">
                  <Image width={"100%"} height={"100%"}
                    src={banner.image}
                    alt={banner.title}
                    preview={{
                      mask: (
                        <div className="flex items-center gap-2">
                          <Eye size={17} />
                          Preview
                        </div>
                      ),
                    }}
                    className="!w-full !h-full object-cover"
                  />

                  {/* ACTIVE BADGE */}

                  <div className="absolute top-3 left-3">
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-1.5
                        px-2.5
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        backdrop-blur-md
                        ${
                          banner.isActive
                            ? "bg-green-500/90 text-white"
                            : "bg-gray-500/90 text-white"
                        }
                      `}
                    >
                      <span
                        className={`
                          w-1.5
                          h-1.5
                          rounded-full
                          ${banner.isActive ? "bg-white" : "bg-gray-300"}
                        `}
                      />

                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* SORT ORDER */}

                  <div
                    className="
                      absolute
                      top-3
                      right-3
                      px-2
                      py-1
                      rounded-md
                      bg-black/50
                      backdrop-blur-md
                      text-white
                      text-xs
                    "
                  >
                    #{banner.sortOrder ?? 0}
                  </div>
                </div>

                {/* =========================
                    CONTENT
                ========================= */}

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3
                        className={`
                          text-base
                          font-semibold
                          truncate
                          ${titleClass}
                        `}
                      >
                        {banner.title}
                      </h3>

                      {banner.subtitle && (
                        <p
                          className={`
                            text-sm
                            mt-1
                            line-clamp-2
                            ${mutedClass}
                          `}
                        >
                          {banner.subtitle}
                        </p>
                      )}
                    </div>

                    {/* STATUS SWITCH */}

                    <Switch
                      size="small"
                      checked={banner.isActive}
                      onChange={(checked) =>
                        handleToggleStatus(banner, checked)
                      }
                    />
                  </div>

                  {/* =========================
                      INFO BOXES
                  ========================= */}

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div
                      className={`
                        p-3
                        rounded-lg
                        ${innerClass}
                      `}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <ImageIcon size={14} className={mutedClass} />

                        <span className={`text-xs ${mutedClass}`}>Desktop</span>
                      </div>

                      <p
                        className={`text-xs font-medium truncate ${titleClass}`}
                      >
                        {banner.image ? "Available" : "No image"}
                      </p>
                    </div>

                    <div
                      className={`
                        p-3
                        rounded-lg
                        ${innerClass}
                      `}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Smartphone size={14} className={mutedClass} />

                        <span className={`text-xs ${mutedClass}`}>Mobile</span>
                      </div>

                      <p
                        className={`text-xs font-medium truncate ${titleClass}`}
                      >
                        {banner.mobileImage ? "Available" : "No image"}
                      </p>
                    </div>
                  </div>

                  {/* =========================
                      DATES
                  ========================= */}

                  {(banner.startDate || banner.endDate) && (
                    <div
                      className={`
                        flex
                        items-center
                        gap-2
                        mt-3
                        text-xs
                        ${mutedClass}
                      `}
                    >
                      <CalendarDays size={14} />

                      <span>
                        {banner.startDate
                          ? new Date(banner.startDate).toLocaleDateString()
                          : "—"}

                        {" → "}

                        {banner.endDate
                          ? new Date(banner.endDate).toLocaleDateString()
                          : "—"}
                      </span>
                    </div>
                  )}

                  {/* =========================
                      LINK
                  ========================= */}

                  {banner.link && (
                    <div
                      className={`
                        flex
                        items-center
                        gap-2
                        mt-3
                        text-xs
                        ${mutedClass}
                      `}
                    >
                      <Link2 size={14} />

                      <span className="truncate">{banner.link}</span>
                    </div>
                  )}

                  {/* =========================
                      ACTIONS
                  ========================= */}

                  {/* =========================
    ACTIONS
========================= */}

                  <div
                    className={`
    flex
    items-center
    gap-2
    mt-4
    pt-4
    border-t
    ${darkMode ? "border-[#374151]" : "border-gray-200"}
  `}
                  >
                    {/* DETAILS */}

                    <Button
                      size="small"
                      icon={<Eye size={14} />}
                      onClick={() => setSelectedBanner(banner)}
                      className={`
      !h-8
      !rounded-lg
      !flex
      !items-center
      !gap-1.5
      !font-medium
      transition-all
      ${
        darkMode
          ? `
            !bg-[#374151]
            !border-[#4B5563]
            !text-[#E5E7EB]
            hover:!bg-[#4B5563]
            hover:!border-[#6B7280]
            hover:!text-white
          `
          : `
            hover:!border-gray-400
            hover:!text-gray-900
          `
      }
    `}
                    >
                      Details
                    </Button>

                    {/* EXTERNAL LINK */}

                    {banner.link && (
                      <Button
                        size="small"
                        icon={<ExternalLink size={14} />}
                        onClick={() =>
                          window.open(
                            banner.link,
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                        className={`
        !h-8
        !w-8
        !p-0
        !rounded-lg
        !flex
        !items-center
        !justify-center
        transition-all
        ${
          darkMode
            ? `
              !bg-[#374151]
              !border-[#4B5563]
              !text-[#9CA3AF]
              hover:!bg-[#4B5563]
              hover:!border-[#6B7280]
              hover:!text-white
            `
            : `
              hover:!border-gray-400
              hover:!text-gray-900
            `
        }
      `}
                      />
                    )}

                    <div className="flex-1" />

                    {/* EDIT */}

                    <Button
                      size="small"
                      icon={<Edit3 size={14} />}
                      onClick={() => handleEdit(banner)}
                      className={`
      !h-8
      !rounded-lg
      !flex
      !items-center
      !gap-1.5
      !font-medium
      transition-all
      ${
        darkMode
          ? `
            !bg-[#374151]
            !border-[#4B5563]
            !text-[#E5E7EB]
            hover:!bg-[#4B5563]
            hover:!border-[#6B7280]
            hover:!text-white
          `
          : `
            hover:!border-gray-400
            hover:!text-gray-900
          `
      }
    `}
                    >
                      Edit
                    </Button>

                    {/* DELETE */}

                    <DeleteBannerPopover
                      open={deleteId === banner.id}
                      darkMode={darkMode}
                      loading={isDeleting}
                      onOpenChange={(open) =>
                        setDeleteId(open ? banner.id : null)
                      }
                      onCancel={() => setDeleteId(null)}
                      onDelete={handleDelete}
                    >
                      <Button
                        danger
                        size="small"
                        icon={<Trash2 size={14} />}
                        loading={isDeleting && deleteId === banner.id}
                        className={`
        !h-8
        !rounded-lg
        !flex
        !items-center
        !gap-1.5
        !font-medium
        transition-all
        ${
          darkMode
            ? `
              !bg-red-500/10
              !border-red-500/30
              !text-red-400
              hover:!bg-red-500/20
              hover:!border-red-500/50
              hover:!text-red-300
            `
            : `
              hover:!bg-red-50
            `
        }
      `}
                      >
                        Delete
                      </Button>
                    </DeleteBannerPopover>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* =========================
          DETAILS MODAL
      ========================= */}

      <BannerDetailsModal
        open={!!selectedBanner}
        banner={selectedBanner}
        darkMode={darkMode}
        onClose={() => setSelectedBanner(null)}
      />

      {/* =========================
          EDIT MODAL
      ========================= */}

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

      {/* =========================
          ADD MODAL
      ========================= */}

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
};

export default Banners;
