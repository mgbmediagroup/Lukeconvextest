import { createBrowserRouter } from "react-router";
import Home from "@/app/pages/Home";
import AboutPage from "@/app/pages/AboutPage";
import ContactDemo from "@/app/pages/ContactDemo";
import TestPage from "@/app/pages/TestPage";
import AdminMessages from "@/app/pages/AdminMessages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/contact-demo",
    Component: ContactDemo,
  },
  {
    path: "/test",
    Component: TestPage,
  },
  {
    path: "/admin/messages",
    Component: AdminMessages,
  },
]);
