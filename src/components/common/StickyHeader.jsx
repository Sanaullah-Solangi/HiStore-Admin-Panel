"use client";

import { useContext, useState } from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLocation } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

function StickyHeader() {
  const [isHover, setIsHover] = useState(false);
  const [helper, setHelper] = useState(0);
  const location = useLocation();
  const pathname = location.pathname;
  const { theme, bgColor, mainColor, setTheme, textColor, toggleSidebar } =
    useContext(ThemeContext);
  return (
    <div
      className="sticky top-0 z-10 flex items-center justify-between  p-4 transition-all duration-300 ease-in-out"
      style={{ backgroundColor: bgColor, borderColor: `${textColor}20` }}
    >
      <div className="flex items-center gap-4">
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
        <h1 className="text-2xl font-bold" style={{ color: textColor }}>
          {pathname == "/" ? (
            "Dashboard Overview"
          ) : pathname == "/products" ? (
            "Product Management"
          ) : pathname.includes("/product-details") ? (
            <span>
              <LeftOutlined onClick={() => window.history.back()} /> Product
              Details
            </span>
          ) : pathname == "/orders" ? (
            "Order Management"
          ) : pathname == "/users" ? (
            "Customer Management"
          ) : pathname.includes("/user-details") ? (
            <span>
              <LeftOutlined onClick={() => window.history.back()} /> Customer
              Profile
            </span>
          ) : pathname == "/admins" ? (
            "Admin Management"
          ) : pathname == "/payments" ? (
            "Payments & Transactions"
          ) : pathname == "/reports" ? (
            "Reports & Analytics"
          ) : pathname == "/profile" ? (
            "My Profile"
          ) : pathname == "/support" ? (
            "Support & Ticket System"
          ) : pathname == "/settings" ? (
            "System Settings"
          ) : (
            ""
          )}
        </h1>
      </div>

      {theme === "light" ? (
        <Moon
          onMouseOver={() => {
            setHelper(2);
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setHelper(0);
            setIsHover(false);
          }}
          style={{
            color: `${helper == 2 && isHover ? mainColor : textColor}`,
          }}
          className="h-7 w-7 cursor-pointer"
          onClick={() => {
            setTheme("dark");
          }}
        />
      ) : (
        <Sun
          onMouseOver={() => {
            setHelper(3);
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setHelper(0);
            setIsHover(false);
          }}
          style={{
            color: `${helper == 3 && isHover ? mainColor : textColor}`,
          }}
          className="h-7 w-7 cursor-pointer"
          onClick={() => {
            setTheme("light");
          }}
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
export default StickyHeader;
