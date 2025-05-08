import { FormEvent, useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api";
import { UserContext } from "../../context/userContext";
import finlogin from "../../assets/images/finlogin.png";
import { AnimatePresence, easeInOut, easeOut, motion } from "framer-motion";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext is not provided");
  }
  const { updateUser } = userContext;

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setError("Please return a valid email address.");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      setLoading(false);
      return;
    }

    setError("");

    //Login Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (error.response && error.response.data.message) {
        setError(error.respone.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            staggerChildren: 0.2,
            ease: easeInOut,
            duration: 0.5,
          }}
          className="ms-8 mt-10 md:mt-0 md:ms-12 w-[80%] h-fit md:h-full flex flex-col justify-start md:justify-center"
        >
          <h3 className="text-xl md:text-3xl font-semibold text-black">
            Welcome Back! 👋
          </h3>
          <p className="text-sm md:text-xl text-slate-700 mt-[5px] mb-10">
            Please enter your details to Login
          </p>

          <form onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <br />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="password"
              type="password"
            />

            {loading && (
              <p className="text-gray-500 text-xs md:text-sm mt-2 pb-2.5">
                Fetching details...
              </p>
            )}

            {!loading && error && (
              <p className="text-red-500 text-xs md:text-sm mt-2 pb-2.5">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary">
              LOGIN
            </button>

            <p className="text-sm md:text-[16px] text-slate-800 mt-3">
              Don't have an account?{" "}
              <Link className="font-medium text-primary underline" to="/signup">
                SignUp
              </Link>
            </p>
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: easeOut, delay: 1, duration: 0.3 }}
        >
          <img
            src={finlogin}
            alt="Login hero image"
            className="w-full md:hidden"
          />
        </motion.div>
      </AnimatePresence>
    </AuthLayout>
  );
};

export default Login;
