import { useEffect, useState } from "react";
import { getNews } from "../utils/GetNews";
import { Link, useParams } from "react-router-dom";
import { changeMood, processTitleMood } from "../gemini/GeminiFunctions";

const Article = () => {
  const [article, setArticle] = useState(null);
  const [moodScore, setMoodScore] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getNews()
      .then((data) => {
        const specificCard = data.data[id];
        setArticle(specificCard);
        processTitleMood([specificCard.title]).then((scores) => {
          setMoodScore(scores[0]);
        });
      })
      .catch((error) => {
        console.error("Error fetching news list:", error);
      });
  }, [id]);

  const handleCalmify = async () => {
    if (article) {
      try {
        const updatedArticle = await changeMood(article);
        setArticle(updatedArticle);
        const updatedScore = await processTitleMood([updatedArticle.title]);
        setMoodScore(updatedScore[0]);
      } catch (error) {
        console.error("Error updating mood:", error);
      }
    }
  };

  if (!article) return <div>Loading...</div>;

  const { image, title, published_at, author, source, description } = article;

  return (
    <div
      id="NewsCardComponent"
      className="pagePadding container mx-auto flex min-h-dvh flex-col items-center justify-center gap-16 py-16 sm:min-h-screen"
    >
      <Link to="/">
        <button className="rounded border border-black px-4 py-2 font-bold">
          Go Back To Homepage
        </button>
      </Link>

      <div className="flex">
        <div
          id="content"
          className={`flex ${image ? "md:w-[50%]" : "md:w-full"} w-full flex-col justify-between gap-4 p-4`}
        >
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="text-xl text-gray-400">{description}</p>
          <div className="flex flex-col">
            {author && <p className="text-base font-bold">Author: {author}</p>}
            <p className="text-base font-bold">Date: {published_at}</p>
            <p className="text-base font-bold">Source: {source}</p>
          </div>
        </div>

        {image && (
          <div id="img" className="w-full md:w-[50%]">
            <img
              className="h-[100%] w-[100%] rounded-r object-cover"
              src={image}
              alt={title}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <p>{moodScore !== null ? `${moodScore}/10` : "Calculating..."}</p>
        <button
          onClick={handleCalmify}
          className="rounded border border-black px-4 py-2 font-bold"
        >
          Mood
        </button>
      </div>
    </div>
  );
};

export default Article;
