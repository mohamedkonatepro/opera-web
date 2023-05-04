import { getContractor } from "@/queries/contractors";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, createContext, useState } from "react";

type ContractorContextValues = {
  contractor: any;
};

type ContractContextType = {
  contractor: any;
  setContractor: (contractor: any) => void;
};

const ContractorContext = createContext<ContractContextType>({
  contractor: null,
  setContractor: () => {},
});

const ContractorContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { contractorId } = router.query;

  const [contractor, setContractor] = useState<any>(null);
  const { isLoading } = useQuery({
    enabled: !!contractorId,
    queryKey: ["contractors", contractorId],
    queryFn: () => getContractor(contractorId as string),
    onSuccess: (data) => {
      setContractor(data);
    },
  });

  if (!contractorId) return <>{children}</>;

  if (isLoading) return <div>Chargement...</div>;
  if (!contractor) return <div>Erreur</div>;

  return (
    <ContractorContext.Provider value={{ contractor, setContractor }}>
      {children}
    </ContractorContext.Provider>
  );
};

export { ContractorContext, ContractorContextProvider };
