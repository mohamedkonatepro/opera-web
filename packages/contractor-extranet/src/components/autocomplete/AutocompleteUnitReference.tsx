import { TextField, Autocomplete } from "@mui/material";
import realEstateRemoveDuplicates from "@/utils/realEstateRemoveDuplicates";
import RealEstate from "@/types/RealEstate";

interface AutocompleteUnitReferenceProps {
  realEstatesData: RealEstate[];
  isLoading: boolean;
  onInputChange: (event: any, value: string) => void;
}

const AutocompleteUnitReference: React.FunctionComponent<
  AutocompleteUnitReferenceProps
> = ({ realEstatesData, isLoading, onInputChange }) => {
  return (
    <Autocomplete
      options={realEstateRemoveDuplicates(realEstatesData, "unitReference")}
      loading={isLoading}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        return option.unitReference;
      }}
      renderInput={(params) => (
        <TextField
          placeholder="N° Lot"
          {...params}
          type="text"
          name="unit-reference"
          color="secondary"
          sx={{ width: "121.25px", marginLeft: "12px" }}
        />
      )}
      freeSolo
      onInputChange={onInputChange}
    />
  );
};

export default AutocompleteUnitReference;
