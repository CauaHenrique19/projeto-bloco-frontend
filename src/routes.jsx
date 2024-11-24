import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Signup from "./pages/SignUp";
import DetailedMedia from "./pages/DetailedMedia";
import Timeline from "./pages/Timeline";
import User from "./pages/User";

const mainPath = "projeto-bloco-frontend";

const router = createBrowserRouter([
  {
    path: `${mainPath}/`,
    element: <Home />,
  },
  {
    path: `${mainPath}/login`,
    element: <Login />,
  },
  {
    path: `${mainPath}/signup`,
    element: <Signup />,
  },
  {
    path: `${mainPath}/catalog`,
    element: <Catalog />,
  },
  {
    path: `${mainPath}/media/:id`,
    element: <DetailedMedia />,
  },
  {
    path: `${mainPath}/timeline`,
    element: <Timeline />,
  },
  {
    path: `${mainPath}/user/:user`,
    element: <User />,
  },
]);

export default router;
