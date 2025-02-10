import React from 'react';
import { Pagination as MUIPagination, Stack, styled } from '@mui/material';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const StyledPagination = styled(MUIPagination)(({ theme }) => ({
    '& .MuiPagination-ul': {
        justifyContent: 'center', // Center the pagination items
    },
    '& .MuiPaginationItem-root': {
        borderRadius: theme.spacing(1), // Rounded corners for each item
        margin: `0 ${theme.spacing(0.5)}`, // Adjust spacing between items
        color: theme.palette.primary.main, // Use primary color for text
        '&:hover': {
            backgroundColor: theme.palette.action.hover, // Softer hover effect
        },
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main, // Primary color for selected item
            color: theme.palette.primary.contrastText, // White text for selected item
            '&:hover': {
                backgroundColor: theme.palette.primary.dark, // Darker shade on hover when selected
            },
        },
    },
}));

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    };

    return (
        <Stack alignItems="center" mt={3}>
            <StyledPagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                color="primary"
                showFirstButton
                showLastButton
            />
        </Stack>
    );
};

export default Pagination;
