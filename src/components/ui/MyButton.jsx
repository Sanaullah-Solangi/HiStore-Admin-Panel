import { Button } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
const MyButton = ({ children, text, icon, type, style, onClick, ...props }) => {
  const {
    theme,
    mainColor,
    bgHelperColor,
    bgHoverColor,
    textColor,
    secondaryTextColor,
    borderColor,
  } = useContext(ThemeContext);
  return (
    <>
      <Button
        icon={icon && icon}
        type={type && type}
        onClick={onClick && onClick}
        style={style && style}
        {...props}
      >
        {children && children}
        {text}
      </Button>
      <style jsx global>
        {`
          .ant-btn {
            padding-block: 1.1rem;
            border: 1px solid ${borderColor};
            border-radius: 3px !important;
            color: ${theme == "dark" && secondaryTextColor};
            background: ${theme == "dark" && bgHoverColor};
          }
          .ant-btn:hover {
            background: transparent !important;
            border-color: ${theme == "light"
              ? secondaryTextColor
              : textColor} !important;
            color: ${textColor} !important;
          }
          .apply-btn:hover {
            background: transparent !important;
            color: ${mainColor} !important;
            border-color: ${mainColor} !important;
          }
        `}
      </style>
    </>
  );
};
export default MyButton;
