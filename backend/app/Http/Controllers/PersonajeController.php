<?php

namespace App\Http\Controllers;

use App\Models\Personaje;
use Illuminate\Http\Request;

class PersonajeController extends Controller
{
    public function index()
    {
        return response()->json(Personaje::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|min:3',
            'type' => 'required|string|max:255',
            'imgUrl' => 'required|string|max:500',
            'levelPower' => 'required|integer|min:1',
            'world' => 'required|string|max:255',
        ]);

        $personaje = Personaje::create($data);

        return response()->json($personaje, 201);
    }

    public function update(Request $request, Personaje $personaje)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|min:3',
            'type' => 'sometimes|required|string|max:255',
            'imgUrl' => 'sometimes|required|string|max:500',
            'levelPower' => 'sometimes|required|integer|min:1',
            'world' => 'sometimes|required|string|max:255',
        ]);

        $personaje->update($data);

        return response()->json($personaje, 200);
    }

    public function destroy(Personaje $personaje)
    {
        $personaje->delete();

        return response()->json(null, 204);
    }
}
