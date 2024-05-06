import { AppstoreOutlined,  ShopFilled, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { useEffect, useState } from "react";
// import FormItemLabel from "antd/es/form/FormItemLabel"
import { useLocation, useNavigate } from "react-router-dom"

function SideMenu(){
    const location = useLocation();
    const[selectedKeys,setSelectedKeys] =useState("/")
 
    useEffect(() =>{
        const pathName= location.pathname
        setSelectedKeys(pathName)
    },[location.pathname])

    const navigate = useNavigate();
    return(
        <>
        <div className="slideMenu">
        <Menu
        className="slideMenuVertical"
        mode="vertical"
          onClick={(items) =>{
            //Navigate
            navigate(items.key)

          }}
          selectedKeys={selectedKeys}
           items={[
            {   label:"Dashboard",
                key:"/",
                icon:<AppstoreOutlined />
            },
               
            {   label:"Inventory",
                key:"/Inventory",
                icon:<ShopFilled />
            },
            {   label:"Orders",
                key:"/Orders",
                icon:<ShoppingCartOutlined />
            },
            {   label:"Customers",
                key:"/Customers",
                icon:<UserOutlined />
            },
           ]}
           
        ></Menu>
         </div>
        </>
    )
}
export default SideMenu