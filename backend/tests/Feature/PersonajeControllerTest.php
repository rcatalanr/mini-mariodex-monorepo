<?php

namespace Tests\Feature;

use App\Models\Personaje;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PersonajeControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_listar_personajes(): void
    {
        Personaje::factory()->count(3)->create();

        $response = $this->getJson('/api/personajes');

        $response->assertStatus(200)
            ->assertJsonCount(3)
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'name',
                    'type',
                    'imgUrl',
                    'levelPower',
                    'world',
                    'created_at',
                    'updated_at',
                ]
            ]);
    }

    public function test_puede_crear_un_personaje(): void
    {
        $data = [
            'name' => 'Mario',
            'type' => 'Héroe',
            'imgUrl' => 'mario.png',
            'levelPower' => 99,
            'world' => 'Mario World',
        ];

        $response = $this->postJson('/api/personajes', $data);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'name' => 'Mario',
                'type' => 'Héroe',
            ]);

        $this->assertDatabaseHas('personajes', [
            'name' => 'Mario',
            'type' => 'Héroe',
            'levelPower' => 99,
            'world' => 'Mario World',
        ]);
    }

    public function test_puede_actualizar_un_personaje(): void
    {
        $personaje = Personaje::factory()->create();

        $data = [
            'name' => 'Luigi',
            'type' => 'Héroe',
            'imgUrl' => 'luigi.png',
            'levelPower' => 85,
            'world' => 'Mario World',
        ];

        $response = $this->putJson("/api/personajes/{$personaje->id}", $data);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'name' => 'Luigi',
                'levelPower' => 85,
            ]);

        $this->assertDatabaseHas('personajes', [
            'id' => $personaje->id,
            'name' => 'Luigi',
            'levelPower' => 85,
        ]);
    }

    public function test_puede_eliminar_un_personaje(): void
    {
        $personaje = Personaje::factory()->create();

        $response = $this->deleteJson("/api/personajes/{$personaje->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('personajes', [
            'id' => $personaje->id,
        ]);
    }

    public function test_no_puede_crear_personaje_con_datos_invalidos(): void
    {
        $data = [
            'name' => '',
            'type' => '',
            'imgUrl' => '',
            'levelPower' => 0,
            'world' => '',
        ];

        $response = $this->postJson('/api/personajes', $data);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'name',
                'type',
                'imgUrl',
                'levelPower',
                'world',
            ]);
    }
}
