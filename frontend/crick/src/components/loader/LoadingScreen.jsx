import { useEffect, useState } from "react";
import Intro from "../Zoner/Intro";

const LoadingScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Intro />;

  return children;
};

export default LoadingScreen;
