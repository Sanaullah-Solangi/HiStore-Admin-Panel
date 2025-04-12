// "use client";

import { useContext, useEffect, useState } from "react";
import {
  SearchOutlined,
  SyncOutlined,
  FileExcelOutlined,
  EditOutlined,
  EyeOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  FormOutlined,
} from "@ant-design/icons";
import DataTable from "../components/DataTable";
import { ThemeContext } from "../context/ThemeContext";
import FilterDropdown from "../components/common/FilterDropdown";
import { useNavigate } from "react-router-dom";
import MyInput from "../components/ui/MyInput";
import MyButton from "../components/ui/MyButton";
import FilterModal from "../components/common/FilterModal";
const Products = () => {
  const {
    theme,
    mainColor,
    bgColor,
    bgHoverColor,
    bgHelperColor,
    textColor,
    secondaryTextColor,
    borderColor,
  } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(10);
  const [filtersValue, setFiltersValue] = useState([]);
  console.log("SELECTED ROW ID =>", visible);
  useEffect(() => {
    fetchDataFromDB();
  }, [pageNum, filtersValue]);

  const editProduct = (description, finalPrice) => {
    const details = {
      description,
      finalPrice,
    };
    console.log(details);
  };

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
        <div
          className="btn-wrapper"
          onClick={() => {
            setShowEditBtn(!showEditBtn);
            setSelectedRowId(selectedRowId === record.id ? null : record.id);
          }}
        >
          Action
          {selectedRowId == record.id ? (
            <CaretRightOutlined className="arrow" />
          ) : (
            <CaretLeftOutlined className="arrow" />
          )}
          <div
            style={{
              position: "absolute",
              top: "115%",
              right: `${selectedRowId == record.id ? "-5%" : "-200%"}`,
              opacity: `${selectedRowId == record.id ? "1" : "0"}`,
              transition: "all ease-in-out 200ms",
              zIndex: "1000",
              display: "flex",
              justifyContent: "center",
              alignItems: "cente",
              flexDirection: "column",
              background: bgColor,
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
              minWidth: "150%",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            {/* EDIT BTN */}
            <MyButton
              text={"Edit"}
              icon={<FormOutlined className="menu-btn-icon" />}
              className="menu-btn"
              onClick={() => setVisible(true)}
            />
            {/* VIEW BTN */}
            <MyButton
              text={"View"}
              icon={<EyeOutlined className="menu-btn-icon" />}
              className="menu-btn"
              onClick={() => navigate("/product-details")}
            />
          </div>
        </div>
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
              <MyInput
                placeholder={"Search by title/category or status"}
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
              <MyButton text={"Sync"} icon={<SyncOutlined />} />
              <MyButton text={"Export CSV"} icon={<FileExcelOutlined />} />
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
      {visible && (
        <FilterModal
          visible={visible}
          onClose={() => setVisible(false)}
          onApply={editProduct}
        />
      )}
      <style jsx global>{`
        .mainContainer {
          background: ${theme == "light" ? bgHoverColor : "rgb(45,45,45)"};
        }
        .btn-wrapper {
          transition: all linear 200ms !important;
          background: ${theme == "dark" && bgHoverColor};
          border: 1px solid ${borderColor};
          color: ${theme == "dark" && secondaryTextColor};
          border-radius: 3px;
          padding-block: 0.5rem;
          width: 90px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-wrapper:hover {
          border-color: ${theme == "light"
            ? secondaryTextColor
            : textColor} !important;
          color: ${textColor} !important;
        }
        .arrow {
          color: rgb(137, 137, 137);
        }
        .btn-wrapper:hover > .arrow {
          color: ${textColor};
        }

        .menu-btn {
          background: transparent;
          min-width: 100%;
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 1.2rem;
          padding-inline: 0.7rem;
          font-weight: 500;
          border: none !important;
        }
        .menu-btn:nth-child(1) {
          border-bottom: 1px solid rgba(110, 110, 110, 0.1) !important;
        }
        .menu-btn:hover {
          background: ${bgHoverColor} !important;
        }

        .menu-btn-icon {
          font-size: 1.4rem !important;
        }
      `}</style>
    </div>
  );
};

export default Products;
