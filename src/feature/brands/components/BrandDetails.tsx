import { Avatar, Button, Empty, Modal, Skeleton, Tag, Typography } from "antd";
import {
  CalendarOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseCircleFilled,
  LinkOutlined,
  ShoppingOutlined,
  WarningFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useTheme } from "../../../context/modContext";
import BrandService from "../hook/Brands";

interface BrandDetailsProps {
  brandId: string | undefined;
  open: boolean;
  onClose: () => void;
}

const formatDate = (date?: string | null) =>
  date ? dayjs(date).format("DD.MM.YYYY, HH:mm") : "-";

const BrandDetails = ({ brandId, open, onClose }: BrandDetailsProps) => {
  const { darkMode } = useTheme();
  const { useDetails } = BrandService();
  const { data, isPending } = useDetails(brandId);

  const brand = data?.data;

  const bg = darkMode ? "#1F2937" : "#FFFFFF";
  const softBg = darkMode ? "#111827" : "#F8FAFC";
  const border = darkMode ? "#374151" : "#E2E8F0";
  const textMain = darkMode ? "text-white" : "text-[#111827]";
  const textMuted = darkMode ? "text-[#9CA3AF]" : "text-[#64748B]";

  const boxStyle = { background: softBg, border: `1px solid ${border}` };

  const productsCount = brand?._count?.products ?? brand?.products?.length ?? 0;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={580}
      centered
      destroyOnClose
      styles={{
        body: { padding: 0 },
      }}
    >
      {isPending ? (
        <div className="p-8">
          <Skeleton.Avatar active size={80} shape="square" />
          <Skeleton active className="mt-6" paragraph={{ rows: 5 }} />
        </div>
      ) : brand ? (
        <div>
          <div className="h-28 mt-10 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="px-6 pb-6">
            <div className="-mt-10 flex items-end justify-between gap-4">
              <Avatar
                src={brand.logo}
                size={88}
                shape="square"
                className="!rounded-2xl border-4 shadow-lg"
                style={{
                  background: "#fff",
                  borderColor: bg,
                  color: "#6366F1",
                  fontSize: 32,
                  fontWeight: 700,
                }}
              >
                {brand.name?.[0]?.toUpperCase()}
              </Avatar>

              <Tag
                icon={
                  brand.isActive ? <CheckCircleFilled /> : <CloseCircleFilled />
                }
                color={brand.isActive ? "success" : "default"}
                className="!mb-1 !rounded-full !px-3 !py-1 !text-sm"
              >
                {brand.isActive ? "Faol" : "Nofaol"}
              </Tag>
            </div>

            <div className="mt-4">
              <h2 className={`text-2xl font-bold leading-tight ${textMain}`}>
                {brand.name}
              </h2>
              <p
                className={`mt-1 flex items-center gap-1 text-sm ${textMuted}`}
              >
                <LinkOutlined />
                {brand.slug}
              </p>
            </div>

            {brand.deletedAt && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
                <WarningFilled />
                Bu brend {formatDate(brand.deletedAt)} da o'chirilgan
              </div>
            )}

            <div className="mt-5 rounded-xl p-4" style={boxStyle}>
              <p
                className={`mb-1 text-xs uppercase tracking-wide ${textMuted}`}
              >
                Tavsif
              </p>
              <p className={`text-sm leading-relaxed ${textMain}`}>
                {brand.description || "Tavsif kiritilmagan"}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="rounded-xl p-3" style={boxStyle}>
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                  <ShoppingOutlined />
                </div>
                <p className={`text-xs ${textMuted}`}>Mahsulotlar</p>
                <p className={`text-lg font-semibold ${textMain}`}>
                  {productsCount} dona
                </p>
              </div>

              <div className="rounded-xl p-3" style={boxStyle}>
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                  <CalendarOutlined />
                </div>
                <p className={`text-xs ${textMuted}`}>Yaratilgan</p>
                <p className={`text-sm font-semibold ${textMain}`}>
                  {formatDate(brand.createdAt)}
                </p>
              </div>

              <div className="rounded-xl p-3" style={boxStyle}>
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/10 text-pink-500">
                  <ClockCircleOutlined />
                </div>
                <p className={`text-xs ${textMuted}`}>Yangilangan</p>
                <p className={`text-sm font-semibold ${textMain}`}>
                  {formatDate(brand.updatedAt)}
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-xl p-4" style={boxStyle}>
              <p
                className={`mb-2 text-xs uppercase tracking-wide ${textMuted}`}
              >
                Brend mahsulotlari
              </p>

              {brand.products?.length ? (
                <div className="flex flex-col gap-2">
                  {brand.products.map((product: any) => (
                    <div
                      key={product.id}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${textMain}`}
                      style={{ border: `1px solid ${border}` }}
                    >
                      <span>{product.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className={textMuted}>Mahsulotlar hali yo'q</span>
                  }
                />
              )}
            </div>

            <div
              className="mt-3 flex items-center justify-between gap-3 rounded-xl px-4 py-3"
              style={boxStyle}
            >
              <span className={`text-xs uppercase tracking-wide ${textMuted}`}>
                ID
              </span>
              <Typography.Text
                copyable
                className={`!text-xs ${textMuted}`}
                style={{ color: darkMode ? "#9CA3AF" : "#64748B" }}
              >
                {brand.id}
              </Typography.Text>
            </div>

            <div className="mt-6 flex justify-end">
              <Button type="primary" size="large" onClick={onClose}>
                Yopish
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12">
          <Empty description="Brend topilmadi" />
        </div>
      )}
    </Modal>
  );
};

export default BrandDetails;
