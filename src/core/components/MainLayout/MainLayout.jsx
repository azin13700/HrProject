import "./MainLayout.scss";
import { Button } from "antd";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { 
  MenuOutlined, 
  CloseOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  BookOutlined,
  FileTextOutlined,

  TeamOutlined,
  ApiOutlined
} from "@ant-design/icons";

import {
  getUserData,
  getUserPermissions,
} from "../../../api/authService";

function MainLayout() {
  const [visible, setVisible] = useState(false);


  const logout = async () => {
    // logout();
  };

  const toggleDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const userData = getUserData();
  const selectedRoleName = userData?.selectedRole?.roleName ?? userData?.roleName ?? "";
  const fullName = userData?.fullName ?? "کاربر";

  const buildMenu = () => {
    const permissions = getUserPermissions();

    const menuItems = [];


    const userManagementItems = [];

    if (permissions.includes("User.View")) {
      userManagementItems.push({
        label: "لیست کاربران",
        icon: <TeamOutlined />,
        path: "/dashboard/list-user",
      });
    }

    if (permissions.includes("Role.View")) {
      userManagementItems.push({
        label: "لیست نقش‌ها",
        icon: <SettingOutlined />,
        path: "/dashboard/list-role",
      });

      if (permissions.includes("permission.View")) {
        userManagementItems.push({
          label: "دسترسی‌های نقش",
          icon: <ApiOutlined />,
          path: "/dashboard/role-permission",
        });
      }
    }

    if (permissions.includes("state.View")) {
      userManagementItems.push({
        label: "لیست وضعیت‌ها",
        icon: <FileTextOutlined />,
        path: "/dashboard/list-state",
      });
    }

    if (permissions.includes("workflow.View")) {
      userManagementItems.push({
        label: "کارتابل من",
        icon: <FileTextOutlined />,
        path: "/dashboard/workflow",
      });
    }

    if (permissions.includes("Unit.View")) {
      userManagementItems.push({
        label: "چارت سازمانی",
        icon: <TeamOutlined />,
        path: "/dashboard/list-unit",
      });
    }

    if (permissions.includes("Subject.View")) {
      userManagementItems.push({
        label: "لیست موضوعات",
        icon: <BookOutlined />,
        path: "/dashboard/list-subject",
      });
    }

    if (permissions.includes("Request.View")) {
      userManagementItems.push({
        label: "ثبت درخواست",
        icon: <FileTextOutlined />,
        path: "/dashboard/request",
      });
    }

    if (userManagementItems.length > 0) {
      menuItems.push({
        label: "مدیریت کاربران",
        items: userManagementItems,
      });
    }

    return menuItems;
  };

  const items = buildMenu();



  return (
    <div className="layout">
      {/* ===== TOPBAR ===== */}
      <header className="topbar">
        <Button className="menu-toggle" onClick={toggleDrawer}>
          <MenuOutlined />
        </Button>

        <span className="title">سامانه ارتباط مردمی</span>

        <div className="topbar-right">


          <span className="role-badge">
            <UserOutlined />
            {selectedRoleName}
          </span>

          <Button className="logout-btn" onClick={logout}>
            <LogoutOutlined />
            خروج
          </Button>
        </div>
      </header>

      {/* ===== SIDEBAR OVERLAY ===== */}
      {visible && <div className="sidebar-overlay" onClick={closeDrawer} />}

      {/* ===== SIDEBAR ===== */}
      <aside className={`sidebar ${visible ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <BookOutlined />
            <span>سامانه ارتباط مردمی</span>
          </div>

          <button className="sidebar-close" onClick={closeDrawer}>
            <CloseOutlined />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            <UserOutlined />
          </div>

          <div className="user-info">
            <span className="user-name">{fullName}</span>
            <span className="user-role">{selectedRoleName}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {!item.items ? (
                  <Link to={item.path} className="nav-link" onClick={closeDrawer}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <>
                    <div className="nav-group-title">{item.label}</div>
                    <ul>
                      {item.items.map((child, childIndex) => (
                        <li key={childIndex}>
                          <Link
                            to={child.path}
                            className="nav-link"
                            onClick={closeDrawer}
                          >
                            {child.icon}
                            <span>{child.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>

     
      </aside>

      {/* ===== CONTENT ===== */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;