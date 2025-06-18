import useAxios from "@/api/axiosInstance";
import { useEffect, useState } from "react";
import Intro from "../Zoner/Intro";

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
      } catch (err) {
        navigate("/zone/login");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Intro />;
  }

  return children;
};

export default LoadingScreen;
