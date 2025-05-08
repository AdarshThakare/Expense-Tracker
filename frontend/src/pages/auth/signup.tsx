import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
import { easeInOut, easeOut, motion } from "framer-motion";
import finlogin from "../../assets/images/finlogin.png";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<any>("");

  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("User context not found!");
  }

  const { updateUser } = userContext;

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    let profileImageUrl = "";
    e.preventDefault();
    setLoading(true);

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //SignUp API Call
    try {
      // Upload Image
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
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
          Create an Account
        </h3>
        <p className="text-sm md:text-xl text-slate-700 mt-[5px] mb-8">
          Join us today by entering your details below.{" "}
        </p>

        <form onSubmit={handleSignup}>
          <div className="grid grid-cols-1  gap-4">
            <ProfilePhotoSelector
              profilePic={profilePic}
              setProfilePic={setProfilePic}
            />
            <Input
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              label="Full Name"
              placeholder="Jon Snow"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
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
          </div>
          <button type="submit" className="btn-primary">
            SIGNUP
          </button>

          <p className="text-sm md:text-[16px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
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
    </AuthLayout>
  );
};

export default SignUp;
