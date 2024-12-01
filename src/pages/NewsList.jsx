import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { getNews } from "../utils/GetNews";
import { processTitleMood } from "../gemini/GeminiFunctions";

const NewsList = () => {
  const [cards, setCards] = useState([]);

  // useEffect(() => {
  //   getNews()
  //     .then((data) => {
  //       setCards(data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching news list:", error);
  //     });
  // }, []);

  useEffect(() => {
    getNews()
      .then((data) => {
        setCards(data.data);
        const titles = data.data.map((article) => article.title);
        processTitleMood(titles).then((scores) => {
          console.log("Mood Scores:", scores);
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
