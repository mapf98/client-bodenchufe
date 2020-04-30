# Cliente-BODEnchufe 🔌 💸

Cliente del E-Commerce BODEnchufe, esta es la aplicación disponible para todo público.

### Pre-Requisitos 📝 

A continuación nombraremos los requisitos necesarios para ejecturar la aplicación de manera local:

+ Entorno de ejecución: [Node.js](https://nodejs.org/es/) >= v11.14.0
+ Administrador de paquetes: [NPM](https://www.npmjs.com/) >= 6.7.0
+ Sistema de control de versiones: [GIT](https://git-scm.com/) >= 2.20

## Empecemos 📚

Las siguientes instrucciones servirán para tener un copia funcional del cliente:


Primero debemos clonar el repositorio actual en una carpeta (creada previamente en nuestro lugar de preferencia) con el siguiente comando:

```
git clone https://github.com/mapf98/client-bodenchufe.git
cd client-bodenchufe
```

Luego de clonar el repositorio y movernos a la carpeta creada, procedemos a instalar las dependencias del package.json con el siguiente comando:

```
npm install
```

A continuación, dos elementos claves de configuración:

+ Luego de instaladas las depedendencias, tenemos que agregar el .env a la raíz del proyecto (entregada por los estudiantes).

+ Depués iniciamos la API-BODEnchufe y cuando esté activa podremos continuar.

Luego de los pasos anteriores, iniciamos el cliente con el siguiente comando:

```
npm run serve
```

Y listo, el cliente ya estará disponible para su uso en la URL proporcionada en la terminal 🚀

## Construido con 🔧🔨

```
"dependencies": {
    "axios": "^0.19.2",
    "core-js": "^3.6.5",
    "register-service-worker": "^1.7.1",
    "vue": "^2.6.11",
    "vue-class-component": "^7.2.3",
    "vue-property-decorator": "^8.4.2",
    "vue-router": "^3.1.6",
    "vuetify": "^2.2.26",
    "vuex": "^3.3.0"
}
```

```
"devDependencies": {
    "@types/jest": "^25.2.1",
    "@typescript-eslint/eslint-plugin": "^2.30.0",
    "@typescript-eslint/parser": "^2.30.0",
    "@vue/cli-plugin-babel": "~4.3.1",
    "@vue/cli-plugin-eslint": "~4.3.1",
    "@vue/cli-plugin-pwa": "^4.3.1",
    "@vue/cli-plugin-router": "~4.3.1",
    "@vue/cli-plugin-typescript": "~4.3.1",
    "@vue/cli-plugin-unit-jest": "~4.3.1",
    "@vue/cli-plugin-vuex": "~4.3.1",
    "@vue/cli-service": "~4.3.1",
    "@vue/eslint-config-prettier": "^6.0.0",
    "@vue/eslint-config-typescript": "^5.0.2",
    "@vue/test-utils": "1.0.0-beta.33",
    "eslint": "^6.8.0",
    "eslint-plugin-prettier": "^3.1.3",
    "eslint-plugin-vue": "^6.2.2",
    "prettier": "^2.0.5",
    "sass": "^1.26.5",
    "sass-loader": "^8.0.2",
    "typescript": "~3.8.3",
    "vue-cli-plugin-vuetify": "~2.0.5",
    "vue-template-compiler": "^2.6.11",
    "vuetify-loader": "^1.4.3"
}
```

## Pruebas unitarias

Ya se cuenta integrada la herramienta para el manejo y automatización de pruebas unitarias pero aún no han sido incluidas para seguir el contendio de la materia.

## Authors

* [Alexander Fernández](https://github.com/alexjose131)
* [Diego De Quintal](https://github.com/diegodequintal)
* [Miguel Peña](https://github.com/mapf98)
