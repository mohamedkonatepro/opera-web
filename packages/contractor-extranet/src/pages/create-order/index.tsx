import CreateOrderStepper from "@/components/createOrder";
import { getRealEstate } from "@/queries/realEstates";
import { getServiceTypes } from "@/queries/serviceTypes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const CreateOrderStepperPage = () => {
  const router = useRouter();

  const { realEstateId } = router.query;

  const {
    data: serviceTypes,
    isLoading: isLoadingServiceTypes,
    isError: isErrorServiceTypes,
  } = useQuery({
    queryKey: ["serviceTypes"],
    queryFn: () => getServiceTypes(),
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

  if (isLoadingServiceTypes || (isLoadingRealEstate && !!realEstateId)) {
    return <div>Chargement...</div>;
  }

  if (isErrorServiceTypes || isErrorRealEstate) {
    return <div>Erreur</div>;
  }

  return (
    <CreateOrderStepper realEstate={realEstate} serviceTypes={serviceTypes} />
  );
};

export default CreateOrderStepperPage;
