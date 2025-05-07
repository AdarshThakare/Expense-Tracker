import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/api";

const useUserAuth = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  if (!userContext) {
    throw new Error("User Context does not exist");
  }

  const { user, updateUser, clearUser } = userContext;

  useEffect(() => {
    if (user) return;
    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (isMounted && response.data) {
          updateUser(response.data);
          console.log(response.data);
        }
      } catch (err) {
        console.error(`Failed to fetch user info : ${err}`);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };
    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);
};

export default useUserAuth;
