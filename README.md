# Calculadora de Subredes IPv4

Este proyecto consiste en una calculadora de subredes IPv4 desarrollada con Node.js y Express, diseñada para calcular información detallada sobre subredes a partir de direcciones CIDR proporcionadas por el usuario.
Videos: https://youtu.be/DG93_JKQXi4

## Características

- 🖩 **Calculadora Principal**: Permite calcular la información principal de una subred IPv4, incluyendo la dirección de red, dirección de inicio, dirección de fin, dirección de broadcast, máscara de subred, número de direcciones disponibles y longitud del prefijo.
  
- 🔗 **Subredes Adicionales**: Genera múltiples subredes a partir de una subred dada, mostrando información detallada para cada una, como la dirección de red, dirección de inicio, dirección de fin, dirección de broadcast, máscara de subred, número de direcciones disponibles y longitud del prefijo.

- 🚨 **Manejo de Errores**: Implementa manejo de errores para casos donde el prefijo de subred es menor a 24, dado que no es relevante para el cálculo detallado de subredes.

- 🌐 **Interfaz de API RESTful**: Ofrece endpoints RESTful para recibir solicitudes POST con direcciones CIDR y devolver JSON con la información calculada de subredes.

## Tecnologías Utilizadas

- 🚀 **Node.js**: Plataforma de ejecución de JavaScript del lado del servidor.
- 🌐 **Express**: Framework web de Node.js para manejar rutas y peticiones HTTP.
- 🔧 **IP.js**: Librería para manipular direcciones IP en JavaScript.
- 🔄 **Cors**: Middleware para Express que habilita el manejo de solicitudes CORS.
- 📦 **Body-parser**: Middleware para Express que analiza cuerpos de solicitud JSON.

## Instalación y Uso

1. **Clonar el Repositorio**:

   ```bash
   git clone https://github.com/tu_usuario/calculadora-ipv4.git
   cd calculadora-ipv4
   ```
   
2. **Instalar Dependencias**:
Asegúrate de estar en el directorio del backend. Instala las dependencias utilizando `npm` o `yarn`.

  ```bash
  cd backend
  npm install
  ```

3. **Ejecutar el Backend**:
   
  ```bash
  npm start
  ```
