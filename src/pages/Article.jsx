import NewsCard from "../components/NewsCard";

const Article = () => {
  return (
    <div id="NewsCardComponent" className="pagePadding container mx-auto flex min-h-dvh items-center justify-center py-16 sm:min-h-screen">
      <div id="content" className={`flex ${NewsCard.image ? "md:w-[50%]" : "md:w-full"} w-full flex-col justify-between gap-4 p-4`}>
        <h2 className="text-4xl font-bold">{NewsCard.title}</h2>
        <p className="text-xl text-gray-400">{NewsCard.description}</p>
        <div className="flex flex-col">
          {NewsCard.author && (
            <p className="text-base font-bold">Author: {NewsCard.author}</p>
          )}
          <p className="text-base font-bold">Date: {NewsCard.published_at}</p>
          <p className="text-base font-bold">Source: {NewsCard.source}</p>
        </div>
      </div>

      {NewsCard.image && (
        <div id="img" className="w-full md:w-[50%]">
          <img
            className="h-[100%] w-[100%] rounded-r object-cover"
            src={NewsCard.image}
            alt={NewsCard.title}
          />
        </div>
      )}
    </div>
  );
};

export default Article;
