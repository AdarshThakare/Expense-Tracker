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

const SignUp = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
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
    e.preventDefault();
    let profileImageUrl = "";

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
      } else {
        setError("Something went wrong. Please try again later");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[80%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-3xl font-semibold text-black">Create an Account</h3>
        <p className="text-xl text-slate-700 mt-[5px] mb-8">
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
          </div>
          {error && <p className="text-red-500 text-sm pb-1 pt-3">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGNUP
          </button>

          <p className="text-[16px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
