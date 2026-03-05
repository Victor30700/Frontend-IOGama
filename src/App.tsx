import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import ChangePassword from './features/auth/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Temporary components for empty routes
const Dashboard = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenido al Sistema</h2>
    <p className="text-gray-600">Este es el panel principal de IO GAMA Construcciones.</p>
  </div>
);

const Employees = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Empleados</h2>
    <p className="text-gray-600">Próximamente: Listado y administración de personal.</p>
  </div>
);

const Profile = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Mi Perfil</h2>
    <p className="text-gray-600">Configuración de cuenta y datos personales.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes (Wrapped in ProtectedRoute and Layout) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
