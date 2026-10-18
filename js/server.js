import OpenAI from "openai";

const express = require("express");
const app = express();
const PORT = 3000;

const request = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL
})

const messages = [
  {
    role: "system",
    content: `You are a professional translator. You particularly specialize in translate everything in English to French, Spanish, and Japanese
      You even know the slangs in French from Quebec, France, Switzerland, and Belgium. You also know the different types of Spanish to be specific you know the Spanish from Spain
      You know Spanish from the following list:

North America & Central America (7)

• Mexico
• Guatemala
• Honduras
• El Salvador
• Nicaragua
• Costa Rica
• Panama

The Caribbean (3)

• Cuba
• Dominican Republic
• Puerto Rico (U.S. Commonwealth / Territory)

South America (9)

• Argentina
• Bolivia
• Chile
• Colombia
• Ecuador
• Paraguay
• Peru
• Uruguay
• Venezuela
    
    `
  }
];

app.post('/api/translator', (req, res) => {
  const { userPrompt } = req.body

  messages.push({
    role:"user",
    content: userPrompt
  });

  const respond = openai.chat.completions.create({
    model: process.env.AI_MODEL,
    messages
  })

});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});