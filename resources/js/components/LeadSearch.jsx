import React from 'react';

/**
 * LeadSearch Component
 * This component renders a search input and button for searching leads.
 *
 * @param {Function} onSearch - Callback function to handle input changes in the search field.
 * @param {string} searchTerm - The current value of the search input.
 * @param {Function} onSubmit - Callback function to handle the submission of the search form.
 */
const LeadSearch = ({ onSearch, searchTerm, onSubmit }) => {
    /**
     * Handles changes in the search input field.
     * @param {Object} e - The event object.
     */
    const handleSearchChange = (e) => {
        onSearch(e.target.value); // Call the onSearch function with the new input value
    };

    /**
     * Handles the submission of the search form.
     * Prevents the default form submission and triggers the search.
     * @param {Object} e - The event object.
     */
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        onSubmit(searchTerm); // Trigger search with the current term
    };

    return (
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
            <input
                type="text"
                value={searchTerm} // Set the input value to the current search term
                onChange={handleSearchChange} // Call handleSearchChange on input change
                className="p-2 border rounded"
                placeholder="Search by name or email" // Placeholder text for the input
            />
            <button
                type="submit" // Set button type to submit
                className="px-4 py-2 bg-freefor text-white rounded"
            >
                Search
            </button>
        </form>
    );
};

export default LeadSearch;
