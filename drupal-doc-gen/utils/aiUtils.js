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
// Function to generate Diátaxis-based structured documentation
async function generateDiataxisContent(content) {
    try {
        const formattedPrompt = `You are an expert documentation generator following the Diátaxis framework (Tutorials, How-To Guides, Reference, Explanation).
Generate well-structured documentation based on the following content:

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
        console.error('❌ Error generating Diátaxis documentation:', error.response?.data || error.message);
        return 'Error generating Diátaxis documentation.';
    }
}

// AI function to extract key points from a file
async function generateCorePoints(category, fileName, content) {
    try {
        const formattedPrompt = `
        You are extracting documentation core points for software engineers onboarding to the project.
        The category of information we need is: **"${category}"**.
        
        **Extract only relevant details that engineers need for this category**:
        - **Explain how this file is related to "${category}"**.
        - **Ignore unrelated details**.
        - **Summarize only the key configurations, dependencies, or services that engineers should know**.
        - **List important tools, environment variables, or settings relevant to "${category}"**.
        - **If the file has no relevant details for "${category}", return "No relevant information"**.

        **Processing File: ${fileName}**
        **File Content:**
        ${content}`;

        const response = await axios.post(
            API_BASE_URL,
            {
                model: MODEL,
                messages: [
                    { role: 'system', content: 'You extract category-specific documentation core points for engineers.' },
                    { role: 'user', content: formattedPrompt }
                ],
                max_tokens: 1200
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const extractedText = response.data.choices[0].message.content.trim();

        // Return "No relevant information" if AI couldn't extract anything useful
        return extractedText.includes("No relevant information") ? null : extractedText;

    } catch (error) {
        console.error(`❌ Error extracting core points from ${fileName}:`, error.response?.data || error.message);
        return 'Error extracting core points.';
    }
}

module.exports = { generateAiEnhancedReadme, generateDiataxisContent, generateCorePoints };
