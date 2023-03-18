import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "./useFetchData";
import useFetchUserInfo from "./useFetchUserInfo";
import { Link } from "react-router-dom";

export default function UserPage() {
  const [userId, setUserId] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [visitedUsers, setVisitedUsers] = useState([]);
  // const params = useParams();
  useEffect(() => {
    setUserId(useParams.id);
  }, []);
  const { userData, userAddress, userCompany, userError } =
    useFetchUserInfo(userId);
  const { data, loading, hasMore, error } = useFetchData(pageNum, true, userId);

  console.log(data);
  //infinite scroll
  const observer = useRef();

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
    <div className="userPageWrapper">
      {
        <div className="userInfo" id="top">
          {/* image */}
          <div className="userImgWrapper">
            <img src={userData.imageUrl} className="userImg" />
          </div>
          {/* info */}
          <div className="userData">
            <h2>User Information</h2>
            <h3>
              {userData.prefix} {userData.name} {userData.lastName}
            </h3>
            <h4>{userData.title}</h4>
            <p>
              <span>Email:</span> {userData.email}
            </p>
            <p>
              <span>Ip address:</span> {userData.ip}
            </p>
            <p>
              <span>Job Description:</span>
              {userData.jobDescriptor}
            </p>
            <p>
              <span>Job Area:</span> {userData.jobArea}
            </p>
            <p>
              <span>Job Type:</span> {userData.jobType}
            </p>
          </div>
          {/* address */}
          <div className="userAddress">
            <h2>User Address</h2>
            <h3>
              {userCompany.name} {userCompany.suffix}
            </h3>
            <p>
              <span>City:</span> {userAddress.city}
            </p>
            <p>
              <span>Country:</span> {userAddress.country}
            </p>
            <p>
              <span>State:</span> {userAddress.state}
            </p>
            <p>
              <span>Street Address:</span> {userAddress.streetAddress}
            </p>
            <p>
              <span>Zip:</span> {userAddress.zipCode}
            </p>
          </div>
        </div>
      }

      <div className="searchWrapper">
        {visitedUsers.length !== 0 && <h2>Search history</h2>}
        {visitedUsers.map((user) => {
          return (
            <a
              href="#top"
              onClick={() => {
                setUserId(user.id);
              }}
            >
              {user.name + " > "}
            </a>
          );
        })}
      </div>

      <h2>User Friends</h2>
      <div className="cardsWrapper">
        {data.map((friend, index) => {
          if (index + 1 === data.length) {
            return (
              <a href="#top">
                <div
                  className="card"
                  key={friend.id}
                  ref={lastElement}
                  onClick={() => {
                    setVisitedUsers((prev) => [
                      ...prev,
                      {
                        name:
                          friend.prefix +
                          " " +
                          friend.name +
                          " " +
                          friend.lastName,
                        id: friend.id,
                      },
                    ]);
                    setUserId(friend.id);
                  }}
                >
                  <img className="img" src={friend.imageUrl} alt="user image" />
                  <h3>
                    <span>{friend.prefix}</span>
                    <span>{friend.name}</span>
                    <span>{friend.lastName}</span>
                  </h3>
                  <h4>{friend.title}</h4>
                </div>
              </a>
            );
          } else {
            return (
              <a href="#top">
                <div
                  className="card"
                  key={friend.id}
                  onClick={() => {
                    setVisitedUsers((prev) => [
                      ...prev,
                      {
                        name:
                          friend.prefix +
                          " " +
                          friend.name +
                          " " +
                          friend.lastName,
                        id: friend.id,
                      },
                    ]);
                    setUserId(friend.id);
                  }}
                >
                  <img className="img" src={friend.imageUrl} alt="user image" />
                  <h3>
                    <span>{friend.prefix}</span>
                    <span>{friend.name}</span>
                    <span>{friend.lastName}</span>
                  </h3>
                  <h4>{friend.title}</h4>
                </div>
              </a>
            );
          }
        })}
      </div>
    </div>
  );
}
