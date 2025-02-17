const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.OPENROUTER_API_BASE_URL || 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001';

async function generateDiataxisContent(content) {
    try {
        const response = await axios.post(
            API_BASE_URL,
            {
                model: MODEL,
                messages: [
                    { role: 'system', content: 'You are an expert documentation generator following the Diátaxis framework.' },
                    { role: 'user', content: content }
                ],
                max_tokens: 1500
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating documentation:', error.response?.data || error.message);
        return 'Error generating documentation.';
    }
}

module.exports = { generateDiataxisContent };
