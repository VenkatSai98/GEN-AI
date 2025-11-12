import {PromptTemplate} from '@langchain/core/prompts';
import {ChatOpenAI} from "@langchain/openai"
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import dotenv from "dotenv";
dotenv.config()


// https://learn-with-amit.github.io/genai-js/langchain/  -- refer this doc for more details

const promptResponse = async(
    product: string
) => {

    const promptTemplate = new PromptTemplate({
        template: "What is a good name for a company that makes {product}?",
        inputVariables: ["product"],
    })
    
    const response = await promptTemplate.format({ product });
    console.log(response, "response")
    const llm = new ChatOpenAI();
    const outputParsers = new StringOutputParser()
    // if we have one or two components we can use pipe method but what if they are huge components, its difficult to read
    // const lcelChain = promptTemplate.pipe(llm).pipe(outputParsers) 
    // so instead use RunnableSequence instead of pipe, but internally RunnableSequence use pipe method
    const lcelChain =  RunnableSequence.from([
        promptTemplate,
        llm,
        outputParsers
    ])
    const lcelRespnse = await lcelChain.invoke({
        product
    })

console.log(lcelRespnse, "lcelResponse")
}

promptResponse("milk")
// promptResponse("coffee")




