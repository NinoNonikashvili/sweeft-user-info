import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchUserInfo(userId) {
  const [userData, setData] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [userCompany, setUserCompany] = useState([]);
  const [userError, setError] = useState(false);

  //fetch data in useEffect
  useEffect(() => {
    setError(false);
    axios({
      method: "GET",
      url: `https://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`,
    })
      .then((res) => {
        console.log("user info " + res);
        setData(res.data);
        setUserAddress(res.data.address);
        setUserCompany(res.data.company);
      })
      .catch((e) => {
        setError(true);
      });
  }, [userId]);

  return { userData, userAddress, userCompany, userError };
}
