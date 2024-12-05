import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Article = () => {
  const [article, setArticle] = useState(null);
  const [moodScore, setMoodScore] = useState(null);
  const { id } = useParams();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  useEffect(() => {
    axios
      .get("https://harmoney-headlines-news-app.onrender.com/getNews")
      .then((response) => {
        const specificCard = response.data[id];
        setArticle(specificCard);
        axios
          .post(
            "https://harmoney-headlines-news-app.onrender.com/processTitleMood",
            {
              titles: [specificCard.title],
            },
          )
          .then((scoreResponse) => {
            setMoodScore(scoreResponse.data[0]);
          })
          .catch((error) => {
            console.error("Error fetching sentiment score:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching news list:", error);
      });
  }, [id]);

  const handleCalmify = async () => {
    if (article) {
      try {
        const calmifyResponse = await axios.post(
          "https://harmoney-headlines-news-app.onrender.com/changeMood",
          {
            title: article.title,
            description: article.description,
          },
        );
        const updatedArticle = calmifyResponse.data;
        setArticle(updatedArticle);
        const scoreResponse = await axios.post(
          "https://harmoney-headlines-news-app.onrender.com/processTitleMood",
          {
            titles: [updatedArticle.title],
          },
        );
        setMoodScore(scoreResponse.data[0]);
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
          className={`flex ${image ? "md:w-[50%]" : "md:w-full"} w-full flex-col justify-center gap-4 p-4`}
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

      {isAdmin && (
        <div className="flex flex-col items-center">
          <p>{moodScore !== null ? `${moodScore}/10` : "Calculating..."}</p>
          <button
            onClick={handleCalmify}
            className="rounded border border-black px-4 py-2 font-bold"
          >
            Mood
          </button>
        </div>
      )}
    </div>
  );
};

export default Article;
