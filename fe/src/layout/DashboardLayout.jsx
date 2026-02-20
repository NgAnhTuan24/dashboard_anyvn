import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="layout">
      <Sidebar isOpen={isOpen} />

      <div className={`main ${!isOpen ? "full" : ""}`}>
        <div className="topbar">
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
