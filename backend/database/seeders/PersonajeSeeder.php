<?php

namespace Database\Seeders;

use App\Models\Personaje;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PersonajeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Personaje::create([
            'name' => 'Mario',
            'type' => 'Héroe',
            'imgUrl' => 'https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png',
            'levelPower' => 99,
            'world' => 'Mario World'
        ]);
        Personaje::create([
            'name' => 'Peach',
            'type' => 'Aliada',
            'imgUrl' => 'https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png',
            'levelPower' => 99,
            'world' => 'Mario World'
        ]);
        Personaje::create([
            'name' => 'Luigi',
            'type' => 'Héroe',
            'imgUrl' => 'https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png',
            'levelPower' => 99,
            'world' => 'Mario World'
        ]);
        Personaje::create([
            'name' => 'Toad',
            'type' => 'Aliada',
            'imgUrl' => 'https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png',
            'levelPower' => 99,
            'world' => 'Mario World'
        ]);
    }
}
