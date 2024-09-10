import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import TodoList from "../pages/TodoList";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      //   { index: true, element: <Home /> },
      { path: "", element: <TodoList /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={guestRouter} />;
}

export default AppRouter;
