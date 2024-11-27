import { createBrowserRouter } from "react-router-dom";
import NewsList from "../pages/NewsList";
import Article from "../pages/Article";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NewsList />,
  },
  {
    path: "/article/:id",
    element: <Article />,
  },
]);
