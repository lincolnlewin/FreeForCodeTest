<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Lead Model
 * Represents a lead entity in the application.
 */
class Lead extends Model
{
    use HasFactory;

    // Mass assignable attributes
    protected $fillable = [
        'name', 'email', 'phone', 'lead_status_id', 'created_at', 'updated_at'
    ];

    /**
     * Get the lead status associated with the lead.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function leadStatus()
    {
        return $this->belongsTo(LeadStatus::class); // Defines a relationship to the LeadStatus model
    }
}
