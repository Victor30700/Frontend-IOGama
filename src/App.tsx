import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from './store/authStore';
import Login from './features/auth/Login';
import ChangePassword from './features/auth/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import DashboardLayout from './layouts/DashboardLayout';
import ProfileSettings from './features/profile/ProfileSettings';
import EmployeeList from './features/employees/EmployeeList';
import CreateEmployee from './features/employees/CreateEmployee';
import EmployeePermissions from './features/employees/EmployeePermissions';
import UnitList from './features/construction/catalogs/UnitList';
import ResourceList from './features/construction/catalogs/ResourceList';
import TemplateList from './features/construction/catalogs/TemplateList';
import TemplateRecipeEditor from './features/construction/catalogs/TemplateRecipeEditor';
import ProjectDashboard from './features/construction/projects/ProjectDashboard';
import ProjectDetail from './features/construction/projects/ProjectDetail';
import MainDashboard from './features/dashboard/MainDashboard';

function App() {
  const { initialize, isInitializing } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-bold animate-pulse text-sm">Iniciando IO GAMA...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MainDashboard />} />
          
          <Route path="employees">
            <Route index element={
              <RoleRoute allowedRoles={['Empresa', 'SuperAdminGlobal']}>
                <EmployeeList />
              </RoleRoute>
            } />
            <Route path="new" element={
              <RoleRoute allowedRoles={['Empresa', 'SuperAdminGlobal']}>
                <CreateEmployee />
              </RoleRoute>
            } />
            <Route path=":id/permissions" element={
              <RoleRoute allowedRoles={['Empresa', 'SuperAdminGlobal']}>
                <EmployeePermissions />
              </RoleRoute>
            } />
          </Route>

          <Route path="construction">
            <Route path="units" element={<UnitList />} />
            <Route path="resources" element={<ResourceList />} />
            <Route path="templates" element={<TemplateList />} />
            <Route path="templates/:id/edit" element={<TemplateRecipeEditor />} />
            <Route path="projects" element={<ProjectDashboard />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
          </Route>

          <Route path="profile" element={<ProfileSettings />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
