// import {
//   ChatPromptTemplate,
//   MessagesPlaceholder,
// } from "@langchain/core/prompts";
// import { ChatOpenAI } from "@langchain/openai";
// import { StringOutputParser } from "@langchain/core/output_parsers";
// import { RAGRetriever } from "./retriever";
// import { RunnableSequence } from "@langchain/core/runnables";
// import { formatDocumentsAsString } from "langchain/util/document";
// import { ChatHandler, chat } from "../utils/chat";
// import { BaseMessage, AIMessage, HumanMessage } from "@langchain/core/messages";
// import mongoose from 'mongoose';
// import express from 'express';
// import cors from "cors";
// import cookieParser from 'cookie-parser';


// const app = express();
// app.use(cors(
//   {origin: 'http://localhost:5173', // backend should know where my frontend is hosted for cookies etc..
//     credentials: true, // to allow cookies to be sent from frontend to backend and allowing http requests also even with out https
//   } 
// ))

// app.use(express.json()); // to handle to user request body we need this middleware
// app.use(cookieParser());

// async function connectDB() {
//   try {
//     await mongoose.connect('mongodb+srv://venkatasaireddyvibrant:oF6xcN61jb8qhilw@organic-cluster.9ecyi.mongodb.net/tinder');
//     console.log("Connected to MongoDB Server");

//     app.listen(7777, () => {
//       console.log("Server is running on port 7036");
//     });
//   } catch (err) {
//     console.error("MongoDB connection failed:", err);
//   }
// }

// const prompt = ChatPromptTemplate.fromMessages([
//   [
//     "human",
//     `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
//   Context: {context} 
//   `,
//   ],
//   new MessagesPlaceholder("chat_history"),
//   ["human", "{question}"],
// ]);

// const llm = new ChatOpenAI({
//   model: "gpt-3.5-turbo",
//   maxTokens: 500,
// });

// const outputParser = new StringOutputParser();

// const retriever = await RAGRetriever();

// const retrievalChain = RunnableSequence.from([
//   (input) => input.question,
//   retriever,
//   formatDocumentsAsString,
// ]);

// const generationChain = RunnableSequence.from([
//   {
//     question: (input) => input.question,
//     context: retrievalChain,
//     chat_history: (input) => input.chat_history,
//   },
//   prompt,
//   llm,
//   outputParser,
// ]);

// const qcSystemPrompt = `Given a chat history and the latest user question
// which might reference context in the chat history, formulate a standalone question
// which can be understood without the chat history. Do NOT answer the question,
// just reformulate it if needed and otherwise return it as is.`;

// const qcPrompt = ChatPromptTemplate.fromMessages([
//   ["system", qcSystemPrompt],
//   new MessagesPlaceholder("chat_history"),
//   ["human", "{question}"],
// ]);

// const qcChain = RunnableSequence.from([qcPrompt, llm, outputParser]);

// const chatHistory: BaseMessage[] = [];

// app.post('/search', async(req, res) => {
//     const {query} = req.body.params;
    
//   });
  
  
  
//   connectDB().then(() => {
//     console.log("Database connection attempt finished.");
//     app.listen(7036, () => {
//       console.log("Server is running on port 7036");
//     });
//   }).catch((err) => {
//     console.error("Error during database connection attempt:", err);
//   });

// const chatHandler: ChatHandler = async (question: string) => {
//   let contextualizedQuestion = null;

//   if (chatHistory.length > 0) {
//     contextualizedQuestion = await qcChain.invoke({
//       question,
//       chat_history: chatHistory,
//     });
//     console.log(`Contextualized Question: ${contextualizedQuestion}`);
//   }

//   return {
//     answer: generationChain.stream({
//       question: contextualizedQuestion || question,
//       chat_history: chatHistory,
//     }),
//     answerCallBack: async (answerText: string) => {
//       chatHistory.push(new HumanMessage(contextualizedQuestion || question));
//       chatHistory.push(new AIMessage(answerText));
//     },
//   };
// };

