import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRouter from "./private/ProtectedRouter";
import Loader from "./components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Login = React.lazy(() => import("./pages/auth/Login"));
const Layout = React.lazy(() => import("./components/Layout"));

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route element={<ProtectedRouter />}>
            <Route
              path="/*"
              element={
                <React.Suspense fallback={<Loader />}>
                  <Layout />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
