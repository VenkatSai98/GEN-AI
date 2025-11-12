
// with core openai package(with out using langchain)
// import dotenv from "dotenv";
// import OpenAI from 'openai';

// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const response = await openai.chat.completions.create({ model: "gpt-4", messages: [{ role: "user", content: "Describe about tirupati" }] });
// console.log(response.choices[0].message);


// with langchain package 
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";


dotenv.config()

const llm = new ChatOpenAI();

const response = await llm.invoke(
  "What is langchain."
);

console.log(response);
