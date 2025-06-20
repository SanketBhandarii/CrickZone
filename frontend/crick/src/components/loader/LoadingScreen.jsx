import { useEffect, useState } from "react";
import Intro from "../Zoner/Intro";
import useAxios from "@/api/axiosInstance";

const LoadingScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [{ data }, execute] = useAxios(
    {
      method: "GET",
      url: `/api/home`,
      withCredentials: true,
    },
    { manual: true }
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await execute();
        if (res) {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        return;
      }
    };
    checkAuth();
  }, []);

  return loading ? <Intro /> : children;
};

export default LoadingScreen;
