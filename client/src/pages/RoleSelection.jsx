import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { startInterview } from '../services/api';

const RoleSelection = () => {
  const [role, setRole] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const roles = [
    'React Developer',
    'Node.js Developer',
    'Full Stack Developer (MERN)',
    'Frontend Engineer',
    'Backend Engineer',
    'DevOps Engineer',
    'Python Developer',
    'Java Backend Engineer'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStart = async (e) => {
    e.preventDefault();
    if (!role.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await startInterview(role);
      navigate('/interview', { state: { sessionId: data.sessionId, questions: data.questions, role } });
    } catch (err) {
      setError('Failed to start interview. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] pt-12 sm:pt-20">
      <div className="text-center mb-12 relative z-10 px-4">
        {/* Subtle background glow for the header */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-blue-500/20 blur-[80px] -z-10 rounded-full"></div>
        
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Master Your Next Interview
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
          AI-powered mock interviews tailored to your exact role. Instant feedback, realistic questions.
        </p>
      </div>

      <div className="w-full max-w-lg premium-card p-8 sm:p-10 relative">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-start gap-3 backdrop-blur-sm">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleStart} className="space-y-6">
          <div className="relative" ref={dropdownRef}>
            <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider pl-1">
              Select Target Role
            </label>
            
            {/* Custom Select Box */}
            <div 
              className={`w-full p-4 premium-input rounded-xl cursor-pointer flex justify-between items-center transition-all ${isOpen ? 'ring-2 ring-blue-500/50 border-blue-500 bg-black/40' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={role ? 'text-white font-medium' : 'text-gray-500'}>
                {role || 'Choose a specialization...'}
              </span>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute z-50 w-full mt-2 bg-[#0a0f1c] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
                  {roles.map((r) => (
                    <div
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setIsOpen(false);
                      }}
                      className={`px-4 py-3 cursor-pointer rounded-lg text-sm transition-colors flex items-center justify-between ${
                        role === r 
                          ? 'bg-blue-600/20 text-blue-400 font-semibold' 
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {r}
                      {role === r && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!role || loading}
            className="w-full premium-btn p-4 rounded-xl font-bold text-base mt-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating AI Assessment...
              </>
            ) : 'Start Assessment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoleSelection;
