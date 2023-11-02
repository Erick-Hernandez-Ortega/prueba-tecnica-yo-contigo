import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usuarios : any = [];

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/usuarios').subscribe((data) => {
      this.usuarios = data;
    });
  }

  ngOnInit() {}
}
