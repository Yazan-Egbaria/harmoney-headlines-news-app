const url = `https://api.mediastack.com/v1/news`;

export function getNews() {
  const params = {
    languages: "en",
    countries: "us,il,ae",
    access_key: "9b9b6c46d842e9e1f0b344e5a23cc475",
    keywords: "israel,palestine",
    limit: 10,
  };

  const urlParams = new URLSearchParams(params).toString();
  return fetch(`${url}?${urlParams}`)
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
}
