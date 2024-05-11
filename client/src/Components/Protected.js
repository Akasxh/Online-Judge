import { Navigate } from "react-router-dom";
const Protected = ({ children }) => {
  
  const token = sessionStorage.getItem('token')
  if (token===null) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;