import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { MarioService } from './mario.service';
import { Personaje } from '../models/ts/personaje.model';

describe('MarioService', () => {
  let service: MarioService;
  let httpMock: HttpTestingController;
  const API_URL = 'https://mini-mariodex-monorepo.onrender.com/api/personajes';


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MarioService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(MarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de personajes', () => {
    const mockPersonajes: Personaje[] = [
      {
        id: 1,
        name: 'Mario',
        type: 'Héroe',
        imgUrl: 'mario.png',
        levelPower: 99,
        world: 'Mario World'
      }
    ];

    service.getPersonajes().subscribe(personajes => {
      expect(personajes).toEqual(mockPersonajes);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');

    req.flush(mockPersonajes);
  });

  it('debería crear un personaje', () => {
    const nuevoPersonaje: Personaje = {
      name: 'Luigi',
      type: 'Héroe',
      imgUrl: 'luigi.png',
      levelPower: 85,
      world: 'Mario World'
    };

    const personajeCreado: Personaje = {
      id: 2,
      ...nuevoPersonaje
    };

    service.createPersonaje(nuevoPersonaje).subscribe(personaje => {
      expect(personaje).toEqual(personajeCreado);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevoPersonaje);

    req.flush(personajeCreado);
  });

  it('debería eliminar un personaje', () => {
    service.deletePersonaje(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${API_URL}/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });

  it('debería manejar un error al obtener personajes', () => {
    service.getPersonajes().subscribe({
      next: () => fail('La petición debería haber fallado'),
      error: error => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');

    req.flush(
      { message: 'Error del servidor' },
      { status: 500, statusText: 'Server Error' }
    );
  });
});