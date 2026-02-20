import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

import Login from "../pages/Login";
import StaffManage from "../pages/StaffManage";
import ProductManage from "../pages/ProductManage";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="products" replace />} />

          <Route
            path="staffs"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <StaffManage />
              </ProtectedRoute>
            }
          />

          <Route
            path="products"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
                <ProductManage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
