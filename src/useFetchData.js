import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchData(pageNum) {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //fetch data in useEffect
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageNum}/20`,
    })
      .then((res) => {
        console.log(res);
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

  return { loading, data, hasMore };
}
