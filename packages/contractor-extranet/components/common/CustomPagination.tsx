import React, { useState } from 'react';
import { Pagination, Box, Typography} from '@mui/material';

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

type PaginationProps = {
  pagination: Pagination;
  onChange: (page: number) => void;
};

const CustomPagination: React.FC<PaginationProps> = ({
  pagination,
  onChange,
}) => {
  const [currentPage, setCurrentPage] = useState(pagination.page);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    onChange(value);
  };

  const getCurrentPageTotal = (pagination: Pagination): string => {
    const currentPageTotal = pagination.total - (pagination.pageSize * (pagination.page - 1));
    return `${currentPageTotal > pagination.pageSize ? pagination.pageSize : currentPageTotal} / ${pagination.total}`;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Typography variant="body2" color="secondary.main">
          {getCurrentPageTotal(pagination)} résultats de recherche affichés
        </Typography>
        <Pagination count={pagination.pageCount} page={currentPage} onChange={handlePageChange} color="secondary" sx={{ padding: '0 16px 16px 0'}}/>
    </Box>
  );
};

export default CustomPagination;
