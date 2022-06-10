export const getRandomOffset = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const fetchInitialData = (
  gifsPerSession,
  randomOffset,
  setGifs,
  setIsLoading
) => {
  setIsLoading(true);
  fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&limit=${gifsPerSession}&offset=${randomOffset}`
  )
    .then((response) => response.json())
    .then((response) => {
      setGifs(
        response.data
          .sort((a, b) => {
            return new Date(a.import_datetime) - new Date(b.import_datetime);
          })
          .map((item, i) => {
            return { ...item, order: i + 1 };
          })
      );
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setIsLoading(false);
    });
};

export const fetchAdditionalData = (
  additionalGifsNeeded,
  randomOffset,
  setAdditionalArray,
  setIsLoading
) => {
  setIsLoading(true);
  fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&limit=${additionalGifsNeeded}&offset=${randomOffset}`
  )
    .then((response) => response.json())
    .then((response) => {
      setAdditionalArray(
        response.data
          .sort((a, b) => {
            return new Date(a.import_datetime) - new Date(b.import_datetime);
          })
          .map((item) => {
            return { ...item, order: 1 };
          })
      );
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setIsLoading(false);
    });
};
