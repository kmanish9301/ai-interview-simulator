import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitInterview } from '../services/api';

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [answers, setAnswers] = useState(() => {
    if (location.state?.questions) {
      return new Array(location.state.questions.length).fill('');
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location.state?.sessionId || !location.state?.questions) {
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!location.state) return null;

  const { sessionId, questions, role } = location.state;

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    // Check if all answered
    if (answers.some(a => !a.trim())) {
      setError('Please answer all questions before submitting.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await submitInterview(sessionId, answers);
      navigate(`/result/${sessionId}`);
    } catch (err) {
      setError('Failed to evaluate answers. Please try again.');
      console.error(err);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-white">Skill Assessment: <span className="text-blue-400">{role}</span></h2>
        <p className="text-slate-400 mt-3 text-lg">Select the best answer for each question below.</p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center font-medium animate-pulse">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="premium-card p-6 md:p-8">
            <h3 className="font-semibold text-xl text-white mb-6 leading-relaxed">
              <span className="text-blue-500 mr-3 text-2xl">Q{qIndex + 1}.</span>
              {q.question}
            </h3>
            
            <div className="space-y-3">
              {q.options.map((option, oIndex) => {
                const isSelected = answers[qIndex] === option;
                return (
                  <label 
                    key={oIndex} 
                    className={`group flex items-start p-4 md:p-5 rounded-xl cursor-pointer transition-all duration-300 border ${
                      isSelected 
                        ? 'bg-blue-500/10 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                        : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-white/10'
                    }`}
                  >
                    <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleAnswerChange(qIndex, option)}
                        className="absolute opacity-0 w-full h-full cursor-pointer z-10"
                        disabled={loading}
                      />
                      <div className={`w-full h-full rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected 
                          ? 'border-blue-500' 
                          : 'border-gray-600 group-hover:border-gray-400'
                      }`}>
                        <div className={`w-2.5 h-2.5 rounded-full bg-blue-500 transition-transform duration-200 ${isSelected ? 'scale-100' : 'scale-0'}`}></div>
                      </div>
                    </div>
                    <div className={`ml-4 leading-relaxed pt-0.5 transition-colors duration-200 ${isSelected ? 'text-white font-medium' : 'text-gray-300 group-hover:text-gray-200'}`}>
                      {option}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 mb-20 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="premium-btn px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3 w-full sm:w-auto justify-center"
        >
          {loading ? (
             <>
             <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             Submitting...
           </>
          ) : 'Submit Assessment'}
        </button>
      </div>
    </div>
  );
};

export default Interview;
