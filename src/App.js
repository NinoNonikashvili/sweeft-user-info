import logo from "./logo.svg";
import "./App.css";
import { useState, useRef, useCallback } from "react";
import useFetchData from "./useFetchData";

//create custom hook - useFetchData
// '{page}/{size}' - for all user
// '{userId}/friends/{page}/{size}'
// '{userId}'

function App() {
  const [pageNum, setPageNum] = useState(1);
  // const [data, setData] = useState([]);
  // const [hasMore, setHasMore] = useState(false);
  // const [loading, setLoading] = useState(false);
  const observer = useRef();
  const { loading, data, hasMore } = useFetchData(pageNum);

  const lastElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);

      console.log(node);
    },
    [hasMore, loading]
  );

  console.log("rendered. hasMore: " + hasMore + "page num: " + pageNum);
  console.log(data);

  return (
    <>
      {data.map((user, index) => {
        if (index + 1 === data.length) {
          return (
            <div key={user.id} ref={lastElement}>
              {user.name}
              <p>{user.lastName}</p>
              <p>{user.id}</p>
            </div>
          );
        } else
          return (
            <div key={user.id}>
              {user.name} <p>{user.lastName}</p>
              <p>{user.id}</p>
            </div>
          );
      })}
      {loading && <div>loading...</div>}
    </>
  );
}

export default App;
