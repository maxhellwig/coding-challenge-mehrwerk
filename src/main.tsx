import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { setupStore } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <StrictMode>
      <Provider store={setupStore()}>
        <BrowserRouter>
          <main>
            <App />
          </main>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  </ChakraProvider>,
);
