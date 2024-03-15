import { useEffect, useState } from "react";
import axios from "axios";
import { userRequest } from "../../src/requestMethods";

const useFetch = (url) => {
  console.log("fetchData",url);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //const apiURL = "http://localhost:8800/api";
  useEffect(() => {
   // 
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await userRequest.get(url);
        console.log("res.data.fetch",res.data);
        setData(res.data);
      } catch (err) {
        setError(err);
        console.log("err",err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    console.log("reFetch");
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
