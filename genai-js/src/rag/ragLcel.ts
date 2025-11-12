import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RAGRetriever } from "./retriever";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { ChatHandler, chat } from "../utils/chat";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
app.use(cors(
  {origin: 'http://localhost:5173', // backend should know where my frontend is hosted for cookies etc..
    credentials: true, // to allow cookies to be sent from frontend to backend and allowing http requests also even with out https
  } 
))

app.use(express.json()); // to handle to user request body we need this middleware
app.use(cookieParser());

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://venkatasaireddyvibrant:oF6xcN61jb8qhilw@organic-cluster.9ecyi.mongodb.net/tinder');
    console.log("Connected to MongoDB Server");

    app.listen(7777, () => {
      console.log("Server is running on port 7036");
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}





const prompt = ChatPromptTemplate.fromMessages([
  [
    "human",
    `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
Question: {question} 
Context: {context} 
Answer:`,
  ],
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
  },
  prompt,
  llm,
  outputParser,
]);

app.post('/search', async(req, res) => {
  const {query} = req.body.params;
  const result = await generationChain.invoke({ question: query });
  res.json({ answer: result });
});



connectDB().then(() => {
  console.log("Database connection attempt finished.");
  app.listen(7036, () => {
    console.log("Server is running on port 7036");
  });
}).catch((err) => {
  console.error("Error during database connection attempt:", err);
});
