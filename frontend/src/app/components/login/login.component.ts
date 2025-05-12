import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router // Inyecta el servicio Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Acceso rápido a los controles del formulario
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Si el formulario es inválido, no continuar
    if (this.loginForm.invalid) {
      return;
    }

    // Llamar al servicio de autenticación
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(
      (response) => {
        if (response.token) {
          // Guarda el token en localStorage
          localStorage.setItem('token', response.token);

          // Redirige al usuario a la página de gestión de usuarios
          this.router.navigate(['/user-management']);
        } else {
          this.errorMessage = response.message || 'Usuario o contraseña incorrectos';
        }
      },
      (error) => {
        this.errorMessage = 'Ocurrió un error inesperado. Inténtalo de nuevo.';
      }
    );
  }
}