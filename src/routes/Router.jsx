import { createBrowserRouter } from "react-router-dom";
import NewsList from "../pages/NewsList";
import Article from "../pages/Article";
import RootLayout from "../pages/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <NewsList />,
      },
      {
        path: "/article/:id",
        element: <Article />,
      },
    ],
  },
]);
