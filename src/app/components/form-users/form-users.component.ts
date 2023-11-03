import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.css'],
})
export class FormUsersComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  fecha: Date = new Date(); 
  sexo: string = '';
  isMenor: boolean = true;
  response: any = {};
  @ViewChild('abrirModal', { static: true }) miBoton!: ElementRef;
  @Input() id_actualizar: number = 0;
  update : boolean = false

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.update = this.id_actualizar != undefined ? true : false;


    if (this.update) {
      this.http
      .get(`http://localhost:3000/usuarios/${this.id_actualizar}`)
      .subscribe(
        (response : any) => {
          const fecha = response.user.fecha_nacimiento.toString();

          this.nombre = response.user.nombre;
          this.email = response.user.correo;
          this.fecha = fecha.trim();
          this.sexo = response.user.sexo;
          this.telefono = response.user.telefono;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  actualizar(): void {
    const data = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      sexo: this.sexo,
      fecha: this.fecha,
      id: this.id_actualizar
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    
    this.http
      .put('http://localhost:3000/usuarios', data, httpOptions)
      .subscribe(
        (response) => {
          this.response = response;
        },
        (error) => {
          this.response = error;
        }
      );

    this.miBoton.nativeElement.click();
  }

  recargarPagina() : void {
    window.location.reload();
  }

  validar(): boolean {
    const regexNum = /^\d+$/;
    const regexEmail = /^\S+@\S+\.\S+$/;

    if (
      this.telefono.length === 10 &&
      regexNum.test(this.telefono) &&
      !this.esMenor() &&
      regexEmail.test(this.email)
    ) {
      return true;
    } else {
      return false;
    }
  }

  esMenor(): boolean {
    if (!this.fecha) {
      return true;
    } else {
      const fechaNacimiento = new Date(this.fecha);
      const fechaActual = new Date();
      const diferenciaTiempo =
        fechaActual.getTime() - fechaNacimiento.getTime();
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
      fecha: this.fecha,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    this.http
      .post('http://localhost:3000/usuarios', data, httpOptions)
      .subscribe(
        (response) => {
          this.response = response;
        },
        (error) => {
          this.response = error;
        }
      );

    this.miBoton.nativeElement.click();
  }
}
