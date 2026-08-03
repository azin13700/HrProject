export const setUserData = (user) => {
    localStorage.setItem("user_data", JSON.stringify(user));
};

export const getUserData = () => {
    const data = localStorage.getItem("user_data");
    return data ? JSON.parse(data) : null;
};

export const setSelectedRole = (role) => {
    localStorage.setItem("selected_role", JSON.stringify(role));
};

export const getSelectedRole = () => {
    const data = localStorage.getItem("selected_role");
    return data ? JSON.parse(data) : null;
};

export const logout = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("selected_role");
};

export const getSelectedRoleName = () => {
    return getSelectedRole()?.roleName || "";
  };
  
  export const getUserPermissions = () => {
    const role = getSelectedRole();
    return role?.permissions || [];
  };