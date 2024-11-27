import NewsCard from "../components/NewsCard";

const Article = ({
  image,
  title,
  published_at,
  author,
  source,
  description,
}) => {
  return (
    <div
      id="NewsCardComponent"
      className="pagePadding container mx-auto flex min-h-dvh items-center justify-center py-16 sm:min-h-screen"
    >
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
  );
};

export default Article;
