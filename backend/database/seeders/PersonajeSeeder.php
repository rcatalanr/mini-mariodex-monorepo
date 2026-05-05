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
            'imgUrl' => 'https://i.etsystatic.com/11636228/r/il/4f245c/4476255995/il_794xN.4476255995_d1q9.jpg',
            'levelPower' => 99,
            'world' => 'Mario World'
        ]);
        Personaje::create([
            'name' => 'Peach',
            'type' => 'Aliada',
            'imgUrl' => 'https://th.bing.com/th/id/R.0bb38c3e9a9c3067683e0ab3efaf0057?rik=pKw3XIw%2bwE6W2w&pid=ImgRaw&r=0',
            'levelPower' => 99,
            'world' => 'Mario World'
        ]);
        Personaje::create([
            'name' => 'Luigi',
            'type' => 'Héroe',
            'imgUrl' => 'https://w7.pngwing.com/pngs/1013/301/png-transparent-luigi-illustration-super-mario-bros-new-super-mario-bros-luigi-luigi-super-mario-bros-hand-video-game-thumbnail.png',
            'levelPower' => 99,
            'world' => 'Mario World'
        ]);
        Personaje::create([
            'name' => 'Toad',
            'type' => 'Aliada',
            'imgUrl' => 'https://eltallerdehector.com/wp-content/uploads/2022/08/super-mario-toad-png.png',
            'levelPower' => 99,
            'world' => 'Mario World'
        ]);
    }
}
