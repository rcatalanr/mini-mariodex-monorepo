import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HeaderComponent } from '../../shared/header-component/header-component';
import { FooterComponent } from '../../shared/footer-component/footer-component';
import { NuevoPersonajeComponent } from '../nuevo-personaje-component/nuevo-personaje-component';
import { PersonajeItemComponent } from '../personaje-item-component/personaje-item-component';
import { Personaje } from '../../core/models/ts/personaje.model';
import { MarioService } from '../../core/service/mario.service';


@Component({
  standalone: true,
  selector: 'app-mariodex-page-component',
  imports: [HeaderComponent, FooterComponent, NuevoPersonajeComponent, PersonajeItemComponent],
  templateUrl: './mariodex-page-component.html',
  styleUrl: './mariodex-page-component.scss',
})
export class MariodexPageComponent {

  personajeList: Personaje[] = [];
  selectedPersonaje: Personaje | null = null;
  @ViewChild('personajeModal') personajeModal!: ElementRef; // create
  @ViewChild('detailPersonajeModalEl') detailPersonajeModalEl!: ElementRef; // detail


  constructor(private marioService: MarioService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadPersonajes();
  }

  loadPersonajes(): void {
    this.marioService.getPersonajes().subscribe({
      next: (personajes) => {
        this.personajeList = personajes;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar los personajes:', error);
      }
    });
  }

  onPersonajeCreated(created: Personaje): void {
    // actualizar lista 
    this.personajeList = [...this.personajeList, created];
    this.closeModal();
  }

  selectPersonaje(personaje: Personaje): void {
    this.selectedPersonaje = personaje;
  }

  closeModal(): void {
    if (this.personajeModal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(this.personajeModal.nativeElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  }

  onDeleteRequested(id: number): void {
    this.marioService.deletePersonaje(id).subscribe({
      next: () => {
        //quitar de la lista
        const idStr = String(id);
        this.personajeList = this.personajeList.filter(p => String(p.id) !== idStr);

        // FORZAR repintado
        this.cdr.detectChanges();

        // limpiar selección
        this.selectedPersonaje = null;

        // cerrar modal
        this.closeDetailModal();

        // sincronización con DB
        this.loadPersonajes();
      },
      error: (error) => {
        console.error('Error al borrar el personaje:', error);
      }
    });
  }


  closeDetailModal(): void {
    if (this.detailPersonajeModalEl) {
      const instance = (window as any).bootstrap.Modal.getInstance(this.detailPersonajeModalEl.nativeElement);
      if (instance) instance.hide();
    }
  }
}
