import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import useLogin from "../../service/hooks/useLogin";

import iphone1 from "../../../assets/img/iphone15.png";
import iphone2 from "../../../assets/img/iphone13.png";
import hero from "../../../assets/img/loginHero.jpg";
import laptop1 from "../../../assets/img/laptop1.png";
import laptop2 from "../../../assets/img/laptop2.png";

const Login = () => {
  const { isPending, login } = useLogin();

  const onFinish = (values: { email: string; password: string }) => {
    login(values);
  };

  return (
    <div
      className="login-page min-h-screen flex items-center justify-center relative overflow-hidden select-none"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/45 z-0" />

      {/* ================================
          FLOATING PRODUCTS
      ================================= */}

      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* iPhone 1 */}
        <img
          src={iphone1}
          alt="iPhone"
          className="
            absolute
            left-0
            -top-5
            hidden
            md:block
            w-40
            lg:w-75
            floating-phone-1
          "
        />

        {/* iPhone 2 */}
        <img
          src={iphone2}
          alt="iPhone"
          className="
            absolute
            right-0
            -top-10
            hidden
            md:block
            w-40
            lg:w-75
            floating-phone-2
          "
        />

        {/* Laptop 1 */}
        <img
          src={laptop1}
          alt="Laptop"
          className="
            absolute
            left-10
            bottom-5
            hidden
            md:block
            w-40
            lg:w-75
            floating-laptop-1
          "
        />

        {/* Laptop 2 */}
        <img
          src={laptop2}
          alt="Laptop"
          className="
            absolute
            right-10
            bottom-5
            hidden
            md:block
            w-40
            lg:w-75
            floating-laptop-2
          "
        />
      </div>

      {/* ================================
          LOGIN CARD
      ================================= */}

      <div
        className="
          login-card
          relative
          z-20
          w-[min(400px,calc(100vw-2rem))]
          p-5
          sm:p-8
          rounded-3xl
          bg-black/35
          backdrop-blur-xl
          border
          border-white/20
          shadow-2xl
        "
      >
        {/* Title */}

        <h1
          className="
            text-3xl
            font-bold
            text-white
            text-center
            mb-8
          "
        >
          Login
        </h1>

        {/* Form */}

        <Form layout="vertical" onFinish={onFinish}>
          {/* ================================
              EMAIL
          ================================= */}

          <Form.Item
            name="email"
            label={<span className="text-white font-medium">Email</span>}
            rules={[
              {
                required: true,
                message: "Email kiriting",
              },
              {
                type: "email",
                message: "To'g'ri email kiriting",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Email manzilingiz"
              className="
                login-input
                !h-12
                !rounded-xl
                !bg-white/10
                !border-white/20
                !text-white
                placeholder:!text-gray-400
              "
            />
          </Form.Item>

          {/* ================================
              PASSWORD
          ================================= */}

          <Form.Item
            name="password"
            label={<span className="text-white font-medium">Password</span>}
            rules={[
              {
                required: true,
                message: "Password kiriting",
              },
              {
                min: 6,
                message: "Password kamida 6 ta belgidan iborat bo'lishi kerak",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password kiriting"
              className="
                login-input
                !h-12
                !rounded-xl
                !bg-white/10
                !border-white/20
                !text-white
                placeholder:!text-gray-400
              "
            />
          </Form.Item>

          {/* ================================
              LOGIN BUTTON
          ================================= */}

          <Form.Item className="!mb-0 !mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isPending}
              className="
                !h-12
                !rounded-xl
                !border-none
                !bg-[#0359fa]
                hover:!bg-[#011aa8]
                !text-white
                !font-semibold
                !text-base
                shadow-lg
                shadow-[#4EA674]/20
              "
            >
              {isPending ? "Kirilmoqda..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
