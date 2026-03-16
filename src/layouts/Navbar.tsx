import React, { useState } from 'react';
import { Menu, ChevronDown, User, Settings, LogOut } from 'lucide-react';
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
    
    // Nueva lógica de visualización basada en la estructura anidada
    if (profile?.datosEmpresa?.razonSocial) return profile.datosEmpresa.razonSocial;
    if (profile?.datosPersonales?.nombres) {
      return `${profile.datosPersonales.nombres} ${profile.datosPersonales.apellidoPaterno || ''}`.trim();
    }
    
    return profile?.email || 'Usuario';
  };

  const isPhotoValid = (url?: string) => {
    if (!url) return false;
    if (url.includes('www.fotoURL.com')) return false;
    if (!url.startsWith('http') && !url.startsWith('data:')) return false;
    return true;
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 z-30 sticky top-0 text-left">
      {/* Left side: Hamburger (mobile) */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 lg:hidden transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Right side: User Profile */}
      <div className="flex items-center gap-3 lg:gap-6 text-left">
        {/* User Profile Dropdown */}
        <div className="relative text-left">
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
                            ${getDisplayName()[0]}
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                    {getDisplayName()[0]}
                  </div>
                )}
              </div>
            )}
            
            <div className="hidden lg:block text-left text-left">
              <div className="leading-none mb-1 text-left">
                <span className="text-sm font-bold text-gray-900 block truncate max-w-[150px] text-left">
                  {getDisplayName()}
                </span>
              </div>
              <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest text-left">
                {profile?.tipoUsuario || 'Cargando...'}
              </p>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} text-left`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-gray-200 border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
                <div className="px-4 py-3 border-b border-gray-50 mb-2 text-left">
                  <p className="text-sm font-bold text-gray-900 truncate text-left">{getDisplayName()}</p>
                  <p className="text-xs text-gray-500 truncate text-left">{profile?.email}</p>
                </div>
                
                <button 
                  onClick={() => { setIsDropdownOpen(false); navigate('/profile'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                >
                  <User className="h-4 w-4 text-left" />
                  Mi Perfil
                </button>
                <button 
                  onClick={() => { setIsDropdownOpen(false); navigate('/change-password'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                >
                  <Settings className="h-4 w-4 text-left" />
                  Seguridad
                </button>
                
                <div className="h-px bg-gray-50 my-2 mx-4 text-left"></div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium text-left"
                >
                  <LogOut className="h-4 w-4 text-left" />
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
