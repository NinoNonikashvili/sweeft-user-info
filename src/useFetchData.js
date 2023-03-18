import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchData(pageNum, friends = false, userId = 0) {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = friends
    ? `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${pageNum}/20`
    : `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageNum}/20`;

  //fetch data in useEffect
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        setData((prev) => {
          return [...prev, ...res.data.list];
        });
        setHasMore(res.data.pagination.nextPage !== null);
        setLoading(false);
      })
      .catch((e) => {
        console.log("error " + e);
        setError(true);
      });
  }, [pageNum]);

  return { loading, data, hasMore, error };
}
