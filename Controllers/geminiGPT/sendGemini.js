const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);

async function sendGeminiPrompt(promisePool, req, res) {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
       
      
        const result = await model.generateContent(prompt);
        const response = await result.response;

        res.status(200).json({ response: response});
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
}

module.exports = sendGeminiPrompt;
