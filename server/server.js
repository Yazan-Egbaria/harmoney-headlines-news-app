const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 7000;
const URL = process.env.MEDIASTACK;
const KEY = process.env.ACCESSKEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.listen(PORT, () => {
  console.log("Sever is listening");
});

app.get("/getNews", async (req, res) => {
  try {
    const params = new URLSearchParams({
      languages: "en",
      countries: "us,il,ae",
      access_key: KEY,
      keywords: "israel,palestine",
      limit: 10,
    }).toString();
    const urlParams = new URLSearchParams(params).toString();
    const response = await fetch(`${URL}?${urlParams}`);
    const news = await response.json();
    res.json(news.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.post("/processTitleMood", async (req, res) => {
  try {
    const titles = req.body.titles;
    let prompt = `for each sentence of the following sentences, 
      give a score based on sentiment analysis, ranging from 0 to 10,
      0 being the most friendly, supportive and empathetic, while 10
      is the most aggressive and charged. return only a list of numbers,
      without any further explanations. make sure that the number of scores
      you return match the numbers of sentences. the sentences are: `;
    prompt += JSON.stringify(titles);

    const result = await model.generateContent(prompt);
    const answer = JSON.parse(result.response.text());
    res.json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process title mood" });
  }
});

app.post("/changeMood", async (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.description) {
      return res.status(400).json({ error: "Invalid title or description" });
    }

    const prompt = `i will give you a title and a news story. you need to 
        make them both calmer, more empathetic and more positive - without losing
        any of the important existing facts. the title is: ${data.title}.
        The description is: ${data.description}.
        Return the new value as a an object, with the format: {
            title: <new updated title here>,
            description: <new updated description here>
        }.
        return ONLY this object, without any additional text or explanations.`;

    const result = await model.generateContent(prompt);
    const answer = result.response.text().trim();

    try {
      const parsedAnswer = JSON.parse(answer);
      res.json(parsedAnswer);
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError);
      res.status(500).json({ error: "Failed to parse AI response" });
    }
  } catch (error) {
    console.error("Error in /changeMood:", error);
    res.status(500).json({ error: "Failed to change mood" });
  }
});
