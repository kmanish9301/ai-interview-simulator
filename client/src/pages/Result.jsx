import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResult } from '../services/api';

const Result = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchedRef = useRef(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const resultData = await getResult(sessionId);
        setData(resultData);
      } catch (err) {
        console.error(err);
        setError('Failed to load results. Please make sure the interview is completed.');
      } finally {
        setLoading(false);
      }
    };
    
    if (sessionId && !fetchedRef.current) {
      fetchedRef.current = true;
      fetchResult();
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-slate-400 font-medium">Analyzing your results...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center premium-card p-10">
        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <h2 className="text-2xl font-bold text-white mb-2">Result Not Found</h2>
        <p className="text-slate-400 mb-8">{error}</p>
        <button onClick={() => navigate('/')} className="premium-btn px-6 py-3 rounded-lg font-medium">
          Go back to Home
        </button>
      </div>
    );
  }

  const { overallScore, summary, results, role } = data;
  const percentage = (overallScore / results.length) * 100;
  
  let scoreColor = 'text-green-500';
  let scoreBg = 'bg-green-500/10 border-green-500/20';
  if (percentage < 50) {
    scoreColor = 'text-red-500';
    scoreBg = 'bg-red-500/10 border-red-500/20';
  } else if (percentage < 80) {
    scoreColor = 'text-yellow-500';
    scoreBg = 'bg-yellow-500/10 border-yellow-500/20';
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="premium-card p-10 mb-10 text-center relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg bg-blue-500/10 blur-[100px] pointer-events-none"></div>
        
        <h2 className="text-3xl font-bold text-white mb-2 relative z-10">Assessment Complete</h2>
        <p className="text-xl text-slate-400 mb-8 relative z-10">{role}</p>
        
        <div className={`inline-flex flex-col items-center justify-center w-40 h-40 rounded-full border-8 ${scoreBg} ${scoreColor} mb-8 relative z-10 shadow-xl`}>
          <span className="text-5xl font-black">{overallScore}</span>
          <span className="text-sm font-medium opacity-80 mt-1">out of {results.length}</span>
        </div>
        
        <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl text-left max-w-2xl mx-auto relative z-10">
          <h3 className="font-semibold text-lg mb-2 text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Summary
          </h3>
          <p className="text-slate-300 leading-relaxed">{summary}</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        Detailed Analysis
        <span className="text-sm font-medium bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
          {results.length} Questions
        </span>
      </h3>

      <div className="space-y-6">
        {results.map((item, index) => (
          <div key={index} className="premium-card p-6 md:p-8 relative overflow-hidden">
            {/* Edge accent line */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4 pl-2">
              <h4 className="font-semibold text-lg text-white flex-1 leading-relaxed">
                <span className="text-slate-500 mr-2">Q{index + 1}.</span>
                {item.question}
              </h4>
              <span className={`shrink-0 flex items-center gap-1.5 font-bold px-3 py-1.5 rounded-lg text-sm border ${
                item.isCorrect 
                  ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {item.isCorrect ? (
                  <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Correct</>
                ) : (
                  <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg> Incorrect</>
                )}
              </span>
            </div>
            
            <div className="space-y-4 pl-2">
              <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Answer</span>
                <p className={`font-medium ${item.isCorrect ? 'text-green-400' : 'text-red-400'} flex items-start gap-2`}>
                  {item.userAnswer}
                </p>
              </div>
              
              {!item.isCorrect && (
                <div className="bg-green-500/5 border border-green-500/10 p-4 rounded-xl">
                  <span className="block text-xs font-bold text-green-500/70 uppercase tracking-wider mb-2">Correct Answer</span>
                  <p className="font-medium text-green-400">{item.correctAnswer}</p>
                </div>
              )}

              <div className="pt-3">
                <span className="block text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Explanation
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">{item.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 mb-20 text-center">
        <button
          onClick={() => navigate('/')}
          className="premium-btn px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Take Another Interview
        </button>
      </div>
    </div>
  );
};

export default Result;
