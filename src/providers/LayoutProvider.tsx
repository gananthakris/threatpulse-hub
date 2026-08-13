"use client";

import React, { useState, ReactNode } from "react";
import LeftSidebarMenu from "@/components/Layout/LeftSidebarMenu";
import TopNavbar from "@/components/Layout/TopNavbar/index";
import Footer from "@/components/Layout/Footer";

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  return (
    <div className={`main-wrapper-content ${collapsed ? "active" : ""}`}>
      <TopNavbar toggleActive={toggle} />
      <LeftSidebarMenu toggleActive={toggle} isCollapsed={collapsed} />
      <div className="main-content">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default LayoutProvider;
