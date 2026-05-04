import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await registerUser({ name, email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md premium-card p-10 relative overflow-hidden">
        {/* Decorative subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-500 rounded-b-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
        
        <div className="text-center mb-10 mt-2">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create an account</h2>
          <p className="text-gray-400 text-sm font-medium">Start your interview preparation journey</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-start gap-3 backdrop-blur-sm">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 premium-input rounded-xl"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 premium-input rounded-xl"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 premium-input rounded-xl"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full premium-btn p-3.5 rounded-xl font-semibold mt-2 flex items-center justify-center gap-2 text-[15px]"
          >
            {loading ? (
               <>
               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Creating account...
             </>
            ) : 'Sign up'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
