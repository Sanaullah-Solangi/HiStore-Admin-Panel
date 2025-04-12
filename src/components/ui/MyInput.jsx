import { Input } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
const MyInput = ({ value, placeholder, prefix, onChange, style, type }) => {
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
  return (
    <>
      <Input
        value={value && value}
        placeholder={placeholder && placeholder}
        prefix={prefix && prefix}
        onChange={onChange && onChange}
        style={style && style}
        type={type}
      />
      <style jsx global>{`
        .ant-input-affix-wrapper {
          border-radius: 3px;
          background: ${theme == "dark" && bgHoverColor};
          border-color: ${borderColor} !important;
        }
        .ant-input::placeholder {
          color: #9ca3af !important;
        }
        .ant-input-outlined,
        .ant-input-affix-wrapper {
          box-shadow: none !important;
          color: ${theme == "dark" && "white"};
        }

        .ant-input-outlined:focus,
        .ant-input-outlined:hover,
        .ant-input-affix-wrapper-focused,
        .ant-input-affix-wrapper-focused:has(.ant-input:focus) {
          background: ${theme == "dark" && "transparent"};
          border-color: ${theme == "dark"
            ? "white"
            : secondaryTextColor} !important;
          box-shadow: ${shadowColor};
        }
        .ant-input-outlined:focus svg,
        .ant-input-outlined:hover svg,
        .ant-input-affix-wrapper-focused svg {
          color: ${textColor} !important;
        }

        .ant-input-outlined svg {
          font-size: 1.1rem;
        }
        .ant-input {
          background: ${bgHelperColor};
        }
      `}</style>
    </>
  );
};
export default MyInput;
