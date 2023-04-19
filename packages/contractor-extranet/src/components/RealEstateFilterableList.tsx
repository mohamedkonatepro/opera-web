import { useState, useEffect } from "react";
import { Box, Stack } from '@mui/material';
import { getRealEstates } from "@/queries/realEstates";
import { useQuery } from "@tanstack/react-query";
import RealEstateListResponse from "@/types/realEstateListResponse";
import RealEstateTable from "./RealEstateTable";
import CustomPagination from "./common/CustomPagination";
import RealEstate from "@/types/realEstates";
import RealEstateFilter from "./RealEstateFilter";

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

const RealEstateFilterableList: React.FunctionComponent = () => {
  const [queryEnabled, setQueryEnabled] = useState(false);
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [buildingRefSearchQuery, setBuildingRefSearchQuery] = useState('');
  const [unitRefSearchQuery, setUnitRefSearchQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<{ address: string, postalCode: string, city: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
  const [pagination, setPagination] = useState<Pagination>();

  const handleAddressInputChange = (event: any, value: string) => {
    setQueryEnabled(value.length >= 5);
  };

  const handleInputBuildingReferenceChange = (event: any, value: string) => {
    setBuildingRefSearchQuery(value);
    setQueryEnabled(value.length >= 1);
  };

  const handleInputUnitReferenceChange = (event: any, value: string) => {
    setUnitRefSearchQuery(value);
    setQueryEnabled(value.length >= 1);
  };

  useEffect(() => {
    if (selectedAddress || buildingRefSearchQuery.length || unitRefSearchQuery.length) {
      setQueryEnabled(true)
    } else {
      setFilterEnabled(false)
    }
  }, [selectedAddress, buildingRefSearchQuery, unitRefSearchQuery]);
  const { isLoading: isRealEstateDataLoading, refetch } = useQuery<RealEstateListResponse>({
    queryKey: ['getRealEstates', selectedAddress?.address ?? '', buildingRefSearchQuery, unitRefSearchQuery, currentPage, pageSize],
    queryFn: ({ queryKey }) => getRealEstates({ 
      address: queryKey[1] as string,
      buildingReference: queryKey[2] as string,
      unitReference: queryKey[3] as string,
      page: queryKey[4] as string,
      pageSize: queryKey[5] as string}),
    enabled: queryEnabled,
    onSuccess: (data) => {
      setRealEstates(data?.data ?? []);
      setPagination(data?.meta?.pagination);
    }
  });

  const handleAddressAutocompleteChange = (event: any, option: any) => {
    if (option) {
      const { address, postalCode, city } = option.attributes;
      setSelectedAddress({ address, postalCode, city });
    } else {
      setSelectedAddress(null);
    }
  };
  
  const handleClickFilter = async () => {
    setFilterEnabled(true);
    setPageSize(25)
    setCurrentPage(1)
    await refetch();
  };

  const handlePageChange = async (newPage: any) => {
    setPageSize(25)
    setCurrentPage(newPage);
  };
  return (
    <Box
      sx={{
        margin: "24px 32px 24px 32px",
        display: "flex"
      }}
    >
      <Stack spacing={3}>
        <RealEstateFilter isLoading={isRealEstateDataLoading}
          realEstatesData={realEstates}
          onAddressChange={handleAddressAutocompleteChange}
          onAddressInputChange={handleAddressInputChange}
          onInputBuildingReferenceChange={handleInputBuildingReferenceChange}
          onInputUnitReferenceChange={handleInputUnitReferenceChange}
          onFilterButtonClick={handleClickFilter}
          queryEnabled={queryEnabled}
        />
        {filterEnabled && realEstates.length > 0 && (
          <Stack spacing={4}>
            <RealEstateTable realEstates={realEstates}/>
            { pagination && <CustomPagination pagination={pagination} onChange={handlePageChange} />}
          </Stack>
        )}
        </Stack>
    </Box>
  );
};

export default RealEstateFilterableList;
