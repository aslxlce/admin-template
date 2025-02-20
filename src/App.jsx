import { Toaster } from "react-hot-toast";
import Providers from "./providers";
import MyRoutes from "./Routes";

function App() {
  return (
    <Providers>
      <MyRoutes />
      <Toaster />
    </Providers>
  );
}

export default App;
