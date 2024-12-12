import { useContext } from "react";

import { Context } from "../../context";
import { mainPath } from "../../routes";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const { user } = useContext(Context);

  if (user) {
    return <Component />;
  }

  return <Navigate to={`/${mainPath}/login`} />;
};

export default PrivateRoute;
