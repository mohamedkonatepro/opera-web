import { useState, useEffect } from "react";
import { Box, Stack, Typography } from '@mui/material';
import { getRealEstates } from "@/queries/realEstates";
import { useQuery } from "@tanstack/react-query";
import ContainedButton from "./common/buttons/ContainedButton";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AutocompleteAddress from "./autocomplete/AutocompleteAddress";
import AutocompleteBuildingReference from "./autocomplete/AutocompleteBuildingReference";
import AutocompleteUnitReference from "./autocomplete/AutocompleteUnitReference";
import RealEstate from "@/types/realEstates";

interface RealEstateFilterProps {
  isLoading: boolean;
  realEstatesData: RealEstate[];
  onAddressChange: (event: any, value: string) => void;
  onAddressInputChange: (event: any, value: string) => void;
  onInputBuildingReferenceChange: (event: any, value: string) => void;
  onInputUnitReferenceChange: (event: any, value: string) => void;
  onFilterButtonClick: () => void;
  queryEnabled: boolean;
}
const RealEstateFilter: React.FunctionComponent<RealEstateFilterProps> = ({
  isLoading,
  realEstatesData,
  onAddressChange,
  onAddressInputChange,
  onInputBuildingReferenceChange,
  onInputUnitReferenceChange,
  onFilterButtonClick,
  queryEnabled,
}) => {
  return (
        <Stack direction='row'>
          <AutocompleteAddress isLoading={isLoading} realEstatesData={realEstatesData} onAddressChange={onAddressChange} onInputChange={onAddressInputChange} />
          <AutocompleteBuildingReference isLoading={isLoading} realEstatesData={realEstatesData} onInputChange={onInputBuildingReferenceChange} />
          <AutocompleteUnitReference isLoading={isLoading} realEstatesData={realEstatesData} onInputChange={onInputUnitReferenceChange} />

          <ContainedButton
            disabled={queryEnabled ? false : true}
            type="submit"
            onClick={onFilterButtonClick}
            color="secondary"
            padding="small"
            width="140px"
          >
            <SearchTwoToneIcon sx={{ marginRight: '5px' }} />
            Rechercher
          </ContainedButton>
        </Stack>
  );
};

export default RealEstateFilter;
