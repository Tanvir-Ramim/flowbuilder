import { Outlet, ScrollRestoration } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Outlet></Outlet>
      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
