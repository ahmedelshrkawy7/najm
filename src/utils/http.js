export const fetchData = async (url) => {
  const res = await fetch(url);
  const resData = await res.json();
  return resData;
};
