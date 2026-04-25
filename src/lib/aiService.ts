import { GoogleGenerativeAI } from "@google/generative-ai";

export const sendMessageToAI = async (messages: { role: string; content: string }[], systemPrompt: string) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log('Gemini API Key present:', !!apiKey);
  
  if (!apiKey) throw new Error('Gemini API key not found');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
  });

  try {
    // Convert message format to Gemini format
    // role: "user" -> "user", role: "assistant" -> "model"
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error communicating with Gemini:', error);
    throw error;
  }
};
