import React, { useContext, useState, useEffect } from "react";
import svgInfo from "../../images/info.svg";
import svgTETSHY from "../../images/TESTHY.svg";
import GifsContext from "../../Context/GifsContext";
import "../../Styles/Navbar.css";
import {
  fetchInitialData,
  fetchAdditionalData,
  getRandomOffset,
} from "../../Utils/Utils";

const Navbar = () => {
  const { setGifs, setFetchesNumber, setIsFirstRender, setIsLoading } =
    useContext(GifsContext);

  const [ordersFromLSArr, setOrdersFromLSArr] = useState([]);
  const [ordersArr, setOrdersArr] = useState([]);
  const [additionalArray, setAdditionalArray] = useState([]);
  const [gifsFromStorage, setGifsFromStorage] = useState([]);
  // This number is derived from the design and it is constant across whole application
  const gifsPerSession = 12;

  // Generate array from, which contains numbers from 1 to 12 --> [1, ..... , 12]
  const arrayTo12 = Array.from({ length: 12 }, (_, i) => i + 1);
  // Data from API docs (you can choose maxoffset number higher, but for me sometimes it lead to bug)
  const minOffset = 0;
  const maxOffset = 500;

  const handleShuffleGifs = () => {
    // Get random number betweeen maxoffset and minoffset
    const randomOffsetNumber = getRandomOffset(minOffset, maxOffset);
    // Check if any locked gifs are in the LS, if not just set a new set of random Gifs
    if (JSON.parse(localStorage.getItem("lockedGifs")).length === 0) {
      fetchInitialData(
        gifsPerSession,
        randomOffsetNumber,
        setGifs,
        setIsLoading
      );
    } else {
      // If array from LS is not empty (it menas there are locked gifs) when generate a new array which consists of the arrays from LS and newly obtained arrays (additional arrays) from API
      //
      setGifsFromStorage(JSON.parse(localStorage.getItem("lockedGifs")));
      const arrFromLSLenght = JSON.parse(
        localStorage.getItem("lockedGifs")
      ).length;
      const additionalGifsNeeded = gifsPerSession - arrFromLSLenght;
      // Delete locked gifs in the LS, because new set of gifs will be generated
      localStorage.removeItem("lockedGifs");
      setIsFirstRender(false);
      localStorage.setItem("lockedGifs", "[]");
      setFetchesNumber((prevState) => prevState + 1);
      // Receive additional data. Additional gifs with the gifs from LS will conclude new set of gifs when page is loaded or button is clicked or space is clicked
      fetchAdditionalData(
        additionalGifsNeeded,
        randomOffsetNumber,
        setAdditionalArray,
        setIsLoading
      );
    }
  };

  // Set initial gifs when browser is restarted or page is refreshed
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("lockedGifs"))) {
      localStorage.setItem("lockedGifs", "[]");
    }
    handleShuffleGifs();
  }, []);

  // Generate orders array from gifs array obtained from LS. This array contains order values from array in the LS (in LS is saved locked gifs)
  useEffect(() => {
    setOrdersFromLSArr(
      gifsFromStorage.map((item) => {
        return item.order;
      })
    );

    // Generate new orders array from arrayTo12 which not includes values from OrdersFromLsArr. This array will be used to add order properties to additional gifs
    setOrdersArr((prev) =>
      arrayTo12.filter((item) => !ordersFromLSArr.includes(item))
    );

    // set new gifs which contains of gifs from LS and additional gifs received from API
    if (additionalArray) {
      setGifs([...gifsFromStorage, ...additionalArray]);
    } else {
      // console.log("Something went wrong");
    }
  }, [additionalArray, gifsFromStorage]);

  // Set order property to additionals gifs. This guarantees that they will not take up locked gif place in the grid
  useEffect(() => {
    if (additionalArray) {
      additionalArray.forEach((item, i) => {
        item.order = ordersArr[i];
      });
    } else {
      // console.log("Something went wrong");
    }
  }, [ordersArr]);

  // Generate new set of gifs when click space button. The same functionality as you click button.
  useEffect(() => {
    document.addEventListener("keydown", detectSpaceDown, true);
  }, []);

  const detectSpaceDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
      handleShuffleGifs();
    }
  };

  return (
    <div className="navbar">
      <img className="testhy" src={svgTETSHY} alt="logoImage" />
      <div className="navAction">
        <div className="spacebarInfo">
          <img className="infoImg" src={svgInfo} alt="info" />
          <p className="text">
            Press <span className="spacebarWord">spacebar</span> to shuffle or
          </p>
        </div>
        <button onClick={handleShuffleGifs} className="navButton">
          Click here
        </button>
      </div>
    </div>
  );
};

export default Navbar;
