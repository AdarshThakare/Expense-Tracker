import { ReactNode, useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({
  children,
  activeMenu,
}: {
  children: ReactNode;
  activeMenu: string;
}) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("User Context not found!");
  }

  const { user } = userContext;
  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden px-3">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow ml-0.5 min-[1080px]:ml-66 min-[1080px]:mr-5 max-md:mt-10 md:mt-17">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
