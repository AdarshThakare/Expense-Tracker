import { getInitials } from "../../utils/helper";

interface CharAvatarProps {
  fullName: string;
  size: string;
  style: string;
}

const CharAvatar = ({ fullName, size, style }: CharAvatarProps) => {
  return (
    <div
      className={`${size || "size-12"} ${
        style || ""
      } flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-200`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
