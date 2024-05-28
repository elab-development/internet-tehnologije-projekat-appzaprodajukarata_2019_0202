<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\tickets>
 */
class TicketsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'event_id' => \App\Models\Events::factory(),
            'user_id' => \App\Models\User::factory(),
            'price' => $this->faker->randomFloat(2, 500, 5000),
            'seat_number' => $this->faker->numberBetween(1, 50),
            'seat_row' => $this->faker->randomElement(['A', 'B', 'C', 'D', 'E', 'F','G','H','I']),
        
        ];
    }
}
