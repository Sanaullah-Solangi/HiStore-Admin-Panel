import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import StickyHeader from "../components/common/StickyHeader";
export default function AdminLayout() {
  return (
    <div className="flex h-screen max-w-[1500px] m-auto">
      <Sidebar />
      <div className="flex-1 overflow-auto section">
        <StickyHeader />
        <Outlet />
      </div>
    </div>
  );
}
