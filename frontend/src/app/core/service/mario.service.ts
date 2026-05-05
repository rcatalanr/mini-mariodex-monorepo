import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Personaje } from "../models/ts/personaje.model";

@Injectable({
  providedIn: 'root',
})


export class MarioService {
  baseUrl: string = 'http://localhost:8000/api/personajes';

  constructor(private http: HttpClient) { }

  // Personajes Obtener personajes
  getPersonajes(): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(this.baseUrl);
  }

  // Crear personaje
  createPersonaje(newPersonaje: Personaje): Observable<Personaje> {
    return this.http.post<Personaje>(this.baseUrl, newPersonaje);
  }

  // Eliminar personaje
  deletePersonaje(personajeId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${personajeId}`);
  }
}
