import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRouter from "./private/ProtectedRouter";
import Loader from "./components/Loader";
import useNotification from "./hooks/useNotification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const Login = React.lazy(() => import("./pages/auth/Login"));
const Layout = React.lazy(() => import("./components/Layout"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const App: React.FC = () => {
  useNotification();

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route
              path="/auth/login"
              element={
                <React.Suspense fallback={<Loader />}>
                  <Login />
                </React.Suspense>
              }
            />
            <Route
              element={
                <React.Suspense fallback={<Loader />}>
                  <ProtectedRouter />
                </React.Suspense>
              }
            >
              <Route
                path="*"
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
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={2000}
      />
    </>
  );
};

export default App;
