import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./core/components/LoginForm/Login";
import SelectRole from "./core/components/SelectRole/SelectRole";

import MainLayout from "./core/components/MainLayout/MainLayout";

import Home from "./core/components/Home/Home";
import ListUser from "./features/users/listUser/ListUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/select-role" element={<SelectRole />} />

        <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="list-user" element={<ListUser />} />
          {/* <Route index element={<Home />} />

          <Route path="list-user" element={<ListUser />} />

          <Route path="role-permission" element={<RolePermission />} />

          <Route path="list-role" element={<RoleList />} />

          <Route path="list-unit" element={<UnitList />} />

          <Route path="list-subject" element={<ListSubject />} />

          <Route path="list-state" element={<ListState />} />

          <Route path="request" element={<RequestPage />} />

          <Route path="workflow" element={<Dashboard />} /> */}

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;