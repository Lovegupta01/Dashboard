import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { BellFilled, MailOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../Api";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommmentsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  });
  return (
    <>
      <div className="header">
        <Image width={40} src="loves.jpg" />
        <Typography.Title>Admin Dashboard</Typography.Title>
        <Space>
          <Badge count={comments.length}>
            <MailOutlined
             style={{ fontSize: 24 }}
             onClick={() => {
             setCommmentsOpen(true)
            }} 
            />
          </Badge>
          <Badge count={orders.length}>
            <BellFilled
             style={{ fontSize: 24 }}
             onClick={() => {
             setNotificationOpen(true)
            }}
            />
          </Badge>
          <Drawer title="Comments" 
          open={commentsOpen}
          onClose={() =>{
            setCommmentsOpen(false)
          }}
          maskClosable
          >
            <List dataSource={comments} renderItem={(item) =>{
              return <List.Item>{item.body}</List.Item>
            }}></List>
          </Drawer>
            <Drawer title="Notifications" 
          open={notificationOpen}
          onClose={() =>{
            setNotificationOpen(false);
          }}
          maskClosable
          >
                 <List dataSource={orders} renderItem={(item) =>{
              return <List.Item>{item.title}</List.Item>
            }}></List>
          </Drawer>
        </Space>
      </div>
    </>
  );
}
export default AppHeader;
