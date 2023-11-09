import { Ollama } from "langchain/llms/ollama"

const AIbot = async () => {
    const ollama = new Ollama({
        baseUrl: "http://172.17.0.2:11434/",
        model: "mistral",
      });
      
      const answer = await ollama.call(`why is the sky blue?`);
      
      console.log(answer);

      return (
        <>
        <h3>Why is the sky blue?</h3>
        <p>{answer}</p>
        </>
      )

}



export default AIbot;