<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * LeadStatus Model
 * Represents a status that can be assigned to leads in the application.
 */
class LeadStatus extends Model
{
    use HasFactory;

    // Mass assignable attributes
    protected $fillable = ['name'];

    /**
     * Get the leads associated with this lead status.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function leads()
    {
        return $this->hasMany(Lead::class); // Defines a relationship to the Lead model
    }
}