// chat(chatHandler);


import {
    ChatPromptTemplate,
    MessagesPlaceholder,
  } from "@langchain/core/prompts";
  import { ChatOpenAI } from "@langchain/openai";
  import { StringOutputParser } from "@langchain/core/output_parsers";
  import { RAGRetriever } from "./retriever";
  import { RunnableSequence } from "@langchain/core/runnables";
  import { formatDocumentsAsString } from "langchain/util/document";
  import { ChatHandler, chat } from "../utils/chat";
  import { BaseMessage, AIMessage, HumanMessage } from "@langchain/core/messages";
  import mongoose from "mongoose";
  import express from "express";
  import cors from "cors";
  import cookieParser from "cookie-parser";
  
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  
  // ✅ MongoDB connection
  async function connectDB() {
    try {
      await mongoose.connect(
        "mongodb+srv://venkatasaireddyvibrant:oF6xcN61jb8qhilw@organic-cluster.9ecyi.mongodb.net/tinder"
      );
      console.log("Connected to MongoDB Server");
      app.listen(7036, () => {
        console.log("Server is running on port 7036");
      });
    } catch (err) {
      console.error("MongoDB connection failed:", err);
    }
  }
  
  // ✅ LangChain setup
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "human",
      `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. 
      If you don't know the answer, just say that you don't know. 
      Use three sentences maximum and keep the answer concise.
      Context: {context}`,
    ],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
  ]);
  
  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    maxTokens: 500,
  });
  
  const outputParser = new StringOutputParser();
  const retriever = await RAGRetriever();
  
  const retrievalChain = RunnableSequence.from([
    (input) => input.question,
    retriever,
    formatDocumentsAsString,
  ]);
  
  const generationChain = RunnableSequence.from([
    {
      question: (input) => input.question,
      context: retrievalChain,
      chat_history: (input) => input.chat_history,
    },
    prompt,
    llm,
    outputParser,
  ]);
  
  const qcSystemPrompt = `Given a chat history and the latest user question
  which might reference context in the chat history, formulate a standalone question
  which can be understood without the chat history. Do NOT answer the question,
  just reformulate it if needed and otherwise return it as is.`;
  
  const qcPrompt = ChatPromptTemplate.fromMessages([
    ["system", qcSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
  ]);
  
  const qcChain = RunnableSequence.from([qcPrompt, llm, outputParser]);
  const chatHistory: BaseMessage[] = [];
  
  // ✅ Chat Handler
  const chatHandler: ChatHandler = async (question: string) => {
    let contextualizedQuestion = null;
  
    if (chatHistory.length > 0) {
      contextualizedQuestion = await qcChain.invoke({
        question,
        chat_history: chatHistory,
      });
      console.log(`Contextualized Question: ${contextualizedQuestion}`);
    }
  
    return {
      answer: generationChain.invoke({
        question: contextualizedQuestion || question,
        chat_history: chatHistory,
      }),
      answerCallBack: async (answerText: string) => {
        chatHistory.push(new HumanMessage(contextualizedQuestion || question));
        chatHistory.push(new AIMessage(answerText));
      },
    };
  };
  
  // ✅ POST /search endpoint
  app.post("/search", async (req, res) => {
    try {
      const { query } = req.body.params;
  
      if (!query) {
        return res.status(400).json({ error: "Query is required" });
      }
  
      console.log(`🔍 Received query: ${query}`);
  
      // Call chat handler
      const chatResponse = await chatHandler(query);

if (!chatResponse?.answer) {
  return res.status(500).json({ error: "No answer generated" });
}

const answerText = await chatResponse.answer;

if (chatResponse.answerCallBack) {
  await chatResponse.answerCallBack(answerText);
}

res.json({ answer: answerText });
    } catch (error) {
      console.error("❌ Error in /search:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  connectDB();
  