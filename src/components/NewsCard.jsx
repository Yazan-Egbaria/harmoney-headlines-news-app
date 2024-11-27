const NewsCard = ({ image, title, published_at, author, source }) => {
  return (
    <div
      id="NewsCard"
      className="flex w-full flex-col gap-8 rounded border shadow-md md:w-[750px] md:flex-row"
    >
      <div
        id="content"
        className={`flex ${image ? "md:w-[50%]" : "md:w-full"} w-full flex-col justify-between gap-4 p-4`}
      >
        <h2 className="text-2xl font-bold">{title}</h2>

        <div className="flex flex-col">
          {author && <p className="text-sm font-bold">Author: {author}</p>}
          <p className="text-sm font-bold">Date: {published_at}</p>
          <p className="text-sm font-bold">Source: {source}</p>
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

export default NewsCard;
