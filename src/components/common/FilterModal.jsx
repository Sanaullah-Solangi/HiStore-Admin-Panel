"use client";

import { useState, useEffect, useContext } from "react";
import { Modal, Upload, Button } from "antd";
import { CloseOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { ThemeContext } from "../../context/ThemeContext";
import MyButton from "../ui/MyButton";
import MyInput from "../ui/MyInput";

const FilterModal = ({ visible, onClose, onApply }) => {
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState(10.0);
  const [markUpPrice, setMarkUpPrice] = useState(10.0);
  const [finalPrice, setFinalPrice] = useState(basePrice + markUpPrice);
  const {
    textColor,
    bgColor,
    bgHoverColor,
    bgHelperColor,
    theme,
    mainColor,
    shadowColor,
  } = useContext(ThemeContext);

  useEffect(() => {
    if (visible) {
      const initialValues = {};
    }
  }, [visible]);
  useEffect(
    () => setFinalPrice(Number(markUpPrice) * Number(basePrice)),
    [basePrice, markUpPrice]
  );
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={<CloseOutlined />}
      width={450}
      style={{ background: `${bgColor}` }}
    >
      <div className="filter-content">
        <h2 className="filter-heading">Edit Product</h2>
        <label className="filter-label">Product Description:</label>
        <textarea
          className="filter-input"
          placeholder="Enter product description..."
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="filter-label">Product Image:</label>
        <Upload>
          <MyButton
            className="upload-btn"
            icon={<CloudUploadOutlined />}
            text={"Select File"}
          />
        </Upload>

        <div className="price-details">
          <p>Base Price:</p>
          <MyInput
            style={{ color: "#d32f2f", fontWeight: "bold" }}
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            type="number"
          />
          <p>Mark up %:</p>
          <MyInput
            style={{ color: "#d32f2f", fontWeight: "bold" }}
            value={markUpPrice}
            onChange={(e) => setMarkUpPrice(e.target.value)}
            type="number"
          />
          <p>Final Price:</p>
          <span className="price-value">{finalPrice}</span>
        </div>

        <div className="filter-actions">
          <MyButton
            text={"Save Update"}
            style={{ background: mainColor, color: "White" }}
            onClick={() => onApply(description, finalPrice)}
          />
          <MyButton text={"Cancel"} onClick={onClose} />
        </div>
      </div>

      <style jsx global>{`
        .ant-modal-wrap {
          background: rgba(180, 180, 180, 0.1);
        }
        .ant-modal-content {
          padding: 0% !important;
          margin-top: -15%;
          box-shadow: ${shadowColor} !important;
          -webkit-box-shadow: ${shadowColor} !important;
          -moz-box-shadow: ${shadowColor} !important;
        }

        .ant-modal-content,
        .filter-heading,
        .ant-modal-close {
          background: ${bgColor} !important;
        }
        .filter-heading {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .ant-modal-close svg {
          color: ${textColor} !important;
        }
        .filter-content {
          border-radius: 130% !important;
          padding: 16px;
          color: ${textColor};
          background: ${bgColor};
        }

        .upload-btn {
          border-radius: 5px !important;
        }
        .filter-label {
          display: block;
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 5px;
        }
        .filter-input {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid rgb(187, 187, 187);
          border-radius: 3px;
          resize: none;
          background: ${theme == "dark" ? bgHoverColor : ""};
        }

        .filter-input:hover,
        .filter-input:focus {
          border-color: ${mainColor} !important;
        }
        .price-details {
          margin-top: 15px;
        }
        .price-details > p {
          margin-top: 8px;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
        .price-details > p,
        .price-value {
          font-weight: bold;
        }
        .price-value {
          color: #d32f2f;
        }

        .filter-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 24px;
          padding-top: 16px;
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
