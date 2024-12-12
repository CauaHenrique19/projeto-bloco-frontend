import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Signup from "./pages/SignUp";
import DetailedMedia from "./pages/DetailedMedia";
import Timeline from "./pages/Timeline";
import User from "./pages/User";
import DetailedAvaliation from "./pages/DetailedAvaliation";
import PrivateRoute from "./components/PrivateRoute";

export const mainPath = "projeto-bloco-frontend";

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
    element: <PrivateRoute Component={Timeline} />,
  },
  {
    path: `${mainPath}/user/:user`,
    element: <PrivateRoute Component={User} />,
  },
  {
    path: `${mainPath}/avaliation/:id`,
    element: <PrivateRoute Component={DetailedAvaliation} />,
  },
]);

export default router;
