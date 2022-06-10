import { createContext, useState } from "react";

const GifsContext = createContext();

export function GifsContextProvider({ children }) {
  const [gifs, setGifs] = useState([]);
  const [fetchesNumber, setFetchesNumber] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GifsContext.Provider
      value={{
        gifs,
        setGifs,
        fetchesNumber,
        setFetchesNumber,
        isFirstRender,
        setIsFirstRender,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GifsContext.Provider>
  );
}

export default GifsContext;
