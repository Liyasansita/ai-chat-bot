// import { Configuration } from "openai";

// export const configureOpenAI = () => {
//   const config = new Configuration({
//     apiKey: process.env.OPEN_AI_SECRET,
//     organization: process.env.OPENAI_ORAGANIZATION_ID,
//   });
//   return config;
// };
import OpenAI from "openai";

// Gemini configuration function
export const configureGemini = () => {
  const config = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY, // Use your Gemini API key
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/" // Gemini's endpoint
  });
  return config;
};
