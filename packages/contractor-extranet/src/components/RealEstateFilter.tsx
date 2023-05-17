import { Stack } from "@mui/material";
import ContainedButton from "./common/buttons/ContainedButton";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import AutocompleteAddress from "./autocomplete/AutocompleteAddress";
import AutocompleteBuildingReference from "./autocomplete/AutocompleteBuildingReference";
import AutocompleteUnitReference from "./autocomplete/AutocompleteUnitReference";
import RealEstate from "@/types/RealEstate";
import AutocompleteTenant from "./autocomplete/AutocompleteTenant";
import Tenant from "@/types/Tenant";

interface RealEstateFilterProps {
  isLoading: boolean;
  isTenantDataLoading: boolean;
  realEstatesData: RealEstate[];
  onAddressChange: (event: any, value: string) => void;
  onTenantChange: (event: any, value: string) => void;
  onAddressInputChange: (event: any, value: string) => void;
  onInputBuildingReferenceChange: (event: any, value: string) => void;
  onInputUnitReferenceChange: (event: any, value: string) => void;
  onInputTenantChange: (event: any, value: string) => void;
  onFilterButtonClick: () => void;
  queryEnabled: boolean;
  tenantsData: Tenant[];
}
const RealEstateFilter: React.FunctionComponent<RealEstateFilterProps> = ({
  isLoading,
  isTenantDataLoading,
  realEstatesData,
  tenantsData,
  onAddressChange,
  onTenantChange,
  onAddressInputChange,
  onInputBuildingReferenceChange,
  onInputUnitReferenceChange,
  onInputTenantChange,
  onFilterButtonClick,
  queryEnabled,
}) => {
  return (
    <Stack direction="row" sx={{ paddingLeft: "32px" }}>
      <AutocompleteAddress
        isLoading={isLoading}
        realEstatesData={realEstatesData}
        onAddressChange={onAddressChange}
        onInputChange={onAddressInputChange}
      />
      <AutocompleteBuildingReference
        isLoading={isLoading}
        realEstatesData={realEstatesData}
        onInputChange={onInputBuildingReferenceChange}
      />
      <AutocompleteUnitReference
        isLoading={isLoading}
        realEstatesData={realEstatesData}
        onInputChange={onInputUnitReferenceChange}
      />
      <AutocompleteTenant
        isLoading={isTenantDataLoading}
        tenantsData={tenantsData}
        onInputChange={onInputTenantChange}
        onTenantChange={onTenantChange}
      />
      <ContainedButton
        disabled={queryEnabled ? false : true}
        type="submit"
        onClick={onFilterButtonClick}
        color="secondary"
        padding="small"
        sx={{ width: "140px" }}
      >
        <SearchTwoToneIcon sx={{ marginRight: "5px" }} />
        Rechercher
      </ContainedButton>
    </Stack>
  );
};

export default RealEstateFilter;
