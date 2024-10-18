<?php

namespace Database\Factories;

use App\Models\Lead;
use App\Models\LeadStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
{
    protected $model = Lead::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'lead_status_id' => LeadStatus::factory(), // Create associated LeadStatus
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
