import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);