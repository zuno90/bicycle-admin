import React from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import Header from "./Header";
import routes from "../routes";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Routes>
                {routes.map(({ path, index, element: Component }) => (
                  <Route
                    key={path}
                    index={index}
                    path={path}
                    element={
                      <React.Suspense fallback={<Loader />}>
                        <Component />
                      </React.Suspense>
                    }
                  />
                ))}
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
