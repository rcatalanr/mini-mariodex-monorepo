<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PersonajeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Mario', 'Luigi', 'Peach', 'Toad']),
            'type' => fake()->randomElement(['Héroe', 'Aliado', 'Villano']),
            'imgUrl' => fake()->imageUrl(),
            'levelPower' => fake()->numberBetween(1, 100),
            'world' => 'Mario World',
        ];
    }
}