<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

/**
 * LeadController Class
 * This controller manages the CRUD operations for leads.
 */
class LeadController extends Controller
{
    /**
     * Display a listing of leads with optional search functionality.
     *
     * @param \Illuminate\Http\Request $request The incoming request containing search parameters.
     * @return \Illuminate\Http\JsonResponse A JSON response containing the leads with pagination.
     */
    public function index(Request $request)
    {
        // Retrieve the search input from the request
        $search = $request->input('search');
        $page = $request->input('page', 1); // Get the current page, default to 1

        // Create a cache key based on the search term and page number
        $cacheKey = 'leads_' . md5($search) . '_page_' . $page;

        // Attempt to retrieve the leads from cache
        $leads = Cache::remember($cacheKey, 60, function () use ($search) {
            // Query leads with optional search filtering
            return Lead::with('leadStatus')
                ->when($search, function ($query, $search) {
                    return $query->where('name', 'like', "%$search%")
                                 ->orWhere('email', 'like', "%$search%");
                })
                ->paginate(14); // Paginate the results with 14 leads per page
        });

        return response()->json($leads); // Return leads in JSON format
    }

    /**
     * Store a newly created lead in the database.
     *
     * @param \Illuminate\Http\Request $request The incoming request containing lead data.
     * @return \Illuminate\Http\JsonResponse A JSON response containing the created lead and a 201 status code.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:191'],
            'email' => ['required', 'email', 'max:191'],
            'phone' => ['required', 'string', 'max:191'],
            'lead_status_id' => ['required', 'exists:lead_statuses,id'],
        ]);

        // Create the new lead with validated data
        $lead = Lead::create($validated);

        // Clear all caches for leads to ensure fresh data is fetched
        Cache::flush(); // Alternatively, you can only forget specific keys if needed

        return response()->json($lead, 201); // Return the created lead in JSON format with a 201 status code
    }

    /**
     * Update the specified lead in the database.
     *
     * @param \Illuminate\Http\Request $request The incoming request containing updated lead data.
     * @param \App\Models\Lead $lead The lead model instance to be updated.
     * @return \Illuminate\Http\JsonResponse A JSON response containing the updated lead and a 200 status code.
     */
    public function update(Request $request, Lead $lead)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:191'],
            'email' => ['required', 'email', 'max:191'],
            'phone' => ['required', 'string', 'max:191'],
            'lead_status_id' => ['required', 'exists:lead_statuses,id'],
        ]);

        // Update the lead with validated data
        $lead->update($validated);

        // Clear all caches for leads to ensure fresh data is fetched
        Cache::flush(); // Alternatively, you can only forget specific keys if needed

        return response()->json($lead, 200); // Return the updated lead in JSON format with a 200 status code
    }

    /**
     * Remove the specified lead from the database.
     *
     * @param \App\Models\Lead $lead The lead model instance to be deleted.
     * @return \Illuminate\Http\JsonResponse A JSON response indicating the result of the deletion.
     */
    public function destroy(Lead $lead)
    {
        try {
            // Attempt to delete the lead
            $lead->delete();

            // Clear all caches for leads to ensure fresh data is fetched
            Cache::flush(); // Alternatively, you can only forget specific keys if needed

            return response()->json(['message' => 'Lead deleted successfully'], 200); // Return success message
        } catch (\Exception $e) {
            // Handle any errors that occur during deletion
            return response()->json(['message' => 'Failed to delete lead', 'error' => $e->getMessage()], 500);
        }
    }
}
