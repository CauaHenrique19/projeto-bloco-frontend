import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import router from "./routes";
import ContextProvider from "./context";

import fakeusers from "./data/users.json";
import fakeavaliations from "./data/avaliations.json";

const existentUsers = JSON.parse(localStorage.getItem("users")) || [];
if (!existentUsers.length) {
  localStorage.setItem(
    "users",
    JSON.stringify([...existentUsers, ...fakeusers])
  );
}

const existentAvaliations =
  JSON.parse(localStorage.getItem("avaliations")) || [];
if (!existentAvaliations.length) {
  localStorage.setItem(
    "avaliations",
    JSON.stringify([...existentAvaliations, ...fakeavaliations])
  );
}

import "./global.css";

function App() {
  return (
    <ContextProvider>
      <Toaster
        richColors
        closeButton
        theme="dark"
        position="top-right"
        duration={99999999999}
      />
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
