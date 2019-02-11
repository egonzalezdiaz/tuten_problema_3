import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { LoginService } from './login.service';
import { LoginModel } from './login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  fgFormulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sLogin: LoginService
  ) {}

  //referencias a controles
  get usuario(): AbstractControl {
    return this.fgFormulario.get('usuario');
  }
  get password(): AbstractControl {
    return this.fgFormulario.get('password');
  }
  get aplicacion(): AbstractControl {
    return this.fgFormulario.get("aplicacion");
  }
  //**********
  
  ngOnInit() {
    //fija los validadores correspondientes
    this.fgFormulario = this.fb.group({
      'usuario': ['', Validators.required],
      'password': ['', Validators.required],
      'aplicacion': ['', Validators.required]
    });
  }

  enviarSolicitud() {
    //crea el objeto de intercambio
    const login: LoginModel = new LoginModel(
      this.usuario.value,
      this.password.value,
      this.aplicacion.value
    );
    
    //promesa con el resultado del login 
    this.sLogin.login(login)
      .then((resultado) => {
        if (resultado) {
          this.router.navigate(['/listado',{ 
            token: resultado["token"],
            usuario : this.usuario.value,
            aplicacion : this.aplicacion.value
          }]);
        } else {
          alert('LOGIN INCORRECTO');
        }
      });
  }
}
