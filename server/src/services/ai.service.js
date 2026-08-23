import axios from 'axios';
import { z } from 'zod';

// Define the Output Guardrail Schemas
const QuestionSchema = z.object({
  question: z.string().min(5, "Question must be substantive"),
  options: z.array(z.string()).length(4, "Must have exactly 4 options"),
  correctAnswer: z.string(),
  explanation: z.string().min(5, "Explanation must be provided")
}).refine(data => data.options.includes(data.correctAnswer), {
  message: "The correctAnswer MUST be one of the provided options"
});

const AIResponseSchema = z.object({
  questions: z.array(QuestionSchema).length(10, "Must return exactly 10 questions")
});

export const generateQuestions = async (role) => {
  try {
    const prompt = `You are an expert technical interviewer. Generate exactly 10 multiple-choice questions for a ${role} position. 
Return ONLY a valid JSON object with a single key "questions" containing an array of objects. 
Each object MUST have:
- "question": The question text
- "options": An array of exactly 4 possible answers
- "correctAnswer": The exact string of the correct option from the "options" array
- "explanation": A brief 1-2 sentence explanation of why the correct answer is correct.

No markdown, no explanations outside the JSON object.`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let textResponse = response.data.choices[0].message.content.trim();
    if (textResponse.startsWith('```json')) {
      textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    } else if (textResponse.startsWith('```')) {
      textResponse = textResponse.replace(/```/g, '').trim();
    }
    
    const parsed = JSON.parse(textResponse);
    
    // Apply Guardrails
    const validatedData = AIResponseSchema.parse(parsed);
    return validatedData.questions;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Guardrail Validation Failed:', error.errors);
      throw new Error('AI generated invalid assessment format. Please try again.');
    }
    console.error('Error generating questions:', error.response?.data || error.message);
    throw new Error('Failed to generate questions');
  }
};

export const generateFeedbackSummary = async (role, score, results) => {
  try {
    const incorrectAnswers = results.filter(r => !r.isCorrect).map(r => ({
      question: r.question,
      userAnswer: r.userAnswer,
      correctAnswer: r.correctAnswer
    }));

    let performanceContext = `The candidate scored ${score} out of 10. `;
    if (incorrectAnswers.length > 0) {
      performanceContext += `They answered the following questions incorrectly:\n${JSON.stringify(incorrectAnswers, null, 2)}`;
    } else {
      performanceContext += "They answered all questions correctly.";
    }

    const prompt = `You are an expert technical recruiter analyzing a candidate's performance in a ${role} interview.
${performanceContext}

Based on this, write a concise, personalized 3-4 sentence paragraph summarizing their performance. 
Highlight their strengths based on their score, and constructively point out specific technical areas they need to study based on their incorrect answers (if any). Do not use bullet points or markdown. Return the raw text string.`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating feedback summary:', error.response?.data || error.message);
    return `You answered ${score} out of 10 questions correctly. (Detailed AI feedback unavailable at this time)`;
  }
};
