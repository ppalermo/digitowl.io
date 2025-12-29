const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Predefined context about your solutions and capabilities
const SYSTEM_PROMPT = `You are an AI assistant for a cybersecurity consulting firm. Your role is to:
1. Focus on cybersecurity, AI security, and automation solutions
2. Frame responses in a professional, solution-oriented manner
3. Align capabilities with industry best practices
4. Suggest alternative approaches when appropriate
5. Emphasize security best practices`;

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        response: completion.choices[0].message.content
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process request' })
    };
  }
};
