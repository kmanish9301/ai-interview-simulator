import { useContext } from "react";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import "./index.css";
import Interview from "./pages/Interview";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Result from "./pages/Result";
import RoleSelection from "./pages/RoleSelection";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading...
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#030712]/70 border-b border-white/5">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all">
            AI
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400 tracking-tight">
            Interview Pro
          </h1>
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center gap-6">
              <span className="text-gray-400 font-medium text-sm hidden sm:block">
                Welcome, <span className="text-gray-100">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 px-4 py-2 rounded-lg transition-all duration-200"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 rounded-lg transition-all duration-200"
              >
                Get started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-900 flex flex-col text-slate-50 selection:bg-blue-500/30">
          <NavBar />
          <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <RoleSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interview"
                element={
                  <ProtectedRoute>
                    <Interview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/result/:sessionId"
                element={
                  <ProtectedRoute>
                    <Result />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
