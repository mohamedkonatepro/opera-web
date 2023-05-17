import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { getRealEstates } from "@/queries/realEstates";
import { useQuery } from "@tanstack/react-query";
import RealEstateListResponse from "@/types/RealEstateListResponse";
import RealEstateTable from "./RealEstateTable";
import CustomPagination from "./common/CustomPagination";
import RealEstate from "@/types/RealEstate";
import RealEstateFilter from "./RealEstateFilter";
import { getTenants } from "@/queries/tenants";
import Tenant from "@/types/Tenant";

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

const RealEstateFilterableList: React.FunctionComponent = () => {
  const [queryEnabled, setQueryEnabled] = useState(false);
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [buildingRefSearchQuery, setBuildingRefSearchQuery] = useState("");
  const [unitRefSearchQuery, setUnitRefSearchQuery] = useState("");
  const [tenantSearchQuery, setTenantSearchQuery] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<{
    address: string;
    postalCode: string;
    city: string;
  } | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<{
    firstname: string;
    lastname: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [pagination, setPagination] = useState<Pagination>();

  const handleAddressInputChange = (event: any, value: string) => {
    setSelectedAddress({ address: value, postalCode: value, city: value });
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

  const handleInputTenantChange = async (event: any, value: string) => {
    setSelectedTenant({ firstname: value, lastname: value })
    setTenantSearchQuery(value);
    if (value.length >= 2) {
      refetchTenantData();
      setQueryEnabled(true);
    } else {
      setQueryEnabled(false)
    }
  };

  useEffect(() => {
    if (
      selectedAddress ||
      buildingRefSearchQuery.length ||
      unitRefSearchQuery.length
    ) {
      setQueryEnabled(true);
    } else {
      setFilterEnabled(false);
    }
  }, [selectedAddress, buildingRefSearchQuery, unitRefSearchQuery]);
  const { isLoading: isRealEstateDataLoading, refetch } =
    useQuery<RealEstateListResponse>({
      queryKey: [
        "getRealEstates",
        selectedAddress?.address ?? "",
        buildingRefSearchQuery,
        unitRefSearchQuery,
        currentPage,
        pageSize,
        selectedTenant?.firstname ?? "",
        selectedTenant?.lastname ?? "",
      ],
      queryFn: ({ queryKey }) =>
        getRealEstates({
          address: queryKey[1] as string,
          buildingReference: queryKey[2] as string,
          unitReference: queryKey[3] as string,
          page: queryKey[4] as string,
          pageSize: queryKey[5] as string,
          firstnameTenant: queryKey[6] as string,
          lastnameTenant: queryKey[7] as string,
        }),
      enabled: queryEnabled,
      onSuccess: (data) => {
        setRealEstates(data?.data ?? []);
        setPagination(data?.meta?.pagination);
      },
    });

    const { isLoading: isTenantDataLoading, refetch: refetchTenantData } =
    useQuery<Tenant[]>({
      queryKey: ["getTenants"],
      queryFn: () =>
        getTenants({
          firstname: tenantSearchQuery,
          lastname: tenantSearchQuery
        }),
      enabled: queryEnabled,
      onSuccess: (data) => {
        setTenants(data)
      },
    });

  const handleAddressAutocompleteChange = (event: any, option: any) => {
    if (option) {
      const { address, postalCode, city } = option;
      setSelectedAddress({ address, postalCode, city });
    } else {
      setSelectedAddress(null);
    }
  };

  const handleTenantAutocompleteChange = (event: any, option: any) => {
    if (option) {
      const { firstname, lastname } = option;
      setSelectedTenant({ firstname, lastname });
    } else {
      setSelectedTenant(null);
    }
  };

  const handleClickFilter = async () => {
    setFilterEnabled(true);
    setPageSize(25);
    setCurrentPage(1);
    await refetch();
  };

  const handlePageChange = async (newPage: any) => {
    setPageSize(25);
    setCurrentPage(newPage);
  };
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={1} sx={{ paddingLeft: "32px" }}>
          <Typography variant="body2" color="secondary.main">
            Nouvelle commande
          </Typography>
          <Typography variant="h6" sx={{ marginTop: "8px" }}>
            Créer une commande à partir d&apos;une référence
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "8px" }}
          >
            Utilisez les filtres ci-dessous pour trouver un bien.
          </Typography>
        </Stack>
        <Stack spacing={4}>
          <RealEstateFilter
            isLoading={isRealEstateDataLoading}
            isTenantDataLoading={isTenantDataLoading}
            realEstatesData={realEstates}
            tenantsData={tenants}
            onAddressChange={handleAddressAutocompleteChange}
            onTenantChange={handleTenantAutocompleteChange}
            onAddressInputChange={handleAddressInputChange}
            onInputBuildingReferenceChange={handleInputBuildingReferenceChange}
            onInputUnitReferenceChange={handleInputUnitReferenceChange}
            onInputTenantChange={handleInputTenantChange}
            onFilterButtonClick={handleClickFilter}
            queryEnabled={queryEnabled}
          />
          {filterEnabled && realEstates.length > 0 && (
            <Stack spacing={4}>
              <RealEstateTable realEstates={realEstates} />
              {pagination && (
                <CustomPagination
                  pagination={pagination}
                  onChange={handlePageChange}
                />
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default RealEstateFilterableList;
