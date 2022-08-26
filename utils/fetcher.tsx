const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) return [];

    return r.json();
  });

export default fetcher;
