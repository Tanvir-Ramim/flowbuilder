
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "./shared/route/route";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <ToastContainer />
    </>
  );
}

export default App;
