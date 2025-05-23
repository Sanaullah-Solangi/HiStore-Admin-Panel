"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { Button, Checkbox, Radio, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { ThemeContext } from "../../context/ThemeContext";
import MyButton from "../ui/MyButton";

const FilterDropdown = ({ filters = [], onApply, defaultValues = {} }) => {
  const {
    theme,
    mainColor,
    bgColor,
    bgHoverColor,
    bgHelperColor,
    textColor,
    secondaryTextColor,
    borderColor,
    shadowColor,
  } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const dropdownRef = useRef(null);
  useEffect(() => {
    const initialValues = {};
    filters.forEach((filter, index) => {
      if (filter.type === "date") {
        initialValues[`filter_${index}`] =
          defaultValues[`filter_${index}`] || null;
      } else {
        initialValues[`filter_${index}`] =
          defaultValues[`filter_${index}`] || "";
      }
    });
    setFilterValues(initialValues);
  }, [filters, defaultValues]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* const handleCheckboxChange = (filterIndex, value, checked) => {
    setFilterValues((prev) => {
      const currentValues = [...prev[`filter_${filterIndex}`]];
      if (checked) {
        currentValues.push(value);
      } else {
        const index = currentValues.indexOf(value);
        if (index > -1) {
          currentValues.splice(index, 1);
        }
      }
      return { ...prev, [`filter_${filterIndex}`]: currentValues };
    });
  };
*/
  const formatDateForInput = (date) => {
    return date.toISOString().split("T")[0]; // yyyy-MM-dd format
  };

  const handleDateChange = (filterIndex, date) => {
    setFilterValues((prev) => ({
      ...prev,
      [`filter_${filterIndex}`]: date,
    }));
  };

  const handleReset = () => {
    const resetValues = {};
    filters.forEach((filter, index) => {
      resetValues[`filter_${index}`] = filter.type === "date" ? null : "";
    });
    setFilterValues(resetValues);
  };

  const handleApply = () => {
    onApply(filterValues);
    setIsOpen(false);
  };

  return (
    <div className="filter-dropdown relative inline-block" ref={dropdownRef}>
      <MyButton
        text={"Filter"}
        icon={<FilterOutlined />}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="filter-dropdown-content absolute top-[100%] left-0 z-[10000] min-w-[100%] p-4  border border-[#d9d9d9] rounded ">
          <div className="flex gap-6">
            {filters.map((filter, filterIndex) => (
              <div key={filterIndex} className="filter-section  mb-4">
                {filter.type === "date" ? (
                  <>
                    <h1 className="filter-heading font-bold text-[0.9rem] mb-2 whitespace-nowrap">
                      {filter.heading}
                    </h1>
                    <input
                      type="date"
                      value={filterValues[`filter_${filterIndex}`]}
                      onChange={(e) => {
                        handleDateChange(filterIndex, e.target.value);
                      }}
                      className="datePicker border border-black text-[0.8rem] py-[0.2rem] px-[1rem] rounded-md"
                      style={{ width: "100%" }}
                    />
                  </>
                ) : (
                  <Radio.Group
                    key={filterIndex}
                    name={`filter_${filterIndex}`} // Ye ensure karega ke sirf ek selected ho
                    value={filterValues[`filter_${filterIndex}`]}
                    onChange={(value) => {
                      setFilterValues((prev) => ({
                        ...prev,
                        [`filter_${filterIndex}`]: value.target.value, // Sirf ek value store hogi
                      }));
                    }}
                  >
                    <h1 className="filter-heading font-bold text-[0.9rem] mb-2 whitespace-nowrap">
                      {filter.heading}
                    </h1>
                    {filter.values?.map((value) => (
                      <Radio
                        className="radioBtns whitespace-nowrap text-[0.8rem]"
                        key={value}
                        value={value}
                      >
                        {value == "true"
                          ? "Has orders"
                          : value == "false"
                          ? "No orders"
                          : value}
                      </Radio>
                    ))}
                  </Radio.Group>
                )}
              </div>
            ))}
          </div>

          <div className="filter-actions flex justify-end gap-2 py-4 border-t border-[#f0f0f0]">
            <MyButton text={"Reset"} onClick={handleReset} />
            <MyButton
              text={"Apply"}
              type={"primary"}
              className="apply-btn"
              onClick={handleApply}
            />
          </div>
        </div>
      )}
      <style jsx>{`
        .filter-dropdown-content {
          background-color: ${theme == "light" ? bgColor : bgHelperColor};
          border: none !important;
          box-shadow: ${shadowColor};
        }

        .filter-heading {
          color: ${theme == "light" ? textColor : secondaryTextColor};
        }

        .radioBtns {
          color: ${textColor};
        }
        .datePicker {
          background: ${bgHoverColor};
          color: ${textColor};
        }
        .ant-radio-wrapper-checked:hover .ant-radio-inner {
          border-color: ${mainColor} !important;
        }
        .ant-radio-input + .ant-radio-inner,
        .ant-radio-wrapper .ant-radio-inner {
          border: 2px solid ${textColor} !important;
          box-shadow: none !important;
          background: ${bgColor} !important;
        }

        .ant-radio-wrapper-checked .ant-radio-inner {
          border: none !important;
          background: ${mainColor} !important;
        }
        .ant-radio-wrapper-checked .ant-radio-inner:after {
          background: ${bgColor} !important;
          width: 22px !important;
          height: 22px !important;
          margin-block-start: -10.9px !important;
          margin-inline-start: -10.9px !important;
        }

        .filter-btn {
          border: 1px solid ${borderColor} !important;
        }
        .apply-btn {
          background: ${mainColor} !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default FilterDropdown;
