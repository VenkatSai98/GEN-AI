import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { Document } from "@langchain/core/documents";
import { crawlLangchainDocsUrls } from "./crawlDocuments";
import cliProgress from "cli-progress";

const progressBar = new cliProgress.SingleBar({});

export async function loadDocumentsFromUrls(): Promise<Document[]> {

  const langchainDocsUrls = await crawlLangchainDocsUrls();
  const allDocuments: Document[] = [];

  console.log(`Loading documents from ${langchainDocsUrls.length} URLs...`);

  progressBar.start(langchainDocsUrls.length, 0);

  for (const url of langchainDocsUrls) {
    const loader = new CheerioWebBaseLoader(url);
    const documents = await loader.load();
    allDocuments.push(...documents);
    progressBar.increment();
  }
    progressBar.stop();
    console.log(`Loaded a total of ${allDocuments.length} documents.`);

  return allDocuments;
}

// const rawDocs = await loadDocumentsFromUrls();
// console.log(rawDocs, "rawDocs");