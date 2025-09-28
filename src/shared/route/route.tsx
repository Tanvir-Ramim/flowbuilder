import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../../pages/home/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MainLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <Home></Home>
          </>
        ),
      },
    ],
  },
]);

export default Router;
