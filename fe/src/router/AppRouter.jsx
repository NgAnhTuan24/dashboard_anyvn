import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import StaffManage from "../pages/StaffManage";
import CustomerManage from "../pages/CustomerManage";
import ProductManage from "../pages/ProductManage";
import OrderManage from "../pages/OrderManage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element = {<Dashboard />} />
          <Route path="/staffs" element = {<StaffManage />} />
          <Route path="/customers" element = {<CustomerManage />} />
          <Route path="/products" element = {<ProductManage />} />
          <Route path="/orders" element = {<OrderManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
