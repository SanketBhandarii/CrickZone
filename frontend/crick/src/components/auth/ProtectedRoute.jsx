import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../api/axiosInstance";
import { Context } from "../../store/Context";

const ProtectedRoute = ({ children }) => {
  const { setUser, setTimeToShowHeader } = useContext(Context);

  const navigate = useNavigate();

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
        if (res?.data?.msg === "Please do login!") {
          setTimeToShowHeader(false);
          navigate("/zone/login");
        } else {
          setTimeToShowHeader(true);
          setUser(res.data.username);
        }
      } catch (err) {
        navigate("/zone/login");
      }
    };

    checkAuth();
  }, []);

  return children;
};

export default ProtectedRoute;
