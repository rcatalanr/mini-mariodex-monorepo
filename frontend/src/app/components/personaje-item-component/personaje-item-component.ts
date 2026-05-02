import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personaje } from '../../core/models/ts/personaje.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-personaje-item-component',
  imports: [CommonModule],
  templateUrl: './personaje-item-component.html',
  styleUrl: './personaje-item-component.scss',
})
export class PersonajeItemComponent {
  @Input() selectedPersonaje: Personaje | null = null;

  @Output() deleteRequested = new EventEmitter<number>();

  constructor() { }


  requestDelete(): void {
    const id = this.selectedPersonaje?.id;
    if (!id) return;
    this.deleteRequested.emit(id);
  }

}
