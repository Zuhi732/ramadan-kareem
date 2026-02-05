import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// লেআউট এবং পেজগুলো ইমপোর্ট করা হলো
import MainLayout from "./layout/MainLayout";
import Calendar from "./pages/Calendar";
import Dua from "./pages/Dua";
import Home from "./pages/Home";
import Tasbeeh from "./pages/Tasbeeh";
// নতুন ইমপোর্ট
import Names from "./pages/Names";
import Zakat from "./pages/Zakat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/calendar", element: <Calendar></Calendar> },
      { path: "/dua", element: <Dua></Dua> },
      { path: "/tasbeeh", element: <Tasbeeh></Tasbeeh> },

      // নতুন রাউট
      { path: "/zakat", element: <Zakat></Zakat> },
      { path: "/names", element: <Names></Names> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
