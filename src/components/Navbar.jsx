import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";

import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  WechatOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";
import Item from "antd/lib/list/Item";
const Navbar = () => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  // const user = localStorage.getItem("user");
  // useEffect(() => {
  //   if (user === null) {
  //     navigate("/");
  //   }
  // }, [navigate, user]);

  const logout = () => {
    localStorage.removeItem("user");
    console.log(localStorage.getItem("user"));
  };
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        {/* <Avatar src={icon} /> */}
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoPedia</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>

      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          {/* <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item> */}
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
          {"http://localhost:3000/" !== window.location.href &&
          "http://localhost:3000/register" !== window.location.href ? (
            <Menu.Item icon={<LogoutOutlined />}>
              <Link to="/" onClick={logout}>
                Log Out
              </Link>
            </Menu.Item>
          ) : (
            ""
          )}
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
