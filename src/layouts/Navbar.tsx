import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, User, Settings, LogOut, Search } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/queries/useProfile';

const Navbar: React.FC = () => {
  const { toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();
  const { data: profile, isLoading } = useProfile();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDisplayName = () => {
    if (isLoading) return <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>;
    return profile?.razonSocial || `${profile?.nombres} ${profile?.apellidoPaterno || ''}`.trim() || 'Usuario';
  };

  // Función para validar si la URL de la foto es real o una de ejemplo
  const isPhotoValid = (url?: string) => {
    if (!url) return false;
    // Si la URL contiene el dominio de ejemplo, no es válida
    if (url.includes('www.fotoURL.com')) return false;
    // Si no empieza con http, no es válida
    if (!url.startsWith('http')) return false;
    return true;
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 z-30 sticky top-0">
      {/* Left side: Hamburger (mobile) & Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 lg:hidden transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 group focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-200 transition-all">
          <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500" />
          <input 
            type="text" 
            placeholder="Buscar en el sistema..." 
            className="bg-transparent border-none focus:outline-none text-sm text-gray-600 placeholder-gray-400 w-64"
          />
        </div>
      </div>

      {/* Right side: Notifications & User Profile */}
      <div className="flex items-center gap-3 lg:gap-6">
        {/* Notifications */}
        <button className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-all relative border border-transparent hover:border-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-100 hidden sm:block"></div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group"
          >
            {isLoading ? (
              <div className="h-10 w-10 rounded-xl bg-gray-200 animate-pulse shadow-md shadow-blue-50"></div>
            ) : (
              <div className="h-10 w-10 rounded-xl overflow-hidden shadow-md shadow-blue-100 group-hover:scale-105 transition-transform bg-gray-100 flex items-center justify-center">
                {isPhotoValid(profile?.fotoPerfilUrl) ? (
                  <img 
                    src={profile!.fotoPerfilUrl} 
                    alt="Perfil" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const fallback = (e.target as HTMLImageElement).parentElement;
                      if (fallback) {
                        fallback.innerHTML = `
                          <div class="h-full w-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                            ${profile?.razonSocial?.[0] || profile?.nombres?.[0] || 'U'}
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                    {profile?.razonSocial?.[0] || profile?.nombres?.[0] || 'U'}
                  </div>
                )}
              </div>
            )}
            
            <div className="hidden lg:block text-left">
              <div className="leading-none mb-1">
                <span className="text-sm font-bold text-gray-900 block truncate max-w-[150px]">
                  {getDisplayName()}
                </span>
              </div>
              <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest">
                {profile?.userType || 'Cargando...'}
              </p>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-gray-200 border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-50 mb-2 text-left">
                  <p className="text-sm font-bold text-gray-900 truncate">{profile?.razonSocial || `${profile?.nombres} ${profile?.apellidoPaterno || ''}`}</p>
                  <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
                </div>
                
                <button 
                  onClick={() => { setIsDropdownOpen(false); navigate('/profile'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Mi Perfil
                </button>
                <button 
                  onClick={() => { setIsDropdownOpen(false); navigate('/change-password'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Seguridad
                </button>
                
                <div className="h-px bg-gray-50 my-2 mx-4"></div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
