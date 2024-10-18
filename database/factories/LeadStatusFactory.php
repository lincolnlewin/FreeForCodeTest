<?php

namespace Database\Factories;

use App\Models\LeadStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeadStatusFactory extends Factory
{
    protected $model = LeadStatus::class;

    public function definition()
    {
        return [
            'name' => $this->faker->randomElement(['New Lead', 'Appointment Set', 'Deal lost', 'Deal won', 'Sold']),
        ];
    }
}
