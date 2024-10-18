import React from 'react';

/**
 * LeadForm Component
 * This component renders a form for adding or editing a lead.
 *
 * @param {Object} form - The current lead data, including id, name, email, phone, and lead_status_id.
 * @param {Array} leadStatuses - The list of lead statuses to populate the dropdown.
 * @param {Function} onSubmit - Callback function to handle form submission with the lead data.
 * @param {Function} onInputChange - Callback function to handle input changes in the form fields.
 */
const LeadForm = ({ form, leadStatuses, onSubmit, onInputChange }) => {
    /**
     * Handles the form submission event.
     * Prevents default behavior and calls the onSubmit callback with the current form data.
     *
     * @param {Object} e - The event object for the submit event.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        onSubmit(form); // Call the onSubmit function with the current form data
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 bg-gray-100 p-4 rounded shadow-md">
            <div className="mb-2">
                <label className="block text-sm font-medium">Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onInputChange} // Update the form state on input change
                    className="w-full p-2 border rounded"
                    required // Mark the field as required
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onInputChange} // Update the form state on input change
                    className="w-full p-2 border rounded"
                    required // Mark the field as required
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium">Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={onInputChange} // Update the form state on input change
                    className="w-full p-2 border rounded"
                    required // Mark the field as required
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium">Lead Status</label>
                <select
                    name="lead_status_id"
                    value={form.lead_status_id}
                    onChange={onInputChange} // Update the form state on input change
                    className="w-full p-2 border rounded"
                    required // Mark the field as required
                >
                    {leadStatuses.map((status) => (
                        <option key={status.id} value={status.id}>
                            {status.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit" // Submit the form
                className="px-4 py-2 bg-freefor text-white rounded"
            >
                {form.id ? 'Update Lead' : 'Add Lead'} {/* Button text changes based on form mode */}
            </button>
        </form>
    );
};

export default LeadForm;
