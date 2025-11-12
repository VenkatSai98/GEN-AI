import { VectorStoreRetriever } from "@langchain/core/vectorstores" 
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import dotenv from "dotenv";

dotenv.config();


/* 
this retriever can be used in RAG chains for genaerating vector embedding for our question and also 
to fetch relevant chuncks from Pinecone index and return them as context to LLM for answer generation.
*/
export const RAGRetriever = async (): Promise<VectorStoreRetriever> => {
    const embeddingLLM = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
      dimensions: 1024
    });
    
    const pinecone = new Pinecone();
    
    const pineconeIndex = pinecone.index("langchain-docs");
    const vectorStore = await PineconeStore.fromExistingIndex(embeddingLLM, {
        pineconeIndex,
      });

    return vectorStore.asRetriever();
  
}

// const retrieverInstance = await retriever();

// const context = await retrieverInstance.invoke("What is LangChain?");

// console.log("Retrieved Context:", context);