import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; // Importa RouterModule y Routes
import { AppComponent } from './app.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: 'user-management', component: UserManagementComponent }, // Ruta para la gestión de usuarios
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
];

@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes) // Configura las rutas aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }