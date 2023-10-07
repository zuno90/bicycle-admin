import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRouter from "./private/ProtectedRouter";

const Login = React.lazy(() => import("./pages/auth/Login"));
const Layout = React.lazy(() => import("./components/Layout"));

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/*" element={<Layout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
