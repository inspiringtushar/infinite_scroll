import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getCatFact = () => {
      setLoading(true);
      fetch(`https://catfact.ninja/facts?page=${page}`)
        .then((data) => data.json())
        .then((val) => {
          setData((data) => {
            return [...data, ...val.data];
          });
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    };
    getCatFact();
  }, [page]);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      (e) => {
        optimizedScroll(e);
      },
      { passive: true },
    );
    return () => window.removeEventListener("scroll", optimizedScroll);
  }, []);
  const handleScroll = () => {
    console.log("outside");
    if (
      !loading &&
      window.innerHeight + window.scrollY - document.body.scrollHeight >= -5
    ) {
      setPage((page) => page + 1);
      console.log("inside");
    }
  };

  const debounceScroll = (cb, delay) => {
    let timer;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  const optimizedScroll = debounceScroll(handleScroll, 500);

  return (
    <>
      <h1>
        Some crazy facts about <i>Cats</i>
      </h1>
      <ul>
        {data?.map((item, i) => (
          <li key={i} className="list">
            {item.fact}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
