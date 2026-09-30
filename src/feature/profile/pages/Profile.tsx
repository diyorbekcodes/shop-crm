import {
  Mail,
  Phone,
  ShieldCheck,
  User,
  CalendarDays,
  CircleUserRound,
  Pencil,
  LockKeyhole,
} from "lucide-react";

import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Skeleton,

  message,
} from "antd";
import { useState } from "react";

import ProfileService from "../service/ProfileService";
import { useTheme } from "../../../context/modContext";

export default function Profile() {
  const {
    isLoading,
    data,
    editProfile,
    isEditLoading,
    changePassword,
    isPasswordLoading,
  } = ProfileService();

  const { darkMode } = useTheme();

  const [editModal, setEditModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // Loading
  if (isLoading) {
    return (
      <div className={darkMode ? "p-6 bg-[#111827] min-h-screen" : "p-6"}>
        <div className="mb-6 flex items-center justify-between">
          <div className="w-[300px]">
            <Skeleton.Input active size="large" style={{ width: 180 }} />
            <div className="mt-2">
              <Skeleton.Input active size="small" style={{ width: 250 }} />
            </div>
          </div>

          <div className="flex gap-3">
            <Skeleton.Button active size="large" />
            <Skeleton.Button active size="large" />
          </div>
        </div>

        <div
          className={
            darkMode
              ? "bg-[#1F2937] rounded-2xl border border-[#374151] overflow-hidden"
              : "bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden"
          }
        >
          <Skeleton.Node
            active
            style={{
              width: "100%",
              height: 140,
              borderRadius: 0,
            }}
          />

          <div className="px-6 pb-6">
            <div className="-mt-12">
              <Skeleton.Avatar active size={96} />
            </div>

            <div className="mt-4">
              <Skeleton.Input active size="large" style={{ width: 220 }} />
              <div className="mt-2">
                <Skeleton.Input active size="small" style={{ width: 100 }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Skeleton.Input
                active
                block
                size="large"
                style={{ height: 76 }}
              />

              <Skeleton.Input
                active
                block
                size="large"
                style={{ height: 76 }}
              />

              <Skeleton.Input
                active
                block
                size="large"
                style={{ height: 76 }}
              />

              <Skeleton.Input
                active
                block
                size="large"
                style={{ height: 76 }}
              />

              <Skeleton.Input
                active
                block
                size="large"
                style={{ height: 76 }}
              />

              <Skeleton.Input
                active
                block
                size="large"
                style={{ height: 76 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Data yo'q
  if (!data) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
          Admin ma'lumotlari topilmadi
        </p>
      </div>
    );
  }

  // Edit modalni ochish
  const openEditModal = () => {
    editForm.setFieldsValue({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      avatar: data.avatar,
    });

    setEditModal(true);
  };

  // Profile edit
  const handleEdit = (values: any) => {
    editProfile(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        avatar: values.avatar || "",
      },
      {
        onSuccess: () => {
          message.success("Profil muvaffaqiyatli o'zgartirildi");

          setEditModal(false);

          editForm.resetFields();
        },

        onError: (error: any) => {
          message.error(
            error?.response?.data?.message || "Profilni o'zgartirishda xatolik",
          );
        },
      },
    );
  };

  // Password change
  const handlePassword = (values: any) => {
    changePassword(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          message.success("Parol muvaffaqiyatli o'zgartirildi");
          setPasswordModal(false);
          passwordForm.resetFields();
        },

        onError: (error: any) => {
          message.error(
            error?.response?.data?.message || "Parolni o'zgartirishda xatolik",
          );
        },
      },
    );
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

          colorBorder: darkMode ? "#374151" : "#E5E7EB",
        },

        components: {
          Input: {
            colorBgContainer: darkMode ? "#374151" : "#FFFFFF",
            colorText: darkMode ? "#FFFFFF" : "#111827",
            colorTextPlaceholder: darkMode ? "#9CA3AF" : "#6B7280",
            colorBorder: darkMode ? "#4B5563" : "#D1D5DB",
            hoverBorderColor: "#4EA674",
            activeBorderColor: "#4EA674",
            activeShadow: "0 0 0 2px rgba(78,166,116,0.15)",
          },

          Modal: {
            contentBg: darkMode ? "#1F2937" : "#FFFFFF",
            headerBg: darkMode ? "#1F2937" : "#FFFFFF",
            titleColor: darkMode ? "#FFFFFF" : "#111827",
            colorIcon: darkMode ? "#9CA3AF" : "#6B7280",
            colorIconHover: darkMode ? "#FFFFFF" : "#111827",
          },

          Button: {
            colorPrimary: "#4EA674",
            colorPrimaryHover: "#5DBA83",
            colorPrimaryActive: "#3D8F60",

            // Primary button
            primaryColor: "#FFFFFF",
            primaryShadow: "none",

            // Default button
            defaultBg: darkMode ? "#374151" : "#FFFFFF",
            defaultColor: darkMode ? "#F9FAFB" : "#111827",
            defaultBorderColor: darkMode ? "#4B5563" : "#D1D5DB",
            defaultHoverBg: darkMode ? "#4B5563" : "#F3F4F6",
            defaultHoverBorderColor: "#4EA674",
            defaultHoverColor: darkMode ? "#FFFFFF" : "#111827",
          },

          Form: {
            labelColor: darkMode ? "#D1D5DB" : "#374151",
          },
        },
      }}
    >
      <div className={darkMode ? "p-6 bg-[#111827] min-h-screen" : "p-6"}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1
              className={
                darkMode
                  ? "text-2xl font-bold text-white"
                  : "text-2xl font-bold text-[#111827]"
              }
            >
              Profile
            </h1>

            <p
              className={
                darkMode ? "text-gray-400 mt-1" : "text-[#6A717F] mt-1"
              }
            >
              Admin profilingiz ma'lumotlari
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              icon={<LockKeyhole size={16} />}
              onClick={() => setPasswordModal(true)}
              className="h-10"
            >
              Change Password
            </Button>

            <Button
              type="primary"
              icon={<Pencil size={16} />}
              onClick={openEditModal}
              className="h-10"
              style={{
                backgroundColor: "#4EA674",
                borderColor: "#4EA674",
                color: "#FFFFFF",
              }}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Profile Card */}
        <div
          className={
            darkMode
              ? "bg-[#1F2937] rounded-2xl shadow-sm shadow-black/20 border border-[#374151] overflow-hidden"
              : "bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden"
          }
        >
          {/* Cover */}
          <div className="h-[140px] bg-gradient-to-r from-[#1F2937] to-[#4B5563]" />

          <div className="px-6 pb-6">
            {/* Avatar + Status */}
            <div className="flex items-end justify-between -mt-12">
              <div
                className={
                  darkMode
                    ? "w-24 h-24 rounded-full bg-[#1F2937] p-1"
                    : "w-24 h-24 rounded-full bg-white p-1"
                }
              >
                {data.avatar ? (
                  <img
                    src={data.avatar}
                    alt="Admin"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={
                      darkMode
                        ? "w-full h-full rounded-full bg-[#374151] flex items-center justify-center"
                        : "w-full h-full rounded-full bg-[#F3F4F6] flex items-center justify-center"
                    }
                  >
                    <CircleUserRound
                      size={45}
                      className={darkMode ? "text-gray-500" : "text-[#9CA3AF]"}
                    />
                  </div>
                )}
              </div>

              {/* Status */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  data.isActive
                    ? darkMode
                      ? "bg-green-900/40 text-green-400"
                      : "bg-green-100 text-green-600"
                    : darkMode
                      ? "bg-red-900/40 text-red-400"
                      : "bg-red-100 text-red-600"
                }`}
              >
                {data.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Name */}
            <div className="mt-4">
              <h2
                className={
                  darkMode
                    ? "text-xl font-bold text-white"
                    : "text-xl font-bold text-[#111827]"
                }
              >
                {data.firstName} {data.lastName}
              </h2>

              <p
                className={
                  darkMode ? "text-gray-400 mt-1" : "text-[#6A717F] mt-1"
                }
              >
                {data.role}
              </p>
            </div>

            {/* Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Email */}
              <div
                className={
                  darkMode
                    ? "border border-[#374151] rounded-xl p-4 flex items-center gap-3"
                    : "border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-3"
                }
              >
                <div
                  className={
                    darkMode
                      ? "w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"
                      : "w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"
                  }
                >
                  <Mail size={20} className="text-blue-500" />
                </div>

                <div>
                  <p
                    className={
                      darkMode
                        ? "text-sm text-gray-400"
                        : "text-sm text-[#9CA3AF]"
                    }
                  >
                    Email
                  </p>

                  <p
                    className={
                      darkMode
                        ? "font-medium text-white"
                        : "font-medium text-[#111827]"
                    }
                  >
                    {data.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div
                className={
                  darkMode
                    ? "border border-[#374151] rounded-xl p-4 flex items-center gap-3"
                    : "border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-3"
                }
              >
                <div
                  className={
                    darkMode
                      ? "w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center"
                      : "w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"
                  }
                >
                  <Phone size={20} className="text-green-500" />
                </div>

                <div>
                  <p
                    className={
                      darkMode
                        ? "text-sm text-gray-400"
                        : "text-sm text-[#9CA3AF]"
                    }
                  >
                    Phone
                  </p>

                  <p
                    className={
                      darkMode
                        ? "font-medium text-white"
                        : "font-medium text-[#111827]"
                    }
                  >
                    {data.phone || "Telefon mavjud emas"}
                  </p>
                </div>
              </div>

              {/* First Name */}
              <div
                className={
                  darkMode
                    ? "border border-[#374151] rounded-xl p-4 flex items-center gap-3"
                    : "border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-3"
                }
              >
                <div
                  className={
                    darkMode
                      ? "w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center"
                      : "w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center"
                  }
                >
                  <User size={20} className="text-purple-500" />
                </div>

                <div>
                  <p
                    className={
                      darkMode
                        ? "text-sm text-gray-400"
                        : "text-sm text-[#9CA3AF]"
                    }
                  >
                    First Name
                  </p>

                  <p
                    className={
                      darkMode
                        ? "font-medium text-white"
                        : "font-medium text-[#111827]"
                    }
                  >
                    {data.firstName}
                  </p>
                </div>
              </div>

              {/* Last Name */}
              <div
                className={
                  darkMode
                    ? "border border-[#374151] rounded-xl p-4 flex items-center gap-3"
                    : "border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-3"
                }
              >
                <div
                  className={
                    darkMode
                      ? "w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center"
                      : "w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center"
                  }
                >
                  <User size={20} className="text-orange-500" />
                </div>

                <div>
                  <p
                    className={
                      darkMode
                        ? "text-sm text-gray-400"
                        : "text-sm text-[#9CA3AF]"
                    }
                  >
                    Last Name
                  </p>

                  <p
                    className={
                      darkMode
                        ? "font-medium text-white"
                        : "font-medium text-[#111827]"
                    }
                  >
                    {data.lastName}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div
                className={
                  darkMode
                    ? "border border-[#374151] rounded-xl p-4 flex items-center gap-3"
                    : "border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-3"
                }
              >
                <div
                  className={
                    darkMode
                      ? "w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center"
                      : "w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center"
                  }
                >
                  <ShieldCheck size={20} className="text-pink-500" />
                </div>

                <div>
                  <p
                    className={
                      darkMode
                        ? "text-sm text-gray-400"
                        : "text-sm text-[#9CA3AF]"
                    }
                  >
                    Role
                  </p>

                  <p
                    className={
                      darkMode
                        ? "font-medium text-white"
                        : "font-medium text-[#111827]"
                    }
                  >
                    {data.role}
                  </p>
                </div>
              </div>

              {/* Created At */}
              <div
                className={
                  darkMode
                    ? "border border-[#374151] rounded-xl p-4 flex items-center gap-3"
                    : "border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-3"
                }
              >
                <div
                  className={
                    darkMode
                      ? "w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center"
                      : "w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center"
                  }
                >
                  <CalendarDays size={20} className="text-yellow-500" />
                </div>

                <div>
                  <p
                    className={
                      darkMode
                        ? "text-sm text-gray-400"
                        : "text-sm text-[#9CA3AF]"
                    }
                  >
                    Created At
                  </p>

                  <p
                    className={
                      darkMode
                        ? "font-medium text-white"
                        : "font-medium text-[#111827]"
                    }
                  >
                    {data.createdAt
                      ? new Date(data.createdAt).toLocaleDateString()
                      : "Mavjud emas"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= EDIT PROFILE ================= */}

        <Modal
          title="Edit Profile"
          open={editModal}
          onCancel={() => {
            setEditModal(false);
            editForm.resetFields();
          }}
          footer={null}
          centered
        >
          <Form form={editForm} layout="vertical" onFinish={handleEdit}>
            <Form.Item
              name="firstName"
              label="Ism"
              rules={[
                {
                  required: true,
                  message: "Ismni kiriting",
                },
              ]}
            >
              <Input placeholder="Ismingiz" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Familiya"
              rules={[
                {
                  required: true,
                  message: "Familiyani kiriting",
                },
              ]}
            >
              <Input placeholder="Familiyangiz" />
            </Form.Item>

            <Form.Item name="phone" label="Telefon">
              <Input placeholder="+998..." />
            </Form.Item>

            <Form.Item
              name="avatar"
              label="Avatar"
              rules={[
                {
                  type: "url",
                  message: "To'g'ri URL kiriting",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="https://example.com/avatar.jpg"
                prefix="🖼️"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={isEditLoading}
              block
              className="mt-4"
            >
              Saqlash
            </Button>
          </Form>
        </Modal>

        {/* ================= CHANGE PASSWORD ================= */}

        <Modal
          title="Change Password"
          open={passwordModal}
          onCancel={() => {
            setPasswordModal(false);
            passwordForm.resetFields();
          }}
          footer={null}
          centered
        >
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePassword}
            className="mt-5"
          >
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Hozirgi parolni kiriting",
                },
              ]}
            >
              <Input.Password placeholder="Current Password" size="large" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Yangi parolni kiriting",
                },
                {
                  min: 6,
                  message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
                },
              ]}
            >
              <Input.Password placeholder="New Password" size="large" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Parolni tasdiqlang",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error("Parollar mos kelmaydi"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" size="large" />
            </Form.Item>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => {
                  setPasswordModal(false);
                  passwordForm.resetFields();
                }}
              >
                Cancel
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                loading={isPasswordLoading}
              >
                Change Password
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
}
