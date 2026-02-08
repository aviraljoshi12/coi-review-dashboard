import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* Page Content */}
        <main className="flex-1 px-4 sm:px-6 py-4 overflow-x-auto bg-[#F9FAFA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
