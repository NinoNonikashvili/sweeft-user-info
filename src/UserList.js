import logo from "./logo.svg";
import { useState, useRef, useCallback } from "react";
import useFetchData from "./useFetchData";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";

function UserList() {
  const [pageNum, setPageNum] = useState(1);
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
    },
    [hasMore, loading]
  );

  return (
    <>
      <div className="cardsWrapper">
        {data.map((user, index) => {
          if (index + 1 === data.length) {
            return (
              <Link to={`/userPage/${user.id}`}>
                <div key={user.id} ref={lastElement} className="card">
                  <img src={user.imageUrl} alt="user image" className="img" />
                  <h3>
                    <span>{user.prefix}</span>
                    <span>{user.name}</span>
                    <span>{user.lastName}</span>
                  </h3>
                  <h4>{user.title}</h4>
                </div>
              </Link>
            );
          } else
            return (
              <Link to={`/userPage/${user.id}`}>
                <div key={user.id} className="card">
                  <img src={user.imageUrl} alt="user image" className="img" />
                  <h3>
                    <span>{user.prefix}</span>
                    <span>{user.name}</span>
                    <span>{user.lastName}</span>
                  </h3>
                  <h4>{user.title}</h4>
                </div>
              </Link>
            );
        })}

        {loading && <div>loading...</div>}
      </div>
    </>
  );
}

export default UserList;
