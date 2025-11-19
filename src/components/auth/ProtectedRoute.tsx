// ======================================================
// SISTEMA DE PROTECCIÓN DE RUTAS
// Ubicación: src/components/auth/ProtectedRoute.tsx
// Descripción: HOC y hooks para proteger rutas administrativas
// ======================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, ShieldAlert } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

/**
 * Tipos de roles de usuario
 */
export type UserRole = 'admin' | 'funcionario';

/**
 * Interface del usuario
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatarUrl?: string;
}

/**
 * Contexto de autenticación
 */
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// ======================================================
// CONTEXTO DE AUTENTICACIÓN
// ======================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook para usar el contexto de autenticación
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// ======================================================
// PROVEEDOR DE AUTENTICACIÓN
// ======================================================

/**
 * Proveedor de contexto de autenticación
 * Envuelve la aplicación para proveer estado de autenticación global
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Verifica el estado de autenticación al cargar la app
   */
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      // Verificar token en localStorage
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setUser(null);
        return;
      }

      // Validar token con el backend
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token inválido o expirado
        localStorage.removeItem('authToken');
        setUser(null);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Inicia sesión
   */
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const { token, user: userData } = await response.json();
      
      // Guardar token
      localStorage.setItem('authToken', token);
      
      // Actualizar estado del usuario
      setUser(userData);
      
      console.log('✅ Sesión iniciada:', userData);
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
      throw error;
    }
  };

  /**
   * Cierra sesión
   */
  const logout = async () => {
    try {
      // Llamar endpoint de logout si existe
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      // Limpiar estado local
      localStorage.removeItem('authToken');
      setUser(null);
      console.log('👋 Sesión cerrada');
    }
  };

  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ======================================================
// COMPONENTE DE RUTA PROTEGIDA
// ======================================================

/**
 * HOC que protege rutas requiriendo autenticación
 */
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loader mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#009DDC] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Usuario autenticado, mostrar contenido
  return <>{children}</>;
};

// ======================================================
// COMPONENTE DE RUTA SOLO ADMIN
// ======================================================

/**
 * HOC que protege rutas requiriendo rol de administrador
 */
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loader mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#009DDC] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si no es admin, redirigir a vista de funcionario
  if (user.role !== 'admin') {
    return <Navigate to="/tablero" replace />;
  }

  // Usuario administrador, mostrar contenido
  return <>{children}</>;
};

// ======================================================
// COMPONENTE DE ACCESO DENEGADO
// ======================================================

/**
 * Página de acceso denegado
 */
export const UnauthorizedPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <ShieldAlert className="w-20 h-20 text-red-500 mx-auto" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Acceso Denegado
        </h1>
        
        <p className="text-gray-600 mb-6">
          No tienes los permisos necesarios para acceder a esta sección.
        </p>
        
        {user && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-700">
              <strong>Usuario:</strong> {user.name}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Rol:</strong> {user.role === 'admin' ? 'Administrador' : 'Funcionario'}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
        
        <div className="flex gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Volver
          </button>
          <button
            onClick={() => window.location.href = '/tablero'}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

// ======================================================
// EJEMPLO DE USO EN APP ROUTER
// ======================================================

/*
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, ProtectedRoute, AdminRoute } from './components/auth/ProtectedRoute';
import TableroActividades from './pages/TableroActividades';
import TableroActividadesAdmin from './pages/TableroActividadesAdmin';
import Login from './pages/Login';
import UnauthorizedPage from './components/auth/UnauthorizedPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas *\/}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas (requieren autenticación) *\/}
          <Route 
            path="/tablero" 
            element={
              <ProtectedRoute>
                <TableroActividades />
              </ProtectedRoute>
            } 
          />
          
          {/* Rutas solo para administradores *\/}
          <Route 
            path="/admin/tablero" 
            element={
              <AdminRoute>
                <TableroActividadesAdmin />
              </AdminRoute>
            } 
          />
          
          {/* Ruta de acceso denegado *\/}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Ruta por defecto *\/}
          <Route path="/" element={<Navigate to="/tablero" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
*/

// ======================================================
// EJEMPLO DE PÁGINA DE LOGIN
// ======================================================

/*
import { useState } from 'react';
import { useAuth } from '../components/auth/ProtectedRoute';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/tablero';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Credenciales inválidas. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Iniciar Sesión - CESFAM
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#009DDC]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#009DDC]"
            />
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
*/