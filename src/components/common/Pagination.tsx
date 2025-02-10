import React from 'react';
import { Pagination as MUIPagination, Stack, styled } from '@mui/material';

/**
 * @description Interface defining the props for the Pagination component.
 * @property {number} currentPage - The current page number.
 * @property {number} totalPages - The total number of pages.
 * @property {Function} onPageChange - Callback function to handle page changes.
 */
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

/**
 * @description Styled MUI Pagination component with custom styling.
 */
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

/**
 * @description Pagination Component: A component for navigating between pages.
 *
 * This component displays a pagination interface using Material-UI's Pagination component.
 * It allows users to navigate between different pages of content.
 *
 * @component
 * @param {PaginationProps} props - The props for the Pagination component.
 * @returns {JSX.Element} - The Pagination component.
 */
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    /**
     * @description Handles the page change event.
     * @function handlePageChange
     * @param {React.ChangeEvent<unknown>} event - The change event.
     * @param {number} value - The new page number.
     */
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    };

    return (
        <Stack alignItems="center" mt={3}>
            {/* Styled MUI Pagination component */}
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
