import React, { useState, useContext, useEffect, Fragment } from "react";
import GifsContext from "../../Context/GifsContext";
import Gif from "../Gif/Gif";
import "../../Styles/Gifs.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Gifs = () => {
  const [renderedGifs, setRenderedGifs] = useState([]);
  const { gifs, isLoading } = useContext(GifsContext);

  // Show new set of gifs on the screen when gifs array changes
  useEffect(() => {
    setRenderedGifs(gifs);
  }, [gifs]);

  return (
    <Fragment>
      {/* show loading spinner when the data acquisition process from API is not yet completed*/}
      {isLoading && <LoadingSpinner />}
      {/* show gifs on the screen, when data from API is received */}
      {!isLoading && (
        <div className="gifsGrid">
          {renderedGifs.map((gif) => {
            return (
              <Gif
                key={gif.id}
                unlockImg={gif.images.downsized_medium.url}
                lockImg={gif.images.downsized_still.url}
                title={gif.title}
                id={gif.id}
                order={gif.order}
              />
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default Gifs;
