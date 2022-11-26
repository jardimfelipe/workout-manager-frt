import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";

import "antd/dist/reset.css";
import routes from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <RouterProvider router={routes} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
