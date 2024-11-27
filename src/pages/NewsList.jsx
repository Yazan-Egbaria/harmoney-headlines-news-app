import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { getNews } from "../utils/GetNews";

const NewsList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getNews()
      .then((data) => {
        setCards(data.data);
      })
      .catch((error) => {
        console.error("Error fetching news list:", error);
      });
  }, []);

  return (
    <div
      id="NewsList"
      className="pagePadding container mx-auto flex min-h-dvh items-center justify-center py-16 sm:min-h-screen"
    >
      <div className="flex flex-col gap-12">
        {cards.map((card, index) => {
          return <NewsCard key={index} {...card} />;
        })}
      </div>
    </div>
  );
};

export default NewsList;
