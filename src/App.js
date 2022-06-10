import Navbar from "./Components/Navbar/Navbar";
import Gifs from "./Components/Gifs/Gifs";
import { GifsContextProvider } from "./Context/GifsContext";

function App() {
  return (
    <GifsContextProvider>
      <div className="container">
        <Navbar />
        <Gifs />
      </div>
    </GifsContextProvider>
  );
}

export default App;
