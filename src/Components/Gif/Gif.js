import React, { useEffect, useState, useContext, useRef } from "react";
import "../../Styles/Gif.css";
import lockImgSvg from "../../images/lockSvg.svg";
import unLockImgSvg from "../../images/unlockSvg.svg";
import GifsContext from "../../Context/GifsContext";

const Gif = ({ unlockImg, lockImg, title, id, order }) => {
  const [isLock, setIsLock] = useState(false);
  const [showUnlockContent, setShowUnlockContent] = useState(false);
  const [showLockContent, setShowLockContent] = useState(false);
  const { fetchesNumber } = useContext(GifsContext);

  // Change setIsLock state on every button click, space click or browser restart to get unlocked gifs
  useEffect(() => {
    setIsLock(false);
  }, [fetchesNumber]);

  const handleIsLock = () => {
    setIsLock((prevState) => !prevState);
    // If you click gif and it is not locked, then add gif object to LS
    if (!isLock) {
      let gifsFromStorageArr = JSON.parse(localStorage.getItem("lockedGifs"));

      const addedGifObject = {
        images: {
          downsized_medium: {
            url: unlockImg,
          },
          downsized_still: {
            url: lockImg,
          },
        },
        title: title,
        id: id,
        order: order,
        isFromStorage: true,
      };

      gifsFromStorageArr.push(addedGifObject);
      localStorage.setItem("lockedGifs", JSON.stringify(gifsFromStorageArr));
    }
    // If you click gif and it is locked, delete this gif from LS
    if (isLock) {
      let gifsFromStorage = JSON.parse(localStorage.getItem("lockedGifs"));
      const filteredGifsArr = gifsFromStorage.filter((gif) => gif.id !== id);
      localStorage.setItem("lockedGifs", JSON.stringify(filteredGifsArr));
    }
  };

  // On gif hover show click to lock or click to unlock text with svg icon, text depends on state
  const handleMouseEnter = (e) => {
    if (isLock) {
      setShowUnlockContent(true);
    }
    if (!isLock) {
      setShowLockContent(true);
    }
  };

  // On mouse leave dont show any text on the gif
  const handleMouseLeave = () => {
    setShowUnlockContent(false);
    setShowLockContent(false);
  };

  return (
    <div
      onClick={handleIsLock}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchCancel={handleMouseLeave}
      className="gifContainer"
      // Every gif object have order property, it determines it's position in the grid
      style={{ order: `${order}` }}
    >
      {/* If gif is not locked show animatedImg */}
      {!isLock && <img className="gifImg" src={unlockImg} alt={title} />}
      {/* If gif is locked show not animatedImg */}
      {isLock && <img className="gifImg" src={lockImg} alt={title} />}
      {/* If gif is locked and not hover, then show lock icon */}
      {isLock && !showUnlockContent && (
        <div className="lockImgContainer">
          <img className="lockImg" src={lockImgSvg} alt="lockImage" />
        </div>
      )}
      {/* If gif is locked, show click to unlock text on hover */}
      {isLock && showUnlockContent && (
        <div className="lockingContent">
          <img className="lockImg" src={unLockImgSvg} alt="unlockImg" />
          <p className="lockingText">Click to unlock</p>
        </div>
      )}
      {/* If gif is not locked, show click to lock text on hover */}
      {!isLock && showLockContent && (
        <div className="lockingContent">
          <img className="lockImg" src={lockImgSvg} alt="unlockImg" />
          <p className="lockingText">Click to lock</p>
        </div>
      )}
    </div>
  );
};

export default Gif;
