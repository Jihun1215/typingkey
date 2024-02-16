import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import { RouterProvider } from "react-router-dom";
import { router } from "shared/router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
