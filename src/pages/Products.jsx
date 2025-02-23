// "use client";

import { useContext, useEffect, useState } from "react";
import { Button, Input } from "antd";
import {
  SearchOutlined,
  SyncOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import DataTable from "../components/DataTable";
import { ThemeContext } from "../context/ThemeContext";
import FilterDropdown from "../components/common/FilterDropdown";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const { theme, bgColor, bgHoverColor, textColor } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(10);
  const [filtersValue, setFiltersValue] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataFromDB();
  }, [pageNum, filtersValue]);

  console.log(products);
  // FUNCTION TO FETCH DATA
  const fetchDataFromDB = async () => {
    try {
      let response = await fetch("../../public/products.json");
      let data = await response.json();
      setTotal(data.length);

      // if (filtersValue.filter_0) {
      //   data = data.filter((item) => item.status == filtersValue.filter_0);
      // }
      // if (filtersValue.filter_1) {
      //   data = data.filter((item) => item.hasOrdered == filtersValue.filter_1);
      // }
      // if (filtersValue.filter_2) {
      //   data = data.filter(
      //     (item) => item.lastOrderDate == filtersValue.filter_2
      //   );
      // }
      if (pageNum == 1) {
        data = data.slice(0, 10);
      }
      if (pageNum == 2) {
        data = data.slice(10, 20);
      }
      if (pageNum == 3) {
        data = data.slice(20);
      }
      setProducts(data);
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  };

  // TABLE COLUMNS
  const columns = [
    {
      title: "PRODUCT IMAGE",
      dataIndex: "title",
      key: "name",
    },
    {
      title: "BRAND",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "ACTION",
      key: "action",
      render: (record) => (
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => navigate(`/user-details/${record.id}`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  // SEARCHING
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // DEFINING FILTERS
  const filters = [
    { heading: "Categories", values: ["All Products", "Card", "Mugs"] },
    { heading: "Status", values: ["Live", "Hidden"] },
    { heading: "Price", values: ["Under $50", "$50 - $100", "$100 - $200"] },
  ];

  const filterKeys = ["title", "category", "status", "brand"];

  return (
    <div className="mainContainer section flex-1 overflow-auto p-6">
      <div className="flex-1 h-full section  overflow-hidden">
        <div
          style={{ backgroundColor: bgColor }}
          className="h-full p-4 shadow-sm "
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search by title/category or status"
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: 250 }}
              />
              <FilterDropdown
                filters={filters}
                onApply={setFiltersValue}
                defaultValues={{
                  filter_0: "",
                  filter_1: "",
                  filter_2: null,
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button icon={<SyncOutlined />}>Sync</Button>
              <Button icon={<FileExcelOutlined />}>Export CSV</Button>
            </div>
          </div>
          <DataTable
            searchText={searchText}
            data={products}
            length={total}
            setPageNum={setPageNum}
            columns={columns}
            selection={true}
            filterKeys={filterKeys}
          />
        </div>
      </div>
      <style jsx global>{`
        .mainContainer {
          background: ${theme == "light" ? bgHoverColor : "rgb(45,45,45)"};
        `}</style>
    </div>
  );
};

export default Products;
