// import { Suspense } from "react";

import { createBrowserRouter } from "react-router-dom";

import { App } from "../App";
import { Layout } from "shared/Layout";
import { Home, Typing } from "pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: (
    //   <Suspense fallback={null}>
    //     <NotFound />
    //   </Suspense>
    // ),
    children: [
      {
        element: <Layout />,
        children: [{ path: "/", element: <Home /> }],
      },
      {
        element: <Layout />,
        children: [{ path: "/typing", element: <Typing /> }],
      },
    ],
  },
]);
