import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { loadDocumentsFromUrls } from "./loadDocuments";

export const splitDocuments = async (
  documents: Document[]
): Promise<Document[]> => {
const splitter = RecursiveCharacterTextSplitter.fromLanguage('html', {
    chunkSize: 500,
    chunkOverlap: 200,
  });
  const splitDocs = await splitter.splitDocuments(documents);
  console.log(`Split ${documents.length} documents into ${splitDocs.length} documents`);
  return splitDocs;
}

// const rawDocuments = await loadDocumentsFromUrls()
// await splitDocuments(rawDocuments);