import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRouter from "./private/ProtectedRouter";
import Loader from "./components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Notification from "./components/Notification";
import "./App.css";

const Login = React.lazy(() => import("./pages/auth/Login"));
const Layout = React.lazy(() => import("./components/Layout"));

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
      <Notification />
    </>
  );
};

export default App;
