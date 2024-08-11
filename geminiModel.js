const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = "Word for the Day and Also Explain that Words And where we can use in daily life"
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
  run();