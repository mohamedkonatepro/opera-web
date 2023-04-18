import { TextField, Autocomplete } from '@mui/material';
import realEstateRemoveDuplicates from "@/utils/realEstateRemoveDuplicates";
import RealEstateListResponse from "@/types/realEstateListResponse";

interface AutocompleteUnitReferenceProps {
  realEstatesData: RealEstateListResponse['data'];
  isLoading: boolean;
  onInputChange: (event: any, value: string) => void;
}

const AutocompleteUnitReference: React.FunctionComponent<AutocompleteUnitReferenceProps> = ({ realEstatesData, isLoading, onInputChange }) => {
  return (
    <Autocomplete
        options={realEstateRemoveDuplicates(realEstatesData, 'unitReference')}
        loading={isLoading}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          return option.attributes.unitReference;
        } }
        renderInput={(params) => (
          <TextField
            placeholder="N° Lot"
            {...params}
            type="text"
            name="unit-reference"
            color="secondary"
            sx={{ width: "121.25px", margin: '0 12px 0 12px' }} />
        )}
        freeSolo
        onInputChange={onInputChange} />
  );
};

export default AutocompleteUnitReference;
