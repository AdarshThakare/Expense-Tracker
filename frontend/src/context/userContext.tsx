import { createContext, ReactNode, useState } from "react";

interface UserProps {
  fullName: string;
  email: string;
  userId: string;
  password: string;
  profileImageUrl: string;
}

interface createContextProps {
  user: UserProps | null;
  updateUser: (userData: string) => void;
  clearUser: () => void;
}

export const UserContext = createContext<createContextProps | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const updateUser = (userData: any) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
