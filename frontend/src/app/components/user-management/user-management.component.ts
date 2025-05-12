import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
    users: any[] = [];
    userForm: any = { username: '', email: '', password: '', role: '' };
    isEditMode: boolean = false;
    editingUserId: string | null = null;
    errorMessage: string | null = null;

    // Mensaje tipo toast
    toastMessage: string = '';
    showToast: boolean = false;
    userRole: string | null = null;
    userName: string | null = null;

    constructor(private userService: UserService, private authService: AuthService) {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole(); // Obtén el rol del usuario
        this.userName = this.authService.getUserName(); // Obtén el nombre del usuario
        this.loadUsers();
    }

    showSuccessToast(message: string): void {
        this.toastMessage = message;
        this.showToast = true;
        setTimeout(() => {
            this.showToast = false;
        }, 3000);
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe(
            (data) => {
                this.users = data; // Asegúrate de que los datos se asignen correctamente
            },
            (error) => {
                console.error('Error al cargar usuarios:', error);
            }
        );
    }

    deleteUser(userId: string): void {
        if (this.userRole === 'Admin') {
            if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
                this.userService.deleteUser(userId).subscribe(
                    () => {
                        this.showSuccessToast('Usuario eliminado exitosamente');
                        this.loadUsers();
                    },
                    (error) => {
                        console.error('Error al eliminar usuario:', error);
                    }
                );
            }
        } else {
            alert('No tienes permiso para eliminar usuarios');
        }
    }

    registerUser(): void {
        this.userService.registerUser(this.userForm).subscribe(
            (response) => {
                this.showSuccessToast('Usuario registrado exitosamente');
                this.loadUsers();
                this.userForm = { username: '', email: '', password: '', role: '' };
            },
            (error) => {
                console.error('Error al registrar usuario:', error);
            }
        );
    }

    updateUser(): void {
        if (this.editingUserId) {
            this.userService.updateUser(this.editingUserId, this.userForm).subscribe(
                (response) => {
                    this.showSuccessToast('Usuario actualizado correctamente');
                    this.loadUsers();
                    this.cancelEdit();
                },
                (error) => {
                    console.error('Error al actualizar usuario:', error);
                }
            );
        }
    }

    updateUserRole(userId: string, newRole: string): void {
        if (this.userRole === 'Admin' || this.userRole === 'Editor') {
            this.userService.updateUserRole(userId, newRole).subscribe(
                (response) => {
                    this.showSuccessToast('Rol actualizado exitosamente');
                    this.loadUsers();
                },
                (error) => {
                    console.error('Error al actualizar el rol:', error);
                }
            );
        } else {
            alert('No tienes permiso para actualizar roles');
        }
    }

    cancelEdit(): void {
        this.isEditMode = false;
        this.editingUserId = null;
        this.userForm = { username: '', email: '', password: '', role: '' };
    }
}
