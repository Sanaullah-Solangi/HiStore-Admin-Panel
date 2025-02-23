"use client";

import { useContext, useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Settings,
  LogOut,
  Menu,
  User,
  UserCog,
  CreditCard,
  MessageCircle,
  BarChart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import { ThemeContext } from "../../context/ThemeContext";
const menuItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/products", icon: Package, label: "Products" },
  { path: "/orders", icon: ShoppingCart, label: "Orders" },
  { path: "/users", icon: Users, label: "Customers" },
  { path: "/admins", icon: UserCog, label: "Admins" },
  { path: "/payments", icon: CreditCard, label: "Transactions" },
  { path: "/reports", icon: BarChart, label: "Analytics" },
  { path: "/profile", icon: User, label: "My Profile" },
  { path: "/support", icon: MessageCircle, label: "Support & Tickets" },
  { path: "/settings", icon: Settings, label: "System Settings" },
];

export default function Sidebar() {
  const [isHover, setIsHover] = useState(false);
  const [helper, setHelper] = useState(0);
  const { theme, bgColor, textColor, mainColor, sidebarOpen, toggleSidebar } =
    useContext(ThemeContext);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-[100]  flex w-[270px] flex-col border-r transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <img
            src={
              theme === "light"
                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/darkLogo-ccjuoG902U129EUVMx8XXHRIxcNVDh.png"
                : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lightLogo-T3r1nAPlaSWEot79v3dQPiTTZSvc52.png"
            }
            alt="HiStore Logo"
            className="h-8"
          />
          <Menu
            onMouseOver={() => {
              setHelper(1);
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setHelper(0);
              setIsHover(false);
            }}
            onClick={toggleSidebar}
            style={{
              color: `${helper == 1 && isHover ? mainColor : textColor}`,
            }}
            className="h-6 w-8 lg:hidden font-bold cursor-pointer"
          />
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive ? "text-white" : ""
                }`}
                style={{
                  backgroundColor: isActive ? mainColor : "transparent",
                  color: isActive ? "#fff" : textColor,
                }}
                onClick={toggleSidebar}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div style={{ borderColor: `${mainColor}20` }}>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-500 font-bold transition-colors bg-red-600/20">
              <LogOut className="h-5 w-5 font-bold" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
