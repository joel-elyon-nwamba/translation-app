// import from backebd
process.loadEnvFile();
console.log("API URL:", process.env.AI_URL);
console.log("AI Model:", process.env.AI_MODEL);
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL

})
app.use(cors({
    origin: "http://127.0.0.1:5500"
}));
app.use(express.json());


const PORT = 3000;

app.post("/api/translator", async (req, res) => {
    const { text, language } = req.body
    console.log({ text, language });
   try {
    const completion = await openai.chat.completions.create({
        model: process.env.AI_MODEL,
        messages: [
            {
            role: "system",
            content: `You are PollyGlot, an expert multilingual translator.

Translate the user's text into the requested target language.

Rules:
- Preserve the original meaning, intent, tone, and level of formality.
- Preserve slang, idioms, humor, and cultural nuances using natural equivalents in the target language.
- Use natural, fluent expressions rather than rigid word-for-word translations.
- Do not invent information or change the meaning.
- Do not add explanations, introductions, labels, quotation marks, or alternative translations.
- Return only the translated text.
- If the text is already in the target language, return it unchanged.`
    },
{
    role: "user",
    content: `Translate "${text}" into ${language}.`
}

        ]
    })
    const translatedText = completion.choices[0].message.content
    res.json({ translation: translatedText})
} catch(error) {
    console.error("Translation error:", error);
    res.status(500).json({
    error: "Unable to translate text. Please try again."
});
}
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
