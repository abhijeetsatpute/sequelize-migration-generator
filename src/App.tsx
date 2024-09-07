import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "./routes";
import ThemeProvider from "./theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <IndexRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
