import { TextField, Autocomplete } from '@mui/material';
import realEstateRemoveDuplicates from "@/utils/realEstateRemoveDuplicates";
import RealEstate from '@/types/realEstates';

interface AutocompleteBuildingReferenceProps {
  realEstatesData: RealEstate[];
  isLoading: boolean;
  onInputChange: (event: any, value: string) => void;
}

const AutocompleteBuildingReference: React.FunctionComponent<AutocompleteBuildingReferenceProps> = ({ realEstatesData, isLoading, onInputChange }) => {
  return (
    <Autocomplete
    options={realEstateRemoveDuplicates(realEstatesData, 'buildingReference')}
    loading={isLoading}
    getOptionLabel={(option) => {
      if (typeof option === 'string') {
        return option;
      }
      return option.buildingReference;
    } }
    renderInput={(params) => (
      <TextField
        placeholder="Réf. immeuble"
        {...params}
        type="text"
        name="building-reference"
        color="secondary"
        sx={{ width: "121.25px", marginLeft: '12px' }} />
    )}
    freeSolo
    onInputChange={onInputChange} />
  );
};

export default AutocompleteBuildingReference;
