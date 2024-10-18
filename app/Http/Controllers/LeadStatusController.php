<?php

namespace App\Http\Controllers;

use App\Models\LeadStatus;
use Illuminate\Http\Request;

/**
 * LeadStatusController Class
 * This controller manages the operations related to lead statuses.
 */
class LeadStatusController extends Controller
{
    /**
     * Display a listing of all lead statuses.
     *
     * @return \Illuminate\Http\JsonResponse A JSON response containing all lead statuses.
     */
    public function index()
    {
        // Retrieve all lead statuses from the database
        $statuses = LeadStatus::all();

        // Return the lead statuses in JSON format
        return response()->json($statuses);
    }
}
