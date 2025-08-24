
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';

const ProtectedRoute = () => {
  const user = useSelector((s: RootState) => s.user.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
