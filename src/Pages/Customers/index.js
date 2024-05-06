import { Space, Typography,Table, Avatar} from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../Api";
// import Table from "antd/es/tabs/TabPane";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false); 
    });
  }, []);

  return (
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Customers</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: "Photo",
              dataIndex: "image",
              render: (link) => {
              return <Avatar src={link} />;
            },
            },
            {
              title: "FirstNamee",
              dataIndex: "firstName",
            },
            {
              title: "LastName",
              dataIndex: "lastName",
            },
            {
              title: "Email",
              dataIndex: "email",
            },
            {
              title: "Phone",
              dataIndex: "phone",
            },
           
            {
              title: "Address",
              dataIndex: "address",
              render: (address) =>{
                return <span>{address.address},{address.city}</span>
              }
            },
            {
              title: "password",
              dataIndex: "password",
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize:6
          }}
        ></Table>
      </Space>

  );
}
export default Customers;

