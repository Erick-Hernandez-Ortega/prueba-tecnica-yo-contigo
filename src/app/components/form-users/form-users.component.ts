import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.css'],
})
export class FormUsersComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  fecha: string = '';
  sexo: string = '';
  isMenor: boolean = true;


  constructor(private http: HttpClient) { }

  ngOnInit() { }

  validar(): boolean {
    const regexNum = /^\d+$/;

    // Email ya se valido con required en la plantilla
    if (this.telefono.length === 10 && regexNum.test(this.telefono) && !this.esMenor()) {
      return true
    } else {
      return false
    }
  }

  esMenor(): boolean {
    if (this.fecha == "") {
      return true
    } else {
      const fechaNacimiento = new Date(this.fecha);
      const fechaActual = new Date();
      const diferenciaTiempo = fechaActual.getTime() - fechaNacimiento.getTime();
      const edad = diferenciaTiempo / (1000 * 60 * 60 * 24 * 365.25);
      const edadMinima = 18;

      this.isMenor = edad < edadMinima;
      return edad < edadMinima;
    }

  }

  registrar(): void {
    const data = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      sexo: this.sexo,
      fecha: this.fecha
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post('http://localhost:3000/usuarios', data, httpOptions).subscribe(
      (response) => {
        // Maneja la respuesta del servidor
        console.log('Respuesta:', response);
      },
      (error) => {
        // Maneja errores, si los hay
        console.error('Error:', error);
      }
    );

  }
}
