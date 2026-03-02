import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';
import { AuthService } from './services/auth.service';
import type { User } from './types/task.types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start as loading for splash
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      await new Promise(res => setTimeout(res, 2000));
      const saved = AuthService.getUser();
      if (saved) {
        setUser(saved);
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleAuth = async (values: any, type: 'LOGIN' | 'REGISTER') => {
    setLoading(false); // We use a local loading state for buttons, or reuse a state
    try {
      // The AuthService now returns the User object after saving the token internally
      const loggedUser = type === 'LOGIN' 
        ? await AuthService.login(values) 
        : await AuthService.register(values);
      
      console.log("Auth Success:", loggedUser);

      if (loggedUser && loggedUser.id) {
        setUser(loggedUser);
        message.success(type === 'LOGIN' ? 'Welcome back!' : 'Account created!');
        navigate('/tasks');
      } else {
        message.error("Invalid user data received");
      }
    } catch (err: any) {
      // This catches 401 Unauthorized or 409 Conflict from NestJS
      const errorMsg = err.response?.data?.message || 'Authentication Failed';
      message.error(errorMsg);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    navigate('/login');
    message.success('Logged out');
  };

  if (loading) return <SplashScreen />;

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={<LoginPage onLogin={(v) => handleAuth(v, 'LOGIN')} onSwitchToRegister={() => navigate('/register')} loading={false} />} 
      />
      <Route 
        path="/register" 
        element={<RegisterPage onRegister={(v) => handleAuth(v, 'REGISTER')} onSwitchToLogin={() => navigate('/login')} loading={false} />} 
      />

      {/* Protected Route */}
      <Route 
        path="/tasks" 
        element={user ? <TasksPage user={user} setUser={setUser} onLogout={handleLogout} setStage={function (stage: 'LOGIN' | 'REGISTER' | 'TASKS' | 'SPLASH'): void {
          throw new Error('Function not implemented.');
        } } /> : <Navigate to="/login" />} 
      />

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to={user ? "/tasks" : "/login"} />} />
    </Routes>
  );
}