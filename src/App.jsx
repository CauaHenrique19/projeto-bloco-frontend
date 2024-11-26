import { RouterProvider } from "react-router-dom";
import router from "./routes";

import ContextProvider from "./context";

import "./global.css";

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
