import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyD31_7JTuCjsqHSN9VieB9Hke4VRl3Rajs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function processTitleMood(titles) {
  let prompt = `for each sentence of the following sentences, 
    give a score based on sentiment analysis, ranging from 0 to 10,
    0 being the most friendly, supportive and empathetic, while 10
    is the most aggressive and charged. return only a list of numbers,
    without any further explanations. make sure that the number of scores
    you return match the numbers of sentences. the sentences are: `;
  prompt += JSON.stringify(titles);
  const result = await model.generateContent(prompt);
  const answer = result.response.text();
  return JSON.parse(answer);
}

export async function changeMood(data) {
  const prompt = `i will give you a title and a news story. you need to 
    make them both calmer, more empathetic and more positive - without loosing
    any of the important existing facts.  the title is: ${data.title}.
    The description is: ${data.description}.
    Return the new value as a an object, with the format: {
        title: <new updated title here>,
        description: <new updated description here>
    }.
    return ONLY this object, without any additional text or explanations.
    dont and anything before or after the {} of the object. dont return markdown.`;
  const result = await model.generateContent(prompt);
  const answer = result.response.text().trim();
  return JSON.parse(answer);
}
