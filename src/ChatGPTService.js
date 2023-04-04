import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const openai = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
});

export async function callChatGPT(messages, options = {}) {
    try {
      const response = await openai.post("/chat/completions", {
        model: options.model || "gpt-4",
        messages,
        ...options,
      });
  
      return response.data.choices;
    } catch (error) {
      console.error("Error creating chat completion:", error);
    }
  }