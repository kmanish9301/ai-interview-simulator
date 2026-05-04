import axios from 'axios';

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
        model: 'llama-3.1-8b-instant',
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
    return Array.isArray(parsed) ? parsed : parsed.questions || [];
  } catch (error) {
    console.error('Error generating questions:', error.response?.data || error.message);
    throw new Error('Failed to generate questions');
  }
};
