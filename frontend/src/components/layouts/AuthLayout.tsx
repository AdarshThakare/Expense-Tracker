import { ReactNode } from "react";
import finlogin from "../../assets/images/finlogin.png";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row">
      <div className="hidden md:block w-[60vw] h-screen bg-cover bg-no-repeat bg-center overflow-hidden relative">
        <img src={finlogin} alt="Login hero image" className="size-full" />
      </div>
      <div className="w-screen h-screen md:w-[60vw] ps-12 pt-8 pb-12">
        <h2 className="text-2xl font-mono font-bold text-black">
          <span className="text-purple-500">EXPENSE</span>💰TRACKER
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
