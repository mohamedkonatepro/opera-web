import { getMyUser } from "@/queries/users";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, createContext, useState } from "react";

type UserContextValues = {
  user: any;
};

export type UserContextType = {
  user: any;
  setUser: (user: any) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const { isLoading } = useQuery({
    queryKey: ["me"],
    onSuccess: (data) => {
      setUser(data);
    },
  });

  if (isLoading) return <div>Chargement...</div>;
  if (!user) return <div>Erreur</div>;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
