import { Select, Input, Button, Typography, Image } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useParams } from "react-router-dom";
import DataTable from "../components/DataTable";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function UserDetails() {
  const { theme, bgColor, bgHoverColor, mainColor, textColor } =
    useContext(ThemeContext);
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => fetchDataFromDB, []);
  const fetchDataFromDB = async () => {
    try {
      let response = await fetch("../../public/users.json");
      let data = await response.json();
      data = data.filter((item) => item.id == id);
      setUser(data[0]);
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  };

  const columns = [
    { title: "ORDER ID", dataIndex: "orderId", key: "orderId" },
    { title: "PRODUCT NAME", dataIndex: "productName", key: "productName" },
    { title: "DATE", dataIndex: "date", key: "date" },
    { title: "STATUS", dataIndex: "status", key: "status" },
  ];

  return (
    <div className="mainContainer section flex-1 overflow-auto p-6">
      <div className="innerContainer transition-all duration-300 ease-in-out p-6 rounded-lg shadow-md">
        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 flex justify-center items-center gap-2 flex-col">
            <Text className="infoHeading">Profile Image</Text>
            <div>
              <Image
                src="https://i.pinimg.com/736x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg"
                className="profileDP"
              />
            </div>
          </div>
          <div>
            <Text className="infoHeading">Customer name</Text>
            <div>
              <Text className="infoText font-semibold">{user.name}</Text>
            </div>
          </div>
          <div>
            <Text className="infoHeading">Email</Text>
            <div>
              <Text className="infoText font-semibold">{user.email}</Text>
            </div>
          </div>
          <div>
            <Text className="infoHeading addressHeading">Address</Text>
            <div>
              <Text className="infoText font-semibold">
                {user?.addresses?.map((address) => (
                  <p className="address">{address}</p>
                ))}
              </Text>
            </div>
          </div>
          <div>
            <Text className="infoHeading">Phone</Text>
            <div>
              <Text className="infoText font-semibold">{user.phone}</Text>
            </div>
          </div>
        </div>
        {/* Customer Role */}
        <div className="mt-6 flex items-center gap-4">
          <Text className="infoHeading">Customer Role</Text>
          <Select
            defaultValue={`${user.role}`}
            className="w-36"
            options={[
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ]}
          />
          <Button type="primary" className="btn">
            Update
          </Button>
        </div>
        {/* Account Status */}
        <div className="mt-6 flex items-center gap-4">
          <Text className="infoHeading">Account Status</Text>
          <Select
            defaultValue={`${user.status}`}
            className="w-36"
            options={[
              { value: "active", label: "Active" },
              { value: "block", label: "Block" },
              { value: "unblock", label: "Unblock" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
          <Button type="primary" className="btn">
            Update
          </Button>
        </div>

        {/* Customer Note */}
        <div className="mt-6">
          <Text className="infoHeading">Add Customer Note</Text>
          <TextArea
            rows={4}
            placeholder="Enter note here..."
            className="addNote mt-2"
          />
          <Button type="primary" className="btn mt-4">
            Save
          </Button>
        </div>

        {/* Order History */}
        <div className="mt-6">
          <Title
            style={{
              color: `${theme == "light" ? "black" : "#B0B0B0"}`,
            }}
            level={5}
          >
            Order History
          </Title>
          <DataTable
            columns={columns}
            dataSource={user.orders}
            pagination={false}
            selection={false}
            className="mt-4 usersTable"
          />
        </div>

        {/* Payment History */}
        <div className="mt-6">
          <Title
            style={{
              color: `${theme == "light" ? "black" : "#B0B0B0"}`,
            }}
            level={5}
          >
            Payment History
          </Title>
          <div className="grid grid-cols-3 gap-12">
            <div>
              <Text className="infoHeading">Payment Amount</Text>
              <div>
                <Text className="infoText font-semibold">$50.00</Text>
              </div>
            </div>
            <div>
              <Text className="infoHeading">Payment Confirmation</Text>
              <div>
                <Text className="infoText font-semibold">
                  02/15/24 12:30 PM
                </Text>
              </div>
            </div>
            <div>
              <Text className="infoHeading">Status</Text>
              <div>
                <Text className="infoText font-semibold">Approved</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Send Email Button */}
        <Button type="primary" icon={<MailOutlined />} className="btn mt-6">
          Send Email
        </Button>
      </div>
      <style jsx global>{`
        .mainContainer {
          background: ${theme == "light" ? bgHoverColor : "rgb(45,45,45)"};
        }
        .innerContainer {
          background: ${bgColor};
        }

        .profileDP {
          width: 100px !important;
          height: 100px !important;
          border-radius: 50%;
        }
        .infoHeading {
          color: ${theme == "light" ? "rgb(107 114 128)" : "#B0B0B0"};
        }
        .infoText {
          color: ${textColor};
        }
        .addNote {
          background: ${bgHoverColor};
          color: ${textColor};
        }
        .addNote:focus,
        .addNote:hover {
          background: ${bgHoverColor};
          color: ${textColor};
          border-color: ${theme == "light" ? bgHoverColor : textColor};
        }

        .addressHeading {
          display: block;
          margin-bottom: 0.5rem;
        }

        .address {
          line-height: 0.5rem;
        }

        .btn {
          background: ${mainColor};
        }
      `}</style>
    </div>
  );
}
