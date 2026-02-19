import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import StaffManage from "../pages/StaffManage";
// import CustomerManage from "../pages/CustomerManage";
import ProductManage from "../pages/ProductManage";
// import OrderManage from "../pages/OrderManage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/staffs" element={<StaffManage />} />
          {/* <Route path="/customers" element={<CustomerManage />} /> */}
          <Route path="/products" element={<ProductManage />} />
          {/* <Route path="/orders" element={<OrderManage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
