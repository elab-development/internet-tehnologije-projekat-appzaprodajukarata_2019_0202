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
            'Manchester United', 'Barcelona', 'Real Madrid', 'Juventus', 'Bayern Munich', 'Liverpool',
            'Paris Saint-Germain', 'Chelsea', 'Manchester City', 'Atletico Madrid', 'Borussia Dortmund',
            'Inter Milan', 'AC Milan', 'Tottenham Hotspur', 'Ajax', 'Porto', 'Benfica', 'Sevilla',
            'Lazio', 'RB Leipzig', 'Zenit', 'Shakhtar Donetsk', 'Galatasaray', 'Olympiacos', 'Celtic',
            'Rangers', 'Dynamo Kiev', 'Club Brugge', 'Partizan', 'Anderlecht', 'PSV Eindhoven',
            'Fenerbahçe'
        ];
        $stadiums = [
            'Old Trafford', 'Camp Nou', 'Santiago Bernabeu', 'Allianz Stadium', 'Allianz Arena',
            'Anfield', 'Parc des Princes', 'Stamford Bridge', 'Etihad Stadium', 'Wanda Metropolitano',
            'Signal Iduna Park', 'San Siro', 'Tottenham Hotspur Stadium', 'Amsterdam Arena',
            'Estadio do Dragao', 'Estadio da Luz', 'Ramon Sanchez-Pizjuan', 'Stadio Olimpico',
            'Red Bull Arena', 'Gazprom Arena', 'Donbass Arena', 'Türk Telekom Stadium', 'Karaiskakis Stadium',
            'Celtic Park', 'Ibrox Stadium', 'NSC Olimpiyskiy', 'Jan Breydel Stadium', 'Stadion JNA',
            'Constant Vanden Stock Stadium', 'Philips Stadion', 'Ülker Stadium'
        ];
        $team1 = $this->faker->randomElement($teams);
        do {
            $team2 = $this->faker->randomElement($teams);
        } while ($team1 === $team2); 

        return [
            'name' => "$team1 vs $team2",
            'stadium' => $this->faker->randomElement($stadiums),
            'date' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'time' => $this->faker->time,
        ];
    }
    
}
