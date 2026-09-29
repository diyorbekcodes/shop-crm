import { Route, Routes } from "react-router";
import Dashboard from "./feature/dashboard/pages/Dashboard";
import Categories from "./feature/categories/pages/Categories";
import Customer from "./feature/customer/pages/Customer";
import OrderManagment from "./feature/orderManagment/pages/OrderManagment";
import Lauyot from "./components/lauyot/Lauyot";
import Login from "./feature/auth/pages/Login";
import Profile from "./feature/profile/pages/Profile";
import Products from "./feature/products/pages/Products";
import AddProduct from "./feature/addProduct/pages/AddProduct";
import ProductDetails from "./feature/products/components/ProductDetails";
import Brand from "./feature/brands/pages/Brand";
import Banners from "./feature/Banners/pages/Banners";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ChartDetails from "./feature/dashboard/compponet/ChartDetials";

export default function App() {
  return (
    <div>
      <Routes>
        {/* LOGIN */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* ADMIN */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Lauyot />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/chart-details" element={<ChartDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/products" element={<Products />} />
            <Route path="/brands" element={<Brand />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/orderManagment" element={<OrderManagment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addproducts" element={<AddProduct />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
