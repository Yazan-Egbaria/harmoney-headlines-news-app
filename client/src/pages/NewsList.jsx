import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import axios from "axios";

const NewsList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get("https://harmoney-headlines-news-app.onrender.com/getNews")
      .then((response) => {
        const articles = response.data;
        const titles = articles.map((article) => article.title);
        axios
          .post(
            "https://harmoney-headlines-news-app.onrender.com/processTitleMood",
            { titles },
          )
          .then((moodResponse) => {
            const moodScores = moodResponse.data;
            const articlesWithMood = articles.map((article, index) => ({
              ...article,
              moodScore: moodScores[index],
            }));
            setCards(articlesWithMood);
          })
          .catch((error) => {
            console.error("Error processing mood scores:", error);
            setCards(articles);
          });
      })
      .catch((error) => {
        console.error("Error fetching news list:", error);
      });
  }, []);

  return (
    <div
      id="NewsList"
      className="pagePadding container mx-auto flex min-h-dvh flex-col items-center justify-center gap-12 py-16 sm:min-h-screen"
    >
      <h1 className="text-4xl font-bold">News List</h1>
      <div className="flex flex-col gap-12">
        {cards.map((card, index) => {
          return <NewsCard key={index} id={index} {...card} />;
        })}
      </div>
    </div>
  );
};

export default NewsList;
