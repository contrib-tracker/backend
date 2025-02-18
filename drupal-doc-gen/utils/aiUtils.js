const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.OPENROUTER_API_BASE_URL || 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001';

async function generateAiEnhancedReadme(content, sections) {
    try {
        const formattedPrompt = `You are an expert documentation writer. Using the provided content, generate a well-structured README file. The README must contain the following sections:

${sections.map(sec => `- ${sec}`).join('\n')}

Content:
${content}`;

        const response = await axios.post(
            API_BASE_URL,
            {
                model: MODEL,
                messages: [
                    { role: 'system', content: 'You are an expert in generating high-quality README documentation.' },
                    { role: 'user', content: formattedPrompt }
                ],
                max_tokens: 2000
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

async function generateDiataxisContent(content) {
    try {
        const formattedPrompt = `You are an expert documentation generator following the Diátaxis framework. Generate documentation based on the following content:

Content:
${content}`;

        const response = await axios.post(
            API_BASE_URL,
            {
                model: MODEL,
                messages: [
                    { role: 'system', content: 'You are an expert in generating high-quality Diátaxis-based documentation.' },
                    { role: 'user', content: formattedPrompt }
                ],
                max_tokens: 2000
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
        console.error('Error generating Diátaxis documentation:', error.response?.data || error.message);
        return 'Error generating Diátaxis documentation.';
    }
}

module.exports = { generateAiEnhancedReadme, generateDiataxisContent };
