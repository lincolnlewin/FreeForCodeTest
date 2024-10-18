<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lead;
use App\Models\LeadStatus;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create predefined lead statuses
        $statuses = [
            ['name' => 'New Lead'],
            ['name' => 'Appointment Set'],
            ['name' => 'Deal lost'],
            ['name' => 'Deal won'],
            ['name' => 'Sold'],
        ];

        foreach ($statuses as $status) {
            LeadStatus::create($status);
        }

        // Seed leads with 1 million records
        Lead::factory()->count(1000000)->create();
    }
}
