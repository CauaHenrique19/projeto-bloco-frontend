import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";

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
    path: `${mainPath}/catalog`,
    element: <Catalog />,
  },
]);

export default router;
