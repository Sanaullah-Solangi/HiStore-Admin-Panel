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
import MyButton from "../components/ui/MyButton";
import MyInput from "../components/ui/MyInput";

const Users = () => {
  const {
    theme,
    bgColor,
    bgHoverColor,
    bgHelperColor,
    textColor,
    mainColor,
    secondaryTextColor,
    borderColor,
    shadowColor,
  } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(10);
  const [filtersValue, setFiltersValue] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataFromDB();
  }, [pageNum, filtersValue]);

  // FUNCTION TO FETCH DATA
  const fetchDataFromDB = async () => {
    try {
      let response = await fetch("../../public/users.json");
      let data = await response.json();
      setTotal(data.length);
      data.map((item) => {
        item.orders = item.orders.length;
      });

      if (filtersValue.filter_0) {
        data = data.filter((item) => item.status == filtersValue.filter_0);
      }
      if (filtersValue.filter_1) {
        data = data.filter((item) => item.hasOrdered == filtersValue.filter_1);
      }
      if (filtersValue.filter_2) {
        data = data.filter(
          (item) => item.lastOrderDate == filtersValue.filter_2
        );
      }
      if (pageNum == 1) {
        data = data.slice(0, 10);
      }
      if (pageNum == 2) {
        data = data.slice(10, 20);
      }
      if (pageNum == 3) {
        data = data.slice(20);
      }
      setUsers(data);
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  };

  // TABLE COLUMNS
  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ORDERS",
      dataIndex: "orders",
      key: "orders",
    },
    {
      title: "LAST ORDER DATE",
      dataIndex: "lastOrderDate",
      key: "lastOrderDate",
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
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
        <MyButton
          text="View"
          type={"link"}
          className="btn-wrapper"
          onClick={() => navigate(`/user-details/${record.id}`)}
        />
      ),
    },
  ];

  // SEARCHING
  const handleSearch = (value) => {
    setSearchText(value);
  };

  /*const handleFilterApply = async (filterValues) => {
    try {
      setIsFilterVisible(false);
      setFiltersValue(filterValues);
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  };*/

  // DEFINING FILTERS
  const filters = [
    { heading: "Customer Status", values: ["active", "inactive"] },
    { heading: "Order History", values: ["true", "false"] },
    { heading: "Date Joined", type: "date" },
  ];

  const filterKeys = ["name", "email", "role"];
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
                placeholder={"Search by name/email or phone"}
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
            data={users}
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
        }
        .ant-input-outlined,
        .ant-input-affix-wrapper {
          box-shadow: none !important;
        }

        .ant-input-outlined:focus,
        .ant-input-outlined:hover,
        .ant-input-affix-wrapper-focused {
          border-color: orange !important;
          box-shadow: ${shadowColor};
        }
        .ant-input-outlined:focus svg,
        .ant-input-outlined:hover svg,
        .ant-input-affix-wrapper-focused svg {
          color: ${mainColor};
        }
        .btn-wrapper {
          transition: all linear 200ms !important;
          background: ${theme == "dark" && bgHoverColor} !important;
          border: 1px solid ${borderColor} !important;
          color: ${theme == "dark" ? secondaryTextColor : textColor} !important;
          border-radius: 3px;
          padding-block: 0.5rem;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-wrapper:hover {
          border-color: ${mainColor} !important;
          color: ${mainColor} !important;
        }
      `}</style>
    </div>
  );
};

export default Users;
