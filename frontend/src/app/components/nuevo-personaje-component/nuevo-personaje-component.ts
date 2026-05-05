import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Personaje } from '../../core/models/ts/personaje.model';
import { CommonModule } from '@angular/common';
import { MarioService } from '../../core/service/mario.service';

@Component({
  standalone: true,
  selector: 'app-nuevo-personaje-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-personaje-component.html',
  styleUrls: ['./nuevo-personaje-component.scss'],
})
export class NuevoPersonajeComponent {
  personajeName!: string;
  personajeType!: string;
  personajeImageUrl!: string;
  personajeLevel!: number;

  @Output() onSaveSuccess = new EventEmitter<Personaje>();


  constructor(private marioService: MarioService) { }

  savePersonaje(): void {
    const newPersonaje: Personaje = {
      name: this.personajeName,
      type: this.personajeType,
      world: 'Mario World',
      levelPower: this.personajeLevel,
      imgUrl: this.personajeImageUrl
    };

    this.marioService.createPersonaje(newPersonaje).subscribe({
      next: (res) => {
        console.log('Personaje creado con éxito:', res);

        // Resetear campos después de guardar
        this.personajeName = '';
        this.personajeType = '';
        this.personajeLevel = 0
        this.personajeImageUrl = '';

        // Emitir evento para que el padre cierre el modal
        this.onSaveSuccess.emit(res);

      },
      error: (error) => {
        console.error('Error al crear el Personaje:', error);
      }
    });
  }

}
