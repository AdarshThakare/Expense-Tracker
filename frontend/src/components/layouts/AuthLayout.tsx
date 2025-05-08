import { ReactNode } from "react";
import finlogin from "../../assets/images/finlogin.png";
import { easeInOut, easeOut, motion } from "framer-motion";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row">
      <motion.div
        initial={{ x: "-60vw", opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ ease: easeOut, duration: 0.4 }}
        className="hidden md:block w-[60vw] h-screen bg-cover bg-no-repeat bg-center overflow-hidden relative"
      >
        <img src={finlogin} alt="Login hero image" className="size-full" />
      </motion.div>
      <div className="w-screen h-screen md:w-[60vw] pt-8 pb-12">
        <motion.h2
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ease: easeInOut }}
          className="ms-12 text-2xl font-mono font-bold text-black"
        >
          <span className="text-purple-500">EXPENSE</span>💰TRACKER
        </motion.h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
