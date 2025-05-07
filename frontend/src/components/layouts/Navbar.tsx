import { useContext, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import CharAvatar from "../Cards/CharAvatar";
import useUserAuth from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export interface CommonProps {
  activeMenu: string;
}

const Navbar = ({ activeMenu }: CommonProps) => {
  useUserAuth();

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  if (!userContext) {
    throw new Error("User Context does not exist");
  }

  const { user, clearUser } = userContext;

  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="w-screen flex gap-5 bg-white fixed border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-6  top-0 z-30 shadow shadow-fuchsia-200">
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-mono font-bold text-black">
          <span className="text-purple-500">EXPENSE</span>💰TRACKER
        </h2>
        <div className="me-8">
          <div className="flex items-center gap-8">
            <button
              className="add-btn bg-red-400! text-white! hover:bg-red-500!"
              onClick={() => {
                localStorage.clear();

                clearUser();
                navigate("/login");
              }}
            >
              Logout
            </button>
            {user?.profileImageUrl ? (
              <img
                src={user?.profileImageUrl || ""}
                alt="Profile Image"
                className="size-20 bg-slate-400 rounded-full"
              />
            ) : (
              <CharAvatar
                fullName={user?.fullName!}
                size={"size-9"}
                style="text p-0! m-0!"
              />
            )}
          </div>
        </div>
      </div>
      {openSideMenu && (
        <div className="fixed top-[66px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
