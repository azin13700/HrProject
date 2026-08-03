import "./selectRole.scss";
import { Button, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/api";
import {
  getUserData,
  setSelectedRole,
  logout,
} from "../../../api/authService";

function SelectRole() {
  const navigate = useNavigate();

  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noPermission, setNoPermission] = useState(false);

  const userData = getUserData();

  const fullName = userData?.fullName ?? "";
  const roles = userData?.roles ?? [];

  const onSelectRole = async () => {
    if (!selectedRoleId) {
      message.warning("لطفاً یک نقش را انتخاب کنید");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/Auth/SelectRole", {
        userId: userData.userId,
        roleId: selectedRoleId,
      });

      setSelectedRole(response.data);

      if ((response.data.permissions ?? []).length === 0) {
        setNoPermission(true);
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      message.error(err.response?.data?.message ?? "خطا");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="select-role-container">
      <div className="select-role-card">
        {!noPermission && (
          <>
            <div className="header">
              <div className="icon-wrapper">
                <i className="pi pi-user"></i>
              </div>

              <h1>انتخاب نقش</h1>

              <p className="welcome-text">
                خوش آمدید {fullName}
              </p>

              <p className="sub-text">
                لطفاً نقش مورد نظر خود را برای ورود انتخاب کنید
              </p>

              {roles.length > 0 && (
                <span className="role-count">
                  تعداد نقش‌ها: {roles.length}
                </span>
              )}
            </div>

            {roles.length === 0 ? (
              <div className="no-roles">
                <i className="pi pi-exclamation-triangle"></i>

                <p>شما هیچ نقشی در سیستم ندارید</p>

                <p className="hint">
                  لطفاً با مدیر سیستم تماس بگیرید
                </p>

                <Button
                  danger
                  onClick={logout}
                >
                  خروج
                </Button>
              </div>
            ) : (
              <>
                <div className="roles-grid">
                  {roles.map((role) => (
                    <div
                      key={role.roleId}
                      className={`role-card ${
                        selectedRoleId === role.roleId
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedRoleId(role.roleId)
                      }
                    >
                      <div className="role-icon">
                        <i className="pi pi-shield"></i>
                      </div>

                      <div className="role-info">
                        <h3>{role.roleName}</h3>

                        <p>{role.description}</p>
                      </div>

                      <div
                        className={`role-check ${
                          selectedRoleId === role.roleId
                            ? "selected"
                            : ""
                        }`}
                      >
                        <i className="pi pi-check-circle"></i>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="actions">
                  <Button
                    type="primary"
                    size="large"
                    className="login-btn"
                    loading={loading}
                    disabled={!selectedRoleId}
                    onClick={onSelectRole}
                  >
                    ورود با این نقش
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {noPermission && (
          <div className="no-permission">
            <div className="no-permission-icon">
              <i className="pi pi-lock"></i>
            </div>

            <h2>شما هیچ دسترسی به سامانه ندارید</h2>

            <p>لطفاً با مدیر سیستم تماس بگیرید</p>

            <Button
              danger
              onClick={logout}
            >
              خروج از حساب
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectRole;