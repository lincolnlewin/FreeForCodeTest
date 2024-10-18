import React from 'react';

/**
 * LeadTable Component
 * This component renders a table displaying a list of leads.
 *
 * @param {Array} leads - An array of lead objects to be displayed in the table.
 * @param {Function} onEdit - Callback function to handle editing a lead.
 * @param {Function} onDelete - Callback function to handle deleting a lead.
 */
const LeadTable = ({ leads, onEdit, onDelete }) => {
    return (
        <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border py-2 px-4 bg-gray-100">ID</th>
                    <th className="border py-2 px-4 bg-gray-100">Name</th>
                    <th className="border py-2 px-4 bg-gray-100">Email</th>
                    <th className="border py-2 px-4 bg-gray-100">Phone</th>
                    <th className="border py-2 px-4 bg-gray-100">Status</th>
                    <th className="border py-2 px-4 bg-gray-100">Actions</th>
                </tr>
            </thead>
            <tbody>
                {leads.map((lead) => (
                    <tr key={lead.id}>
                        <td className="border px-4 py-2">{lead.id}</td>
                        <td className="border px-4 py-2">{lead.name}</td>
                        <td className="border px-4 py-2">{lead.email}</td>
                        <td className="border px-4 py-2">{lead.phone}</td>
                        <td className="border px-4 py-2">{lead.lead_status.name}</td>
                        <td className="border px-4 py-2">
                            <button
                                className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                                onClick={() => onEdit(lead)} // Trigger the edit function for the specific lead
                            >
                                Edit
                            </button>
                            <button
                                className="px-2 py-1 bg-red-500 text-white rounded"
                                onClick={() => onDelete(lead.id)} // Trigger the delete function for the specific lead
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LeadTable;
