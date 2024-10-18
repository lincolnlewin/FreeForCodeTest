import React from 'react';

/**
 * Pagination Component
 * This component renders pagination controls for navigating through a list of items.
 *
 * @param {Object} pagination - An object containing pagination data such as the current page and page URLs.
 * @param {Function} handlePageChange - Callback function to handle page changes when a page number or button is clicked.
 */
const Pagination = ({ pagination, handlePageChange }) => {
    /**
     * Generates an array of page numbers for rendering.
     * The range of page numbers is determined based on the current page.
     *
     * @returns {Array} An array of page numbers to be displayed.
     */
    const generatePageNumbers = () => {
        let pages = [];
        const startPage = Math.max(pagination.current_page - 2, 1); // Start page number
        const endPage = Math.min(startPage + 4, pagination.last_page); // End page number

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i); // Add page number to the array
        }
        return pages; // Return the array of page numbers
    };

    const pageNumbers = generatePageNumbers(); // Get the array of page numbers

    return (
        <div className="mt-4 flex justify-center items-center space-x-2">
            {/* Previous Button */}
            {pagination.prev_page_url && (
                <button
                    className="px-4 py-2 bg-freefor text-white rounded"
                    onClick={() => handlePageChange(pagination.current_page - 1)} // Go to the previous page
                >
                    Previous
                </button>
            )}

            {/* Page Numbers */}
            {pageNumbers.map((page) => (
                <button
                    key={page} // Unique key for each button
                    className={`px-4 py-2 rounded ${
                        page === pagination.current_page
                            ? 'bg-freefor-dark text-white' // Highlight current page
                            : 'bg-gray-200 text-gray-700' // Style for other pages
                    }`}
                    onClick={() => handlePageChange(page)} // Change page on click
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            {pagination.next_page_url && (
                <button
                    className="px-4 py-2 bg-freefor text-white rounded"
                    onClick={() => handlePageChange(pagination.current_page + 1)} // Go to the next page
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
