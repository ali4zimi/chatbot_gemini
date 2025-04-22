import { GoogleGenAI } from "@google/genai";
import { Readable } from "stream";
import { sendStream } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const { userInput, context } = await readBody(event);

  event.node.res.setHeader("Content-Type", "text/plain");
  event.node.res.setHeader("Cache-Control", "no-cache");
  event.node.res.setHeader("Connection", "keep-alive");
  event.node.res.setHeader("Access-Control-Allow-Origin", "*");
  // event.node.res.flushHeaders();


  const ai = new GoogleGenAI({ apiKey: config.GOOGLE_GENAI_API_KEY });
  
  console.log("userInput", userInput);
  console.log("context", context);
  

  const history = [
    { role: "user", content: "You are a helpful assistant, the user will upload a file and you will help them with it." },
  ]

  if (context) {    
    for (const item of context) {
      history.push(item);
    }
  }
  
  
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: history,
  });
  
  // const response = await ai.models.generateContentStream({
  //   model: "gemini-2.0-flash",
  //   contents: "Explain the concept of a black hole in simple terms.",
  // });

  const stream = await chat.sendMessageStream({
    message: userInput,
  });

  for await (const chunk of stream) {
    console.log(chunk);
    event.node.res.write(chunk.text);
  }




  return event.node.res.end();
});
