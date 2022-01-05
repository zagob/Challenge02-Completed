import { BrowserRouter } from "react-router-dom";
import { FoodsProvider } from "./hooks/useFoodsContext";

import { Router } from "./routes";

import GlobalStyle from "./styles/global";

function App() {
  return (
    <>
      <GlobalStyle />
      <FoodsProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </FoodsProvider>
    </>
  );
}

export default App;
