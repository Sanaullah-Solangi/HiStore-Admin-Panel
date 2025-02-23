import { useContext } from "react";
import { Button, Result } from "antd";
import { ThemeContext } from "../../context/ThemeContext";
import StickyHeader from "./StickyHeader";
// CONTEXTS
function NotFound() {
  const { theme, color, bgColor, textColor } = useContext(ThemeContext);
  return (
    <div
      className="flex flex-1 h-full  flex-col transition-all duration-300 ease-in-out"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <Result
        style={{
          color: `${textColor}`,
          backgroundColor: `${bgColor}`,
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          transition: "all ease-in-out 300ms",
        }}
        status="404"
        title={
          <span style={{ color: theme === "light" ? "#4b5563" : "white" }}>
            404
          </span>
        }
        subTitle={
          <span style={{ color: theme === "light" ? "#6b7280" : "white" }}>
            Sorry, the page you visited does not exist.
          </span>
        }
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
}

export default NotFound;
