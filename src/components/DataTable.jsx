"use client";

import { useContext, useState } from "react";
import { Table, Pagination } from "antd";
import { ThemeContext } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";
import MyButton from "./ui/MyButton";
import {
  CheckCircleOutlined,
  ExportOutlined,
  FormOutlined,
  StopOutlined,
} from "@ant-design/icons";
const DataTable = ({
  searchText,
  data,
  length,
  setPageNum,
  columns,
  selection,
  filterKeys,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {
    theme,
    mainColor,
    bgColor,
    bgHoverColor,
    bgHelperColor,
    textColor,
    borderColor,
  } = useContext(ThemeContext);
  const location = useLocation();
  const path = location.pathname;
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };
  const goToDetailsPage = (record) => ({
    onClick: () => console.log(record),
  });

  const filteredData = data?.filter((item) =>
    filterKeys.some((key) =>
      item[key]?.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <Table
        rowSelection={selection ? rowSelection : ""}
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        // onRow={goToDetailsPage}
        className="section"
        sticky
      />
      <div className="flex justify-between items-center section">
        {selectedRowKeys.length > 0 && (
          <MyButton
            icon={<ExportOutlined />}
            text={"Export"}
            className="export-btn"
          />
        )}
        {selectedRowKeys.length > 0 && path == "/products" && (
          <div className="flex gap-2">
            <MyButton
              icon={<CheckCircleOutlined />}
              text={"Enable"}
              className="enable-btn"
            />
            <MyButton
              icon={<StopOutlined />}
              text={"Disable"}
              className="disable-btn"
            />
            <MyButton
              icon={<FormOutlined />}
              text={"Update Pricing"}
              className="update-pricing-btn"
            />
          </div>
        )}
        <div className="ml-auto flex justify-center items-center">
          <Pagination
            total={length}
            pageSize={10}
            showSizeChanger={false}
            itemRender={(page, type, originalElement) => {
              if (type === "prev" || type === "next") {
                return (
                  <MyButton
                    className={type === "prev" ? "previous-btn" : "next-btn"}
                    text={type === "prev" ? "Previous" : "Next"}
                    onClick={() => {
                      setPageNum(page);
                    }}
                  />
                );
              }
              return (
                <span
                  onClick={() => {
                    setPageNum(page);
                  }}
                >
                  {originalElement}
                </span>
              );
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        .ant-table-wrapper {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          margin-bottom: 1rem;
          height: 60.9vh;
        }
        .ant-table-container,
        .ant-table-wrapper {
          background: ${bgColor} !important;
        }

        .ant-table-sticky-scroll,
        .ant-table-sticky-scroll-bar {
          display: none !important;
        }

        .ant-table-wrapper::-webkit-scrollbar {
          width: 0.7rem !important;
          height: 0.7rem !important;
        }
        ::-webkit-scrollbar-thumb {
          background: rgb(173, 172, 172) !important;
          height: auto !important;
          border-radius: 2rem !important;
          -webkit-border-radius: 2rem;
          -moz-border-radius: 2rem;
          -ms-border-radius: 2rem;
          -o-border-radius: 2rem;
        }

        .ant-table-thead > tr > th {
          background: ${bgHelperColor} !important;
          color: ${textColor} !important;
          font-weight: bold;
        }

        .ant-table-tbody > tr {
          background: ${theme == "light" ? bgColor : bgHoverColor};
          color: ${textColor};
          cursor: ${path == "/products" && "pointer"};
        }
        /* .ant-table-tbody > tr:nth-child(even) {
            background: ${bgHoverColor};
            }*/

        .ant-table-tbody > tr > td {
          padding: 16px 8px;
        }
        .ant-table-cell {
          border-bottom: 1px solid ${borderColor} !important;
        }
        .ant-table-cell:has(.ant-empty) {
          height: 50vh;
        }
        .ant-table-cell:has(.ant-empty),
        .ant-empty,
        .ant-empty > .ant-empty-image > svg {
          background: ${bgColor} !important;
          color: ${textColor} !important;
        }

        .ant-empty-description {
          color: ${theme == "dark" ? textColor : ""} !important;
        }

        .ant-table-tbody > .ant-table-row-selected > .ant-table-cell {
          background: ${theme == "dark"
            ? "rgb(50, 50, 50)"
            : "rgb(220,220,220)"} !important;
        }

        .ant-table-tbody > tr:hover > .ant-table-cell-row-hover {
          background: ${theme == "light"
            ? bgHoverColor
            : bgHelperColor} !important;
          color: ${textColor} !important;
        }
        .ant-checkbox-wrapper {
          margin-left: 8px;
        }
        .ant-pagination-item {
          border: 2px solid ${mainColor} !important;
          border-radius: 3px !important;
          background: ${bgColor} !important;
          color: ${textColor} !important;
          height: 2.3rem !important;
          width: 2.3rem !important;
          display: flex !important;
          justify-content: center !important;
          align-items: end !important;
          padding: 0% !important;
        }
        .previous-btn,
        .next-btn {
          background-color: transparent !important;
          border-width: 2px;
          font-weight: bold;
          border-color: ${mainColor} !important;
          color: ${mainColor} !important;
        }

        :is(.previous-btn, .next-btn):hover {
          color: white !important;
        }
        .ant-pagination-item a {
          color: ${theme == "light" ? mainColor : textColor} !important;
          font-size: 0.7rem;
          font-weight: bold;
        }
        .ant-pagination-item-active {
          background: ${theme == "light" ? mainColor : bgColor} !important;
        }
        .ant-pagination-item-active a {
          color: ${theme == "light" ? "white" : mainColor} !important;
          font-size: 1.3rem;
        }
        .export-btn {
          margin-right: 0.8rem;
        }
        :is(.previous-btn, .next-btn, .update-pricing-btn, .export-btn):hover {
          background-color: ${mainColor} !important;
          border-color: ${mainColor} !important;
        }

        .enable-btn:hover {
          background: #52c41a !important;
          color: white !important;
          border-color: #52c41a !important;
        }
        .disable-btn:hover {
          background: #b91c1c !important;
          color: white !important;
          border-color: #b91c1c !important;
        }
        :is(.export-btn, .enable-btn, .disable-btn, .update-pricing-btn):hover {
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default DataTable;
