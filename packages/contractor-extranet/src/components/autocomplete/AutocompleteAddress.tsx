import { TextField, InputAdornment, Autocomplete } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import realEstateRemoveDuplicates from "@/utils/realEstateRemoveDuplicates";
import RealEstate from '@/types/realEstates';

interface AutocompleteAddressProps {
  realEstatesData: RealEstate[];
  isLoading: boolean;
  onAddressChange: (event: any, option: any) => void;
  onInputChange: (event: any, value: string) => void;
}

const AutocompleteAddress: React.FunctionComponent<AutocompleteAddressProps> = ({ realEstatesData, isLoading, onAddressChange, onInputChange }) => {
  return (
    <Autocomplete
      options={realEstateRemoveDuplicates(realEstatesData, 'address')}
      loading={isLoading}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        return `${option.address} ${option.postalCode} ${option.city}`;
      } }
      onChange={onAddressChange}
      renderInput={(params) => (
        <TextField
          placeholder="Adresse"
          {...params}
          type="text"
          name="address"
          color="secondary"
          sx={{ width: "300px" }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            )
          }} />
      )}
      freeSolo
      onInputChange={onInputChange} />
  );
};

export default AutocompleteAddress;
