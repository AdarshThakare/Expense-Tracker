import { useRef, useState } from "react";
import { LuUser, LuTrash, LuUpload } from "react-icons/lu";

interface ProfilePicProps {
  profilePic: string | null;
  setProfilePic: (file: string | null) => void;
}

const ProfilePhotoSelector = ({
  profilePic,
  setProfilePic,
}: ProfilePicProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setProfilePic(file);

      //generate the preview URL from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!profilePic ? (
        <div className="size-30 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="size-14 text-primary" />
          <button
            type="button"
            className="size-10 flex items-center justify-center rounded-full text-white bg-primary absolute -bottom-1 -right-1"
            onClick={onChooseFile}
          >
            <LuUpload className="size-5" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl || ""}
            alt="profile photo"
            className="size-30 rounded-full object-cover"
          />
          <button
            type="button"
            className="size-10 flex items-center justify-center bg-red-500 text-white rounded-full absolute -right-1 -bottom-1  "
            onClick={handleRemoveImage}
          >
            <LuTrash className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
