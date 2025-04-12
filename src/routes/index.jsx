// HOOKS
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import ScrollTop from "../components/common/ScrollTop";
import NotFound from "../components/common/NotFound";
import Users from "../pages/Users";
import UserDetails from "../pages/UserDetails";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        {/* HOME ROUTES STACK */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="user-details/:id" element={<UserDetails />} />
          <Route path="products" element={<Products />} />
          <Route path="product-details" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
