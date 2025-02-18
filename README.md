# 🏆 El Giraldillo - Plataforma de Eventos

## 📌 Desarrollo de Aplicaciones Web (DAW)

### 👨‍💻 Autores:
David Cuevas, Santi Pérez, Enrique Díaz y José Antonio Muñoz.

## 📖 Índice
- 📌 Introducción
- 🚀 Funcionalidades y Tecnologías
- 🛠️ Instalación
- 📱 Guía de Uso
- 🎨 Enlace a Figma
- 📌 Conclusión y posibles mejoras
- 🤝 Contribuciones y Agradecimientos
- 📜 Licencia
- 📧 Contacto

---

## 📌 Introducción

El **Giraldillo** es una aplicación de eventos desarrollada en **React Native** para el frontend y **Spring Boot** para el backend. 

### 🎯 Objetivos:
- ✔️ Permitir a los usuarios buscar eventos por ciudad, categoría o nombre.
- ✔️ Posibilitar la creación y consulta de eventos.
- ✔️ Integración con mapas para mostrar la ubicación de cada evento.
- ✔️ Un diseño atractivo y funcional que brinde una buena experiencia al usuario.

### 💡 Motivación:
Hoy en día, encontrar eventos relevantes puede ser difícil debido a la dispersión de información en diferentes plataformas. **El Giraldillo** surge como una solución centralizada y accesible para descubrir eventos con facilidad, similar a **EventBrite**.

---

## 🚀 Funcionalidades y Tecnologías

### 🔹 Funcionalidades principales:
- ✅ Registro e inicio de sesión con autenticación JWT.
- ✅ Búsqueda de eventos por ciudad, nombre o categoría.
- ✅ Creación de eventos (**CRUD**).
- ✅ Integración con mapas para visualizar los eventos.
- ✅ Diseño intuitivo y accesible.

### 🛠 Tecnologías utilizadas:

#### 🎨 **Frontend (React Native)**
- Expo
- React Navigation
- AsyncStorage
- React Native Maps
- DateTimePicker
- ImagePicker
- MapView

#### 🖥 **Backend (Spring Boot - Java)**
- Spring Security con JWT
- Spring Data JPA (MySQL)
- API REST
- Hibernate

---

## 🛠️ Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/usuario/GuiaSocial-Front.git  
git clone https://github.com/usuario/GuiaSocial-Back.git  
```

```bash
cd guia-social
```

### 2️⃣ Instalar dependencias (Frontend)
```bash
cd GuiaSocial-Front  
npm install
```

🔹 **Cambiar la IP en los siguientes archivos:**
```
- AnadirScreen
- BuscarScreen
- EventosScreen
- EventosDelDiaScreen
- GastronomiaScreen
- HomeScreen
- MusicaScreen
- OpcionesScreen
- ProfileScreen
- TeatroYEspectaculoScreen
- TurismoScreen
- VidaNocturnaScreen
- Index
- LoginScreen
- RegisterScreen
```

### 3️⃣ Instalar dependencias (Backend)
```bash
cd GuiaSocial-Back  
mvn clean install
```

### 4️⃣ Configurar la base de datos (MySQL)
📌 Descargar el **schema** de la base de datos llamada `guiasocial` y ejecutarlo en tu servidor de MySQL.  
📌 Modificar `application.properties` con tus credenciales de MySQL.

### 5️⃣ Ejecutar el Backend
```bash
cd GuiaSocial-Back  
mvn spring-boot:run
```

### 6️⃣ Ejecutar el Frontend
```bash
cd GuiaSocial-Front  
npx expo start
```

---

## 📱 Guía de Uso

1️⃣ Registrarse en la aplicación.  
2️⃣ Explorar la lista de eventos disponibles.  
3️⃣ Buscar eventos por nombre o categoría.  
4️⃣ Crear un evento (**requiere estar autenticado**).  
5️⃣ Ver detalles y ubicaciones en el mapa.  

### 📌 Notas importantes:
- 🔹 Backend debe estar corriendo en el **puerto 8080**.
- 🔹 Expo debe ejecutarse en un **dispositivo/emulador**.

---

## 🎨 Enlace a Figma
🔗 [Diseño en Figma](https://www.figma.com/design/ZQKfkXkr29RBuESVWSqNaY/El-Giraldillo?node-id=0-1)

---

## 📌 Conclusión y posibles mejoras

El desarrollo de **El Giraldillo** nos permitió profundizar en **React Native** y **Spring Boot**, además de aplicar buenas prácticas de diseño y seguridad.

### 📌 Mejoras futuras:
- 🔹 Guardar la IP del servidor en una **variable global**, para evitar cambiarla manualmente.
- 🔹 Mejorar la **interfaz de usuario** y la **accesibilidad**.
- 🔹 Incluir un **mapa interactivo** en la vista de detalles de un evento.
- 🔹 Optimización del **rendimiento en la carga de eventos**.

Este proyecto nos enseñó la importancia de trabajar en equipo, resolver errores en conjunto y optimizar el flujo de trabajo en un entorno **Full Stack**.

---

## 🤝 Contribuciones y Agradecimientos

Agradecemos a nuestro profesor **Joaquín** por su guía en este proyecto y a la comunidad de desarrolladores por la documentación y herramientas que facilitaron el desarrollo.

Si deseas contribuir, ¡eres bienvenido! Haz un **fork** del proyecto y envía un **pull request** con tus mejoras. 🚀

🔗 **Repositorio Frontend:** [GitHub - GuiaSocial-Front](https://github.com/usuario/GuiaSocial-Front)  
🔗 **Repositorio Backend:** [GitHub - GuiaSocial-Back](https://github.com/usuario/GuiaSocial-Back)

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes usarlo y modificarlo libremente.  
📌 Para más información sobre la licencia MIT, consulta: [Licencia MIT](https://opensource.org/licenses/MIT).

---

## 📧 Contacto
📌 **David Cuevas** - Email: david.cuevas@a.vedrunasevillasj.es  
📌 **Santi Pérez** - Email: santiago.perez@a.vedrunasevillasj.es  
📌 **Enrique Díaz** - Email: enrique.diaz@a.vedrunasevillasj.es  
📌 **José Antonio Muñoz** - Email: joseantonio.munoz@a.vedrunasevillasj.es  

Si tienes dudas, ¡contáctanos! 📩
# GuiaSocial-Front
