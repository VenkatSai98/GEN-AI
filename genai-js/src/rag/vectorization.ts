// import dotenv from "dotenv";
// import { loadDocumentsFromUrls } from './loadDocuments';
// import { splitDocuments } from './splitDocuments';
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { Pinecone } from "@pinecone-database/pinecone";
// import { PineconeStore } from "@langchain/pinecone";
// import cliProgress from "cli-progress";


// dotenv.config();

// const rawDocuments = await loadDocumentsFromUrls();
// const chunkedDocuments = await splitDocuments(rawDocuments);

// const embeddingLLM = new OpenAIEmbeddings({
//     model: 'text-embedding-3-small'
// });

// const pinecone = new Pinecone({
//     apiKey: process.env.PINECONE_API_KEY || '',
// });
// const pineconeIndex = pinecone.index('langchain-docs');

// console.log("start vectorization...");
// const progressBar = new cliProgress.SingleBar({});
// progressBar.start(chunkedDocuments.length, 0);

// for (let i = 0; i < chunkedDocuments.length; i += 100) {
//     const chunk = chunkedDocuments.slice(i, i + 100);
//     await PineconeStore.fromDocuments(chunk, embeddingLLM, {
//         pineconeIndex,
//     });
//     progressBar.increment(chunk.length);
//     console.log(`Inserted documents ${i} to ${i + chunk.length} into Pinecone`);
// }

// progressBar.stop();
// console.log("Chunked documents stored in pinecone.");

import dotenv from "dotenv";
import { loadDocumentsFromUrls } from "./loadDocuments";
import { splitDocuments } from "./splitDocuments";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import cliProgress from "cli-progress";

dotenv.config();

const rawDocuments = await loadDocumentsFromUrls();

const chunkedDocuments = await splitDocuments(rawDocuments);

const embeddingLLM = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  dimensions: 1024
});

const pinecone = new Pinecone();

const pineconeIndex = pinecone.index("langchain-docs");

console.log("Starting Vecrotization...");
const progressBar = new cliProgress.SingleBar({});
progressBar.start(chunkedDocuments.length, 0);

for (let i = 0; i < chunkedDocuments.length; i = i + 100) {
  const batch = chunkedDocuments.slice(i, i + 100);
  await PineconeStore.fromDocuments(batch, embeddingLLM, {
    pineconeIndex,
  });

  progressBar.increment(batch.length);
}

progressBar.stop();
console.log("Chunked documents stored in pinecone.");
