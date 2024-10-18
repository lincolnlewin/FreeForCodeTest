import React, { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

// Lazy load subcomponents
const LeadForm = lazy(() => import('./LeadForm'));
const LeadTable = lazy(() => import('./LeadTable'));
const LeadSearch = lazy(() => import('./LeadSearch'));

const LeadList = () => {
    // State variables
    const [leads, setLeads] = useState([]); // Stores the list of leads
    const [pagination, setPagination] = useState({ // Stores pagination data
        current_page: 1,
        last_page: 1,
        next_page_url: null,
        prev_page_url: null,
    });
    const [loading, setLoading] = useState(false); // Indicates loading state
    const [searchTerm, setSearchTerm] = useState(''); // Stores the current search term
    const [formVisible, setFormVisible] = useState(false); // Toggles visibility of the lead form
    const [form, setForm] = useState({ // Stores the lead form data
        id: null,
        name: '',
        email: '',
        phone: '',
        lead_status_id: 1,
    });
    const [leadStatuses, setLeadStatuses] = useState([]); // Stores lead statuses fetched from the API

    /**
     * Fetches lead statuses from the API and updates the state.
     */
    const fetchLeadStatuses = async () => {
        try {
            const response = await axios.get('/api/lead-statuses');
            if (Array.isArray(response.data)) {
                setLeadStatuses(response.data);
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching lead statuses:', error);
        }
    };

    /**
     * Fetches leads from the API with optional pagination and search parameters.
     * @param {number} page - The current page number.
     * @param {string} search - The search term to filter leads.
     */
    const fetchLeads = async (page = 1, search = '') => {
        setLoading(true); // Set loading to true while fetching data
        try {
            const response = await axios.get(`/api/leads?page=${page}&search=${search}`);
            const data = response.data; // Extract data from response
            setLeads(data.data); // Update leads state with fetched data
            setPagination({ // Update pagination state
                current_page: data.current_page,
                last_page: data.last_page,
                next_page_url: data.next_page_url,
                prev_page_url: data.prev_page_url,
            });
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
        setLoading(false); // Reset loading state
    };

    // Effect to fetch leads and lead statuses on component mount
    useEffect(() => {
        fetchLeads();  // Initial load of leads
        fetchLeadStatuses();  // Load lead statuses
    }, []);

    /**
     * Handles input changes in the lead form.
     * @param {Object} e - The event object.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from target
        setForm({ ...form, [name]: value }); // Update form state
    };

    /**
     * Handles changes to the search input.
     * @param {string} searchTerm - The new search term.
     */
    const handleSearchChange = (searchTerm) => {
        setSearchTerm(searchTerm); // Update search term state
    };

    /**
     * Handles the submission of the search form.
     * @param {string} searchTerm - The current search term.
     */
    const handleSearchSubmit = (searchTerm) => {
        fetchLeads(1, searchTerm); // Fetch leads with the updated search term
    };

    /**
     * Handles the submission of the lead form.
     * @param {Object} lead - The lead data to be submitted.
     */
    const handleSubmit = async (lead) => {
        try {
            if (lead.id) {
                await axios.put(`/api/leads/${lead.id}`, lead); // Update existing lead
            } else {
                await axios.post('/api/leads', lead); // Create new lead
            }
            fetchLeads(); // Refresh leads list
            setFormVisible(false); // Hide the form after submission
            setForm({ id: null, name: '', email: '', phone: '', lead_status_id: 1 }); // Reset form state
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    /**
     * Handles editing a lead by setting the form state to the selected lead's data.
     * @param {Object} lead - The lead data to be edited.
     */
    const handleEdit = (lead) => {
        setFormVisible(true); // Show the form for editing
        setForm(lead); // Populate form with lead data
    };

    /**
     * Handles the deletion of a lead.
     * @param {number} id - The ID of the lead to delete.
     */
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                await axios.delete(`/api/leads/${id}`); // Delete the lead
                fetchLeads(); // Refresh leads list
            } catch (error) {
                console.error('Error deleting lead:', error);
            }
        }
    };

    /**
     * Handles pagination by fetching leads for the selected page.
     * @param {number} page - The page number to fetch.
     */
    const handlePageChange = (page) => {
        fetchLeads(page, searchTerm); // Fetch leads for the selected page with the current search term
    };

    /**
     * Toggles the visibility of the lead form.
     */
    const toggleForm = () => {
        setFormVisible(!formVisible); // Toggle form visibility state
    };

    // Render the LeadList component
    return (
        <div className="mt-5 px-4">
            <h1 className="text-2xl font-bold mb-4 text-center text-freefor">Lead Management</h1>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={toggleForm}
                    className="px-4 py-2 bg-freefor text-white rounded"
                >
                    {formVisible ? 'Hide Form' : 'Add New Lead'}
                </button>
                <Suspense fallback={<div>Loading search...</div>}>
                    <LeadSearch onSearch={handleSearchChange} searchTerm={searchTerm} onSubmit={handleSearchSubmit} />
                </Suspense>
            </div>

            {formVisible && (
                <Suspense fallback={<div>Loading form...</div>}>
                    <LeadForm
                        form={form}
                        leadStatuses={leadStatuses}
                        onSubmit={handleSubmit}
                        onInputChange={handleInputChange}
                    />
                </Suspense>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <Suspense fallback={<div>Loading table...</div>}>
                    <LeadTable
                        leads={leads}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </Suspense>
            )}

            <Pagination pagination={pagination} handlePageChange={handlePageChange} />
        </div>
    );
};

export default LeadList;
