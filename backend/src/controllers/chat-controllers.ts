// import { NextFunction, Request, Response } from "express";
// import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai-config.js";
// import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { message } = req.body;
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user)
//       return res
//         .status(401)
//         .json({ message: "User not registered OR Token malfunctioned" });

//     const chats = user.chats.map(({ role, content }) => ({
//       role,
//       content,
//     })) as ChatCompletionRequestMessage[];

//     chats.push({ content: message, role: "user" });
//     user.chats.push({ content: message, role: "user" });

//     const config = configureOpenAI();
//     const openai = new OpenAIApi(config);

//     const chatResponse = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: chats,
//     });

//     user.chats.push(chatResponse.data.choices[0].message);
//     await user.save();

//     return res.status(200).json({ chats: user.chats });
//   } catch (err: any) {
//     console.error("💥 Chat error:");
//     console.error("Message:", err.message);
//     console.error("Stack:", err.stack);

//     if (err.response) {
//       console.error("📩 Error Response:");
//       console.error("Status:", err.response.status);
//       console.error("Data:", err.response.data);
//       console.error("Headers:", err.response.headers);
//     } else if (err.request) {
//       console.error("🛰 No response received:");
//       console.error("Request:", err.request);
//     } else {
//       console.error("⚠️ Error setting up request:", err.message);
//     }

//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const sendChatsToUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) {
//       return res.status(401).send("User not registered OR Token malfunctioned");
//     }
//     if (user._id.toString() !== res.locals.jwtData.id) {
//       return res.status(401).send("Permissions didn't match");
//     }
//     return res.status(200).json({ message: "OK", chats: user.chats });
//   } catch (error: any) {
//     console.log(error);
//     return res.status(200).json({ message: "ERROR", cause: error.message });
//   }
// };

// export const deleteChats = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) {
//       return res.status(401).send("User not registered OR Token malfunctioned");
//     }
//     if (user._id.toString() !== res.locals.jwtData.id) {
//       return res.status(401).send("Permissions didn't match");
//     }
//     //@ts-ignore
//     user.chats = [];
//     await user.save();
//     return res.status(200).json({ message: "OK" });
//   } catch (error: any) {
//     console.log(error);
//     return res.status(200).json({ message: "ERROR", cause: error.message });
//   }
// };
import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });

    // Convert user.chats into a conversation string
    const history = user.chats
      .map((chat: any) => `${chat.role}: ${chat.content}`)
      .join("\n");

    // Add the new user message
    const fullPrompt = `${history}\nuser: ${message}`;

    // Save user message
    user.chats.push({ content: message, role: "user" });

    // Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(fullPrompt);
    const reply = result.response.text();

    // Save Gemini’s reply as "assistant"
    user.chats.push({ content: reply, role: "assistant" });
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (err: any) {
    console.error("💥 Chat error:");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);

    if (err.response) {
      console.error("📩 Error Response:");
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
      console.error("Headers:", err.response.headers);
    } else if (err.request) {
      console.error("🛰 No response received:");
      console.error("Request:", err.request);
    } else {
      console.error("⚠️ Error setting up request:", err.message);
    }

    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
