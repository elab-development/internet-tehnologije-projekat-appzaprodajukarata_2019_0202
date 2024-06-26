<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Events>
 */
class EventsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $teams = [
            'Nemačka', 'Francuska', 'Engleska', 'Španija', 'Italija', 'Holandija', 'Belgija', 'Portugal', 'Hrvatska', 
            'Danska','Švedska', 'Švajcarska', 'Poljska', 'Austrija', 'Češka', 'Ukrajina', 'Mađarska', 'Slovačka',
            'Turska','Slovenija','Gruzija', 'Austrija', 'Škotska', 'Srbija'
        ];
        $stadiums = [
            'Olympiastadion', 'Allianz Arena', 'Westfalenstadion', 'MHPArena', 'Arena AufSchalke',
            'Volksparkstadion', 'Merkur Spiel-Arena', 'Waldstadion', 'RheinEnergieStadion', 'Red Bull Arena'
        ];
        $team1 = $this->faker->randomElement($teams);
        do {
            $team2 = $this->faker->randomElement($teams);
        } while ($team1 === $team2); 

        return [
            'name' => "$team1 vs $team2",
            'stadium' => $this->faker->randomElement($stadiums),
            'date' => $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'time' => $this->faker->time,
        ];
    }
    
}
