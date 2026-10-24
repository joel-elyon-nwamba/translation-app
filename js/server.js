// import from backebd
process.loadEnvFile();
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
    const completion = await openai.chat.completions.create({
        model: process.env.AI_MODEL,
        messages: [
            {
            role: "system",
            content: "You are a professional translator. Translate text accurately and naturally."
}

        ]
    })
    res.json(`Message: Translation received `)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
