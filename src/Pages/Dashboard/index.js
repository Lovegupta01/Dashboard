import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import {getCustomers, getInventory, getOrders,getRevenue} from "../../Api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  
  const [orders,setOrders] = useState(0);
  const [inventory,setInventory] = useState(0);
  const [customer,setCustomers] = useState(0);
  const [revenue,setRevenue] = useState(0);

  useEffect((res) =>{
    getOrders().then(res =>{
      setOrders(res.total)
      setRevenue(res.discountedTotal)
    })
    getInventory().then(res =>{
      setInventory(res.total)
    })
    getCustomers().then(res =>{
      setCustomers(res.total)
    })

  })

  return (
    <>
      <Space size={20} direction="vertical"></Space>
      <Typography.Title level={4}> Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCrad
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                borderRadius: 20,
                fontSize: 20,
                padding: 8,
                backgroundColor: "rgba(0,255,0,0.25)",
              }}
            />
          }
          title={"Orders"}
          value={orders}
        />
        <DashboardCrad
          icon={
            <ShoppingOutlined
              style={{
                color: "purple",
                borderRadius: 20,
                fontSize: 20,
                padding: 4,
                backgroundColor: "rgba(0,255,255,0.25)",
              }}
            />
          }
          title={"Inventory"}
          value={inventory}
        />
        <DashboardCrad
          icon={
            <UserOutlined
              style={{
                color: "red",
                borderRadius: 20,
                fontSize: 20,
                padding: 4,
                backgroundColor: "rgba(255,0,0,0.25)",
              }}
            />
          }
          title={"Customer"}
          value={customer}
        />
        <DashboardCrad
          icon={
            <DollarCircleOutlined
              style={{
                color: "blue",
                borderRadius: 20,
                fontSize: 20,
                padding: 4,
                backgroundColor: "rgba(0,0,255,0.25)",
              }}
            />
          }
          title={"Revenue"}
          value={revenue}
        />
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </>
  );
}
function DashboardCrad({ title, value, icon }) {

  return (
    <Card>
      <Space>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setdataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setdataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);

  //Also you can use them
  /*useEffect(() => {
    setLoading(true);
    getOrders()
      .then((res) => {
        console.log("API response:", res); // Log the API response
        if (res && res.products) {
          setdataSource(res.products);
        } else {
          console.error("Invalid API response:", res);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);*/

  return (
    <>
      <Typography.Text>RecentOrders</Typography.Text>
      <Table
        columns={[
          {
            title: "title",
            dataIndex: "title",
          },
          {
            title: "quantity",
            dataIndex: "quantity",
          },
          {
            title: "price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });
   
  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;  
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgb(199,16,35)",
          },
        ],
      };
      setRevenueData(dataSource);
    });
  },[]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Reavnue",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
  <Bar options={options} data={revenueData} />;
  </Card>
  )
}
export default Dashboard;
