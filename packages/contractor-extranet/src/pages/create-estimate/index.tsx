import CreateEstimateStepper from "@/components/createEstimate";
import { UserContext } from "@/context/user";
import { getRealEstate } from "@/queries/realEstates";
import { getServiceTypes } from "@/queries/serviceTypes";
import { getServices } from "@/queries/services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const CreateEstimateStepperPage = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const { realEstateId, services } = router.query;

  const {
    data: serviceTypes,
    isLoading: isLoadingServiceTypes,
    isError: isErrorServiceTypes,
  } = useQuery({
    queryKey: ["serviceTypes"],
    queryFn: () => getServiceTypes(),
  });

  const {
    data: servicesData,
    isLoading: isLoadingServices,
    isError: isErrorServices,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServices(services as string),
  });

  const {
    data: realEstate,
    isLoading: isLoadingRealEstate,
    isError: isErrorRealEstate,
  } = useQuery({
    queryKey: ["getRealEstate", realEstateId],
    enabled: !!realEstateId,
    queryFn: () => getRealEstate(realEstateId as string),
  });

  if (
    isLoadingServices ||
    (isLoadingRealEstate && !!realEstateId) ||
    isLoadingServiceTypes
  ) {
    return <div>Chargement...</div>;
  }

  if (isErrorServices || isErrorRealEstate || isErrorServiceTypes) {
    return <div>Erreur</div>;
  }

  return (
    <CreateEstimateStepper
      realEstate={realEstate}
      servicesData={servicesData}
      serviceTypes={serviceTypes}
      contractor={userContext.user.contractor}
    />
  );
};

export default CreateEstimateStepperPage;
