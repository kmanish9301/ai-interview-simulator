import { Interview } from '../models/interview.model.js';
import { generateQuestions } from '../services/ai.service.js';

export const startInterview = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    const questions = await generateQuestions(role);
    
    const interview = new Interview({
      userId: req.user._id,
      role,
      questions,
      status: 'started'
    });
    
    await interview.save();

    // Do not send correct answers to the client initially to prevent cheating
    const sanitizedQuestions = questions.map(q => ({
      question: q.question,
      options: q.options
    }));

    res.status(200).json({
      sessionId: interview._id,
      questions: sanitizedQuestions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to start interview' });
  }
};

export const submitInterview = async (req, res) => {
  try {
    const { sessionId, answers } = req.body;
    
    if (!sessionId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Session ID and answers array are required' });
    }

    const interview = await Interview.findById(sessionId);
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    let correctCount = 0;
    const results = interview.questions.map((q, index) => {
      const userAnswer = answers[index] || "No answer provided";
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;
      
      return {
        question: q.question,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const overallScore = correctCount; // Since there are 10 questions, score is out of 10.
    const summary = `You answered ${correctCount} out of 10 questions correctly.`;

    interview.answers = answers;
    interview.results = results;
    interview.overallScore = overallScore;
    interview.summary = summary;
    interview.status = 'completed';

    await interview.save();

    res.status(200).json({ sessionId: interview._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit interview' });
  }
};

export const getInterviewResult = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const interview = await Interview.findById(sessionId);
    
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (interview.status !== 'completed') {
      return res.status(400).json({ error: 'Interview not completed yet' });
    }

    res.status(200).json({
      role: interview.role,
      results: interview.results,
      overallScore: interview.overallScore,
      summary: interview.summary
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
};
