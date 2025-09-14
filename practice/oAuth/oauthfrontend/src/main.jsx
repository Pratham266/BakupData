import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import GooglePage from "./GooglePage.jsx";

// Layout Component for Nested Routes
function RootLayout() {
  return (
    <div>
      <Outlet /> {/* Renders child routes here */}
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Parent route with layout
    children: [
      {
        index: true, // Default route for "/"
        element: <App />,
      },
      {
        path: "oauth2/callback", // Nested route
        element: <GooglePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
