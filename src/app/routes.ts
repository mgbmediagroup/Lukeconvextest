import { createBrowserRouter } from "react-router";
import Home from "@/app/pages/Home";
import AboutPage from "@/app/pages/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
]);
