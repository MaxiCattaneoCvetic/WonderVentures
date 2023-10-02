const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5).slice(0, 10);
};

export default shuffle;
