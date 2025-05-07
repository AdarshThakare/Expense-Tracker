import { ChangeEvent, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  type: string;
  labelclassName?: string;
  inputclassName?: string;
}

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type,
  labelclassName,
  inputclassName,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className={`text-[16px]  text-slate-800 ${labelclassName}`}>
        {label}
      </label>
      <div className={`input-box  ${inputclassName}`}>
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={`w-full h-full outline-none `}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                onClick={() => {
                  toggleShowPassword();
                }}
                className="text-primary cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => {
                  toggleShowPassword();
                }}
                size={22}
                className="text-primary cursor-pointer"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
