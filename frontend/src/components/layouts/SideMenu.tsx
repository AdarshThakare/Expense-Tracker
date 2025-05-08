import { useContext } from "react";
import { CommonProps } from "./Navbar";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }: CommonProps) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("User Context does not exist");
  }

  const { user, clearUser } = userContext;

  const navigate = useNavigate();

  const handleClick = (route: string) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-50 md:w-64 md:pt-14 h-[100vh] bg-white border-r border-gray-200/50 fixed  z-20 shadow-sm shadow-gray-200">
      <div className="flex md:flex-col items-center justify-center gap-4 md:gap-3 pt-6 md:pt-10 mb-8 me-3">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="size-14 md:size-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName!}
            size={"size-12 md:size-20"}
            style="text-3xl"
          />
        )}
        <h5 className="w-[30%] md:w-full md:text-center text-gray-950 fond-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={index}
          className={`w-full flex items-center gap-3 md:gap-4 text-sm md:text-[16px]  ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 ps-6 rounded-tl-lg rounded-bl-lg my-1 md:my-2 `}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
