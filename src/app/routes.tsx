import { createBrowserRouter } from "react-router-dom";
import { Home, Login } from "../components";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);
export default routes;
