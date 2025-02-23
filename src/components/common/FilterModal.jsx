"use client";

import { useState, useEffect, useContext } from "react";
import { Modal, Checkbox, DatePicker, Button, Space, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { ThemeContext } from "../../context/ThemeContext";

const FilterModal = ({
  visible,
  onClose,
  onApply,
  filters = [],
  defaultValues = {},
}) => {
  // State to store all filter values
  const [filterValues, setFilterValues] = useState({});
  const { textColor,bgColor,theme } = useContext(ThemeContext);
  // Initialize or reset filter values when modal opens or filters change
  useEffect(() => {
    if (visible) {
      const initialValues = {};
      filters.forEach((filter) => {
        if (filter.type === "date") {
          initialValues[filter.label] = defaultValues[filter.label] || null;
        } else {
          initialValues[filter.label] = defaultValues[filter.label] || [];
        }
      });
      setFilterValues(initialValues);
    }
  }, [visible, filters, defaultValues]);

  // Handle checkbox changes
  const handleCheckboxChange = (filterLabel, values) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterLabel]: values,
    }));
  };

  // Handle date changes
  const handleDateChange = (filterLabel, date) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterLabel]: date,
    }));
  };

  // Reset all filters
  const handleReset = () => {
    const resetValues = {};
    filters.forEach((filter) => {
      resetValues[filter.label] = filter.type === "date" ? null : [];
    });
    setFilterValues(resetValues);
  };

  // Apply filters and close modal
  const handleApply = () => {
    onApply(filterValues);
    onClose();
  };

  // Render filter based on type
  const renderFilter = (filter) => {
    switch (filter.type) {
      case "date":
        return (
          <DatePicker
            value={filterValues[filter.label]}
            onChange={(date) => handleDateChange(filter.label, date)}
            format="MM/DD/YYYY"
            style={{ width: "100%" }}
          />
        );
      default:
        return (
          <Checkbox.Group
            value={filterValues[filter.label]}
            onChange={(values) => handleCheckboxChange(filter.label, values)}
          >
            <Space direction="vertical">
              {filter.values.map((value) => (
                <Checkbox key={value} value={value}>
                  {value}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        );
    }
  };

  return (
    <Modal
      title="Filter Options"
      open={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={<CloseOutlined />}
      width={400}
      style={{ background: `${bgColor}` }}
    >
      <div className="filter-content">
        {filters.map((filter, index) => (
          <div key={filter.label} className="filter-section">
            <h4>{filter.label}</h4>
            {renderFilter(filter)}
            {index < filters.length - 1 && <Divider />}
          </div>
        ))}

        <div className="filter-actions">
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>

      <style jsx global>{`
        .filter-content {
          padding: 8px 0;
          color: ${textColor};
          background: ${bgColor};
        }
        .filter-section {
          margin-bottom: 16px;
        }
        .filter-section h4 {
          margin-bottom: 12px;
          font-weight: 500;
          color: #1f2937;
        }
        .filter-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #f0f0f0;
        }
        @media (max-width: 768px) {
          .ant-modal {
            max-width: 90vw !important;
            margin: 16px !important;
          }
        }
      `}</style>
    </Modal>
  );
};

export default FilterModal;
