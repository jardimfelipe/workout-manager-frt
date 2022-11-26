import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);
export default routes;
