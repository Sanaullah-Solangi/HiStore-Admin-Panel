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

const Users = () => {
  const { theme, bgColor, bgHoverColor, textColor } = useContext(ThemeContext);
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
        <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => navigate(`/user-details/${record.id}`)}
        >
          View
        </Button>
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
  console.log("filterKeys =>", filterKeys);
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
                placeholder="Search by name/email or phone"
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
        `}</style>
    </div>
  );
};

export default Users;
