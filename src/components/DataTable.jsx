"use client";

import { useContext, useState } from "react";
import { Table, Button, Pagination } from "antd";
import { ThemeContext } from "../context/ThemeContext";

const DataTable = ({
  searchText,
  data,
  length,
  setPageNum,
  columns,
  selection,
  filterKeys,
}) => {
  console.log("columns", filterKeys);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { theme, bgColor, bgHoverColor, textColor, mainColor } =
    useContext(ThemeContext);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

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
        className="usersTable section"
      />
      <div className="flex justify-between items-center section">
        {selectedRowKeys.length > 0 && <Button>Export</Button>}
        <div className="ml-auto">
          <Pagination
            total={length}
            pageSize={10}
            showSizeChanger={false}
            itemRender={(page, type, originalElement) => {
              if (type === "prev" || type === "next") {
                return (
                  <Button
                    style={{
                      backgroundColor: `${mainColor}`,
                      borderColor: `${mainColor}`,
                      color: "white",
                    }}
                    onClick={() => {
                      setPageNum(page);
                    }}
                  >
                    {type === "prev" ? "Previous" : "Next"}
                  </Button>
                );
              }
              return originalElement;
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        .usersTable {
          overflow: auto;
          margin-bottom: 1rem;
          height: 60vh;
        }

        .usersTable::-webkit-scrollbar {
          width: 0.7rem;
          height: 0.7rem;
        }
        ::-webkit-scrollbar-thumb {
          background: rgb(173, 172, 172);
          height: auto;
          border-radius: 2rem;
          -webkit-border-radius: 2rem;
          -moz-border-radius: 2rem;
          -ms-border-radius: 2rem;
          -o-border-radius: 2rem;
        }

        .ant-table-content {
          background: ${bgColor};
        }

        .ant-table-thead > tr > th {
          background: ${bgHoverColor} !important;
          color: ${textColor} !important;
          font-weight: bold;
        }

        .ant-table-tbody > tr {
          background: ${bgColor};
          color: ${textColor};
        }
        .ant-table-tbody > tr:nth-child(even) {
          background: ${bgHoverColor};
        }
        .ant-table-tbody > tr > td {
          padding: 16px 8px;
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
          color: ${theme == "black" ? textColor : ""} !important;
        }

        .ant-table-tbody > .ant-table-row-selected > .ant-table-cell {
          background: ${theme == "black"
            ? "rgb(50, 50, 50)"
            : "rgb(220,220,220)"} !important;
        }

        .ant-table-tbody > tr:hover > .ant-table-cell-row-hover {
          background: ${bgHoverColor} !important;
          color: ${textColor} !important;
        }
        .ant-checkbox-wrapper {
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
};

export default DataTable;
