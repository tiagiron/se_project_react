import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

function ProtectedRoute({ children, anonymous = false }) {
  const { isLoggedIn } = useContext(AppContext);
  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}

export default ProtectedRoute;
