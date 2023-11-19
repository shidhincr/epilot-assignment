import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import GlobalError from "./components/GlobalError";
// styles
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <GlobalError />,
    children: [
      {
        index: true,
        async lazy() {
          const { Home, loader: homeLoader } = await import("./routes/home");
          return {
            element: <Home />,
            loader: homeLoader,
          };
        },
      },
      {
        path: "/user/:username",
        async lazy() {
          const { User, loader: userLoader } = await import("./routes/user");
          return {
            element: <User />,
            loader: userLoader,
          };
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
