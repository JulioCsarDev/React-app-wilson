import { BrowserRouter } from "react-router-dom";
import { PathnameProvider } from "./providers/PathnameProviders";
import { AppRouting } from "./routing/AppRouting";

function App() {
  return (
    <BrowserRouter>
      <PathnameProvider>
        <AppRouting />
      </PathnameProvider>
    </BrowserRouter>
  );
}

export default App;
