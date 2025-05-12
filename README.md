# User Management System

Este proyecto es un sistema de gestión de usuarios y roles, que permite el registro, inicio de sesión, asignación de roles y gestión de usuarios. A continuación se detallan las características y la estructura del proyecto.

## Características

- **Registro e inicio de sesión**: Los usuarios pueden registrarse y acceder a sus cuentas.
- **Gestión basada en roles**:
  - **Admin**: Puede realizar todas las acciones (crear, leer, actualizar y eliminar usuarios).
  - **Editor**: Puede cambiar los roles de otros usuarios.
  - **Viewer**: Solo puede ver la lista de usuarios registrados.
- **CRUD de usuarios**: Los administradores pueden gestionar usuarios completamente.
- **Edición de perfil**: Los usuarios pueden actualizar su información personal.
- **Historial de actividades**: Se registra el historial de acciones realizadas por los usuarios.
- **Notificaciones**: Mensajes tipo "toast" para informar sobre acciones exitosas o errores.


## Tecnologías utilizadas

- **Backend**: Node.js con Express.js
- **Frontend**: Angular
- **Base de datos**: MongoDB
- **Autenticación**: JWT (JSON Web Tokens)
- **Contenerización**: Docker
- **Despliegue**: Render

## Estructura del proyecto

```
user-management-system
├── backend
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src
│       ├── app.ts
│       ├── config
│       │   └── db.ts
│       ├── controllers
│       │   └── userController.ts
│       ├── middlewares
│       │   └── authMiddleware.ts
│       ├── models
│       │   └── userModel.ts
│       ├── routes
│       │   └── userRoutes.ts
│       └── services
│           └── authService.ts
├── frontend
│   ├── angular.json
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── src
│       ├── assets
│       ├── index.html
│       ├── main.ts
│       ├── polyfills.ts
│       ├── styles.css
│       ├── environments
│       │   ├── environment.prod.ts
│       │   └── environment.ts
│       └── app
│           ├── app.component.css
│           ├── app.component.html
│           ├── app.component.ts
│           ├── app.module.ts
│           ├── components
│           │   ├── login
│           │   │   ├── login.component.css
│           │   │   ├── login.component.html
│           │   │   └── login.component.ts
│           │   ├── profile
│           │   │   ├── profile.component.css
│           │   │   ├── profile.component.html
│           │   │   └── profile.component.ts
│           │   └── user-management
│           │       ├── user-management.component.css
│           │       ├── user-management.component.html
│           │       └── user-management.component.ts
│           └── services
│               ├── auth.service.ts
│               └── user.service.ts
├── docker-compose.yml
└── README.md
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd user-management-system

1.1 configuracion de variables de entorno
PORT=3000
MONGO_URI=<URL_DE_TU_BASE_DE_DATOS>
JWT_SECRET=<TU_CLAVE_SECRETA>

2. Configura el backend:
   - Navega a la carpeta `backend` y ejecuta:
     ```
     npm install
     ```

3. Configura el frontend:
   - Navega a la carpeta `frontend` y ejecuta:
     ```
     npm install
     ```

4. Ejecuta el proyecto usando Docker:
   ```
   docker-compose up
   ```

## Uso

- Accede a la aplicación en `http://localhost:4200` para el frontend.
- El backend estará disponible en `http://localhost:3000`.

Roles y permisos
Admin:
Puede registrar, editar, eliminar usuarios y cambiar roles.
Editor:
Puede cambiar los roles de otros usuarios.
Viewer:
Solo puede ver la lista de usuarios registrados.


## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.