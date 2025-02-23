"use client";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import DashboardCharts from "../components/DashBoardCharts";
import SummaryCards from "../components/SummaryCards";
import StickyHeader from "../components/common/StickyHeader";
export default function Dashboard() {
  const { bgColor, textColor } = useContext(ThemeContext);

  return (
    <main
      className="section flex-1 overflow-auto transition-all duration-300 ease-in-out"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div>
        <SummaryCards />
        <DashboardCharts />
      </div>
    </main>
  );
}
