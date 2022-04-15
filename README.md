# Práctica 7. Digitalizando la colección de música de los abuelos
**Asignatura:** Desarrollo de sistemas informáticos  
**Nombres y correos:**  
Leonardo Alfonso Cruz Rodríguez - alu0101233093@ull.edu.es  
Eduardo González Pérez - alu0101319001@ull.edu.es  
José Orlando Nina Orellana - alu0101322308@ull.edu.es 

[![Node.js CI](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-f/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-f/actions/workflows/node.js.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-f&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-f)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-f/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-f?branch=main)

## Índice
- [Creación del directorio de trabajo y tareas previas](#id0)
- [Debugger TypeScript en VSC](#id0.1)
- [Mocha y Chai - Programación TDD](#id0.2)
- [Documentación con TypeDoc](#id0.3)
- [Cubrimiento de código utilizando Instanbul y Coveralls](#id0.4)
- [Integración continua de código fuente TypeScript a través de GitHub Action](#id0.5)
- [Calidad y seguridad del código fuente mediante Sonar Cloud](#id0.6)
- [Clases Genre, Album, Song, Author, Group, Artist, Playlist](#id1)
- [Clase DataBase](#id2)
- [Clase Gestor](#id3)
- [Clase DataBaseManipulator](#id4)
- [Ejemplo de uso Gestor](#id5)
- [Ejemplo de uso DataBaseManipulator](#id6)

## Creación del directorio de trabajo y tareas previas<a name="id0"></a>
Antes de empezar el proyecto es necesario instalar diversos paquetes para tener una estructura de directorios adecuada. Para ello el primer paso es crear el directorio principal:
```bash
$mkdir P7
$cd P7/
```
Una vez dentro, ejecutaremos los siguientes comandos:
```bash
$npm init --yes
$npm install -D eslint eslint-config-google @typescript-eslint/eslint-plugin @typescript-eslint/parser
$tsc --init
$mkdir src
$touch README.md
```

Tras ejecutarlos habremos inicializado el Node Project Manager con la herramienta Eslint y el compilador de TypeScript. Además de crear el directorio donde estará almacenado el código y el fichero `README.md`.  
  
El siguiente paso es configurar el fichero `tsconfig.json` descomentando las siguientes lineas dentro del fichero:
- `rootDirs` se debe indicar el directorio `src` para almacenar el código principal, la carpeta `tests` será para almacenar las pruebas a la hora de programar en TDD.  
```json
"rootDirs": ["./src","./tests"]
```
- `declaration` se requerirá para usar el debugger.  
```json
"declaration": true
```  
- `sourceMap` se necesita cuando se exportan funciones.  
```json
"sourceMap": true
```
- `outDir` para almacenar los archivos compilados en un directorio concreto.  
```json
"outDir": "./dist"
```

Por último, faltaría iniciar el directorio git. Pero antes, crearemos el fichero `.gitignore` para evitar que git tenga en seguimiento lo que introduzcamos en dicho archivo.
```bash
$touch .gitignore
$cat .gitignore
node_modules/
dist/
package-lock.json
.vscode/
```
Ahora si, y para finalizar, iniciaremos el repositorio git y añadiremos el remoto:
```bash
$git init
$git remote add origin git@github.com:ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-f.git
```

## Debugger TypeScript en VSC<a name="id0.1"></a>
Para utilizar el debugger en nuestro proyecto pincharemos en el icono de la barra situada a la izquierda:  
  
![image](https://user-images.githubusercontent.com/72469549/156930570-8ada3bf7-a9b6-4ff4-acb3-77925e9298d6.png)
  
A continuación pinchamos en `cree un archivo launch.json` y se abrirá el siguiente menu desplegable:
  
![image](https://user-images.githubusercontent.com/72469549/156930748-8ce798ba-fa91-4f74-a026-1cb969c18514.png)

Seleccionaremos `Node.js` y se abrirá el fichero `launch.json`. En él solo habrá que cambiar la dirección de `outFiles`, quedaría de la siguiente manera:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/src/ejemplo.ts",
            "outFiles": [
                "${workspaceFolder}/dist/**/*.js"
            ]
        }
    ]
}
```

Para debuggear un archivo, debe compilarse previamente y darle al botón verde en la parte superior.  
  
![image](https://user-images.githubusercontent.com/72469549/156931099-b62aecbb-80c9-441f-96dd-493d35cf9052.png)

## Mocha y Chai - Programación TDD<a name="id0.2"></a>

Para seguir el paradigma de programación dirigido por pruebas (TDD) instalaremos los paquetes Mocha y Chai, además de crear el directorio `tests` para almacenar las pruebas.  
```bash
$npm install -D mocha chai @types/mocha @types/chai ts-node
$mkdir tests
```
A continuación crearemos el fichero `.mocharc.json` para configurar Mocha con el siguiente contenido.
```json
{
	"extension": [
		"ts"
	],
	"spec": "tests/*.spec.ts",
	"require": "ts-node/register"
}
```
Por último, dentro del archivo `package.json`, cambiaremos la opción de test por Mocha. Quedaría de la siguiente manera:  
```json
{
  "name": "testingproyect",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.3.0",
    "@types/mocha": "^9.1.0",
    "chai": "^4.3.6",
    "mocha": "^9.2.1",
    "ts-node": "^10.7.0"
  }
}
```
Ahora solo faltaría crear los tests con la extensión `.spec.ts` dentro de la carpeta `tests`, y ejecutarlos con el siguiente comando:
```bash
$npm test
```

## Documentación con TypeDoc<a name="id0.3"></a>
El primer paso para realizar la documentación con la herramienta `TypeDoc` sería instalar la librería correspondiente:
```bash
$npm install -D typedoc
```
A continuación se debe crear el archivo `typedoc.json` para escribir la configuración con los parámetros necesarios, el contenido del fichero quedaría como se ve a continuación:
```json
{
    "entryPoints": [
        "./src/ejemplo-1",
        "./src/ejemplo-2"
    ],
    "out": "./docs"
}
```
Cabe destacar que en el parámetro `entryPoints` deben ir los ficheros que se van a documentar uno por uno.  
El paso siguiente sería escribir la documentación en nuestro código. Para ello debemos escribir `/**` encima de una función y nos aparecerá lo siguiente:  
  
![image_2022-03-08_19-23-34](https://user-images.githubusercontent.com/72469549/157311335-0db0a914-62f8-4cd4-b4da-18b6d01a6f03.png)

Teclearemos enter y se nos generará automáticamente una plantilla por defecto para escribir la documentación a cerca de la función.

![image](https://user-images.githubusercontent.com/72469549/157311857-05a84b71-e88b-4816-adb3-f05ca75f08fb.png)

El siguiente paso sería rellenarla, por ejemplo de la siguiente manera:

```typescript
/**
 * Saluda al mundo un número de veces determinado
 * @param veces Almacena el número de veces que se saludará
 * @returns La cadena con los saludos concatenados
 */
function hello(veces: number): string {
    let hi = "";
    for(let i = 0; i < veces; i++)
        hi += "¡Hello world! ";
    return hi;
}
```

Por último, debemos añadir al fichero `package.json` un parámetro que nos permitirá ejecutar la documentación con el comando `npm run doc` y se guardaría en `./docs`.  
El fichero quedaría de la siguiente manera:

```json
{
  "name": "p4",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha",
    "doc": "typedoc"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.3.0",
    "@types/mocha": "^9.1.0",
    "chai": "^4.3.6",
    "mocha": "^9.2.1",
    "ts-node": "^10.7.0",
    "typedoc": "^0.22.13"
  }
}
```

## Cubrimiento de código utilizando Instanbul y Coveralls<a name="id0.4"></a>

Primero instalaremos los paquetes y dependencias necesarios para usar la herramientas:

```bash
$npm install -D nyc coveralls
```

A continuación, añadiremos en el fichero `package.json` un script para realizar el cubrimiento de código. `"coverage": "nyc npm test"`.
El fichero quedaría de la siguiente manera:

```json
{
  "name": "p4",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha",
    "doc": "typedoc",
    "coverage": "nyc npm test"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.3.0",
    "@types/mocha": "^9.1.0",
    "chai": "^4.3.6",
    "mocha": "^9.2.1",
    "ts-node": "^10.7.0",
    "typedoc": "^0.22.13"
  }
}
```

Para ejecutar este script simplemente introducimos por consola:
```bash
$npm run coverage
```

A continuación debemos entrar a la página web <a href = "http://www.coveralls.io/">coveralls.io</a> y habilitaremos el cubrimiento de código en nuestro proyecto.
(El proyecto debe estar en público para el uso de coveralls.io gratuito).

**Imagen de la página con el repositorio**

Una vez habilitado, entraremos en `details` y copiaremos la línea donde pone *repo_token*. Después crearemos el archivo `.coveralls.yml` y añadiremos dicha línea.
El archivo quedaría de la siguiente manera:

```
repo_token: RA8doCOxxJr3ALE8PDVTh3g0AAmYBcPQW
```

El siguiente paso sería añadir al script `coverage` en el fichero `package.json` los comandos `nyc report --reporter=text-lcov | coveralls && rm -rfv .nyc_output`.
El script quedaría de la siguiente manera:

```json
"coverage": "nyc npm test && nyc report --reporter=text-lcov | coveralls && rm -rfv .nyc_output"
```

Ahora cuando ejecutemos por consola `npm run coverage` en la página del repositorio en `Coveralls` se nos mostrará la información del cubrimiento del código.
Para añadir el `Batch` del cubrimiento al `README.md` se copiará directamente de la página y se pegará en el fichero.

## Integración continua de código fuente TypeScript a través de GitHub Action<a name="id0.5"></a>

El primer paso es instalar el paquete TypeScript:

```
$npm install -D typescript
```

Una vez instalado, entraremos a la página del repositorio y nos dirigiremos a Actions, y dentro de dicho apartado bajaremos hasta Continuous integration.
![image](https://user-images.githubusercontent.com/72469549/160702017-d769658d-cfc4-4ecc-a0d5-ca4caa187c8f.png)  

Buscaremos `Node.js` y le daremos a `Set up this workflow`.

![image](https://user-images.githubusercontent.com/72469549/160702039-bf36ceec-f903-4155-8450-32a70b19f276.png)  

Una vez dentro es importante cambiar el final del fichero por el siguiente contenido:

```
steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm install
    - run: npm test
```

Y realizamos un commit para guardar el fichero generado. Opcionalmente se puede añadir un `badge` en al informe en las siguientes opciones:

![image](https://user-images.githubusercontent.com/72469549/160701932-68d8d9b2-d347-49eb-90c7-76736f17073f.png)

![image](https://user-images.githubusercontent.com/72469549/160701954-2845ea6d-4a1e-4aaf-88c6-31a35a0ee546.png)

A continuación crearemos el fichero `coveralls.yml` y le pondremos el siguiente contenido:

```yml
name: Coveralls

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - name: Cloning repo
      uses: actions/checkout@v2
    - name: Use Node.js 16.x
      uses: actions/setup-node@v2
      with:
        node-version: 16.x
    - name: Installing dependencies
      run: npm install
    - name: Generating coverage information
      run: npm run coverage
    - name: Coveralls GitHub Action
      uses: coverallsapp/github-action@master
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}

```

Ahora con cada push se comprobarán los tests y el recubrimiento de código automáticamente y se podrá revisar en Github Actions.

## Calidad y seguridad del código fuente mediante Sonar Cloud y GitHub Actions<a name="id0.6"></a>

Para poder utilizar la herramienta `Sonar Cloud` debemos tener el repositorio en una organización. En este caso lo tendremos alojado en la organización de la asignatura.
Una vez creada la cuenta en la página <a href = "http://www.sonarcloud.io/">sonarcloud.io</a> añadiremos el repositorio dándole al símbolo `+`. Veremos que nos analizará 
el proyecto.

A continuación deberemos ir al apartado `administration` y en el desplegable seleccionaremos `analysis method` y desactivaremos el análisis automático.
El siguiente paso sería entrar en el tutorial de github actions, copiaremos el `SONAR_TOKEN`, accedemos al apartado settings del repositorio, entramos en secrets,
dentro le daremos a actions y añadiremos un nuevo secreto con el título y el valor que nos ha dado la `Sonar Cloud`.

Una vez añadido el secreto, en la página de `Sonar Cloud` le daremos a `continue`. Seleccionaremos *Other* ya que este proyecto está programado en TS y nos mostrará el 
contenido que deberá tener el fichero de flujo de trabajo en github actions. Por lo tanto, el siguiente paso sería crear el fichero `sonarcloud.yml` dentro del directorio
`.github/workflows` y copiaremos el contenido dado por la página. Es necesario cambiar un poco el archivo y añadir pasos, el fichero quedaría de la siguiente manera:

```yml
name: Sonar-Cloud 

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - name: Cloning repo
        uses: actions/checkout@v2
        with:
          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
      - name: Use Node.js 16.x
        uses: actions/setup-node@v2
        with:
          node-version: 16.x
      - name: Installing dependencies
        run: npm install
      - name: Generating coverage report
        run: npm run coverage
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```
**¡Importante!** Se deberá cambiar el nombre de las ramas dentro del fichero en caso de que sea necesario.

El paso siguiente sería crear el fichero `sonar-project.properties` y pegar el contenido dado por la página. Modificandolo un poco quedaría de la siguiente manera:

```properties
sonar.projectKey=ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-f
sonar.organization=ull-esit-inf-dsi-2122

# This is the name and version displayed in the SonarCloud UI.
sonar.projectName=github-actions-sonar-cloud
sonar.projectVersion=1.0

# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
sonar.sources=src

# Encoding of the source code. Default is default system encoding
sonar.sourceEncoding=UTF-8

# Coverage info
sonar.javascript.lcov.reportPath=coverage/lcov.info
```

Y ya estaría configurada la `Gihub Actions` de `Sonar Cloud`. Por último, para añadir el badge a la documentación del proyecto, nos dirigiremos al apartado de información
abajo a la izquierda y copiaremos el badge.

## Clases Genre, Album, Song, Author, Group, Artist, Playlist<a name="id1"></a>

La clase `Genre` representa un género musical que tiene como atributos: nombre, autores, albumes y canciones.

La clase `Album` representa un album de canciones que tiene como atributos: nombre, autor, año de publicación, géneros y canciones.

La clase `Song` representa una canción que tiene como atributos: nombre, autor, duración, géneros, número de reproducciones y si es un single o no.

La clase abstracta `author` representa a un autor que tiene como atributos: un nombre, géneros, albumes y oyentes mensuales.

La clase `group` que deriva de `author` representa un grupo que tiene como atributos: un nombre, los artistas que lo componen, el año de creación, los géneros, los albumes y los oyentes mensuales.

La clase `artist` que deriva de `author` representa a un artista que tiene como atributos: un nombre, grupos a los que pertenece, géneros, albumes, cancionesy oyentes mensuales.

La clase `playlist` que representa a una playlist que tiene como atributos: un nombre, una serie de canciones, la duración de la playlist, géneros asociados y una variable `owner` de tipo `Property` que indica si la playlist esta creada por el sistema o por un usuario.

## Clase DataBase<a name="id2"></a>

Declararemos una interfaz `Schema` que tendrá la base datos. La base de datos contendrá un array de géneros, albumes, canciones, artistas, grupos y playlists.

Crearemos la clase `DataBase` que se encargara de manipular la base de datos. En el constructor abriremos un JSON o crearemos si es que no esta creado un fichero con el nombre pasado como parámetro. Y con las funciones init comprobaremos si cada uno de los arrays esta en el fichero y si no esta lo crearemos.

Las funciones `find` se encargarán de buscar en la base de datos el índice del objeto dentro de array de la base de datos. Si no lo encuentra devuelve un -1, en caso contrario devuelve otro número.

Las funciones `set` se encargán de meter un objeto nuevo en la base de datos. Reciben como parámetro el objeto a meter, hacen un `push` en el array correspondiente y hacen un `write` para guardar los cambios.

Las funciones `get` se encargán de devolver un objeto de la base de datos recibiendo como parámetro el nombre del objeto. Primero se buscará el índice en el array haciendo uso del `find` y con ese índice se puede devolver el valor de objeto con un `at`.

Las funciones `remove` se encargán de eliminar un objeto de la base de datos recibiendo como parámetro el nombre del objeto. Primero se buscará el índice en el array haciendo uso del `find` y con ese índice se puede eliminar ese objeto haciendo uso del `splice` y un `write` para guardar los cambios.

Las funciones `view` se encargá de recoger toda la información un objeto en un string y devolverlo.

Las funciones `sort` se encargán de ordenar un array de canciones de una playlist recibiendo como parámetro el nombre del playlist. Buscará el índice de la playlist en la base de datos y luego la ordenerá con el `sort`.

Las funciones `modify` se encargarán de modificar un atributo de un objeto recibiendo como parámetro el nombre del objeto y el nuevo atributo. Se buscará primero el objeto con `find` y se cambiará el atributo con el `assign` y por último se hará un `write` para guardar los cambios.

## Clase Gestor<a name="id3"></a>

Declararemos un enumerado, `Commands`, que contendrá todos los comandos que contendrá el menú principal como seleccionar una playlist, añadir playlists, eliminar playlists.

Declararemos otro enumarado, `CommandsPlaylist`, que contendrá todos los comandos que hay dentro de una playlist como añadir o borrar canciones y métodos de ordenación de las playlists.

Crearemos la clase `Gestor` que se encargará de la interfaz del usuario. Tendrá como atributo un objeto de tipo `DataBase`. Esta clase permitirá crear nuevas playlist, navegar por estas, añadir o eliminar canciones, etc.

La función `promptUser` se encarga del menú principal. Mientras el comando sea distinto de `Quit` se seguirá ejecutando. Primero se limpiará la consola y se mostrarán todas las playlists con `viewPlaylists`. Con el método `prompt` del modulo inquirer recogeremos la respuesta del usuario por línea de comando. Con el switch filtraremos la respuesta del usuario y ejecutaremos el comando.

La función `promptUserPlaylist` se encarga del menú de una playlist pasada como parámetro. Mientras el comando sea distinto `Quit` en cada iteración se limpiará la consola, se mostrará por pantalla la información general de la playlist con la función `viewPlaylist`, se recogerá el comando con el `prompt` y se ejecutará el comando filtrado con un switch.

La función `promptAddSong` se encarga del añadir una canción a una playlist recibiendo como parámetro el nombre de la playlist. Se limpiará la consola, se recogerá el nombre de la canción con el `prompt`, se comprueba si la canción existe en la base de datos haciendo uso del `findSong`. Si `findSong` devuelve un -1 significa que la canción no existe por lo que mostramos un mensaje de error indicando que no existe. Si devuelve distinto de -1 añadimos la canción haciendo uso de `setSongToPlaylist` y actulizamos la duración de la playlist con `updateDurationPlaylist`. 

La función `promptRemoveSong` se encarga de eliminar una canción de una playlist recibiendo como parámetro el nombre de la playlist. Limpiará la consola, recogerá el nombre de la canción haciendo uso de `prompt` y eliminará la canción haciendo uso de `removeSongFromPlaylist` y actulizando la duración de la playlist con `updateDurationPlaylist`. 

La función `promptGenreSort` ordena una playlist según la duración de la canción recibiendo como parámetro el nombre de la playlist a ordenar. Limpia la consola y usa `genreSort` para ordenar la función.

La función `promptDurationSort` ordena una playlist según un género recibiendo como parámetro el nombre de la playlist a ordenar. Limpia la consola, lee por línea de comando el nombre del género y usa `genreSort` para ordenar la playlist.

La función `promptAlphabeticalSongNameSort` ordena una playlist alfabéticamente según el nombre de la canción recibiendo como parámetro el nombre de la playlist a ordenar. Limpia la consola y usa `alphabeticalSongNameSort` para ordenar la playlist.

La función `promptAlphabeticalAuthorNameSort` ordena una playlist alfabéticamente según el nombre del autor recibiendo como parámetro el nombre de la playlist a ordenar. Limpia la consola y usa `alphabeticalAuthorNameSort` para ordenar la playlist.

La función `promptNumberOfReproductionSort` ordena una playlist según el número de reproducciones recibiendo como parámetro el nombre de la playlist a ordenar. Limpia la consola y usa `numberOfReproductionSort` para ordenar la playlist.

La función `promptSelectPlaylist` se encarga de abrir el menú de una playlist. Limpia la consola, lee por línea de comando el nombre de la playlist con `prompt` y abre el menú de la playlist con `promptUserPlaylist`.

La función `promptAddPlaylistFromScratch` añade una nueva playlist a la base de datos. Primeramente limpia la consola, recoge por línea de comando el nombre de la nueva playlist, comprueba si existe otra playlist con ese nombre usando el `findPlaylist`. En caso que no exista crea un nuevo objeto `Playlist` con solo el nombre como atributo y se inserta el objeto a la base de datos con la función `setPlaylist`.

La función `promptRemovePlaylist` elimina una playlist. Se limpia la consola, se recoge el nombre de la playlist con `prompt`. Se comprueba si la playlist existe, si no existe se muestra un mensaje indicando el error. Si existe se comprueba si la playlist es del sistema, si es del sistema se indica que no se puede borrar, en caso de que no sea del sistema se borra la playlist.

## Clase DataBaseManipulator<a name="id4"></a>

### **<u>Commands</u>**

El enumerado `Commands` define los comandos del menú principal: añadir, eliminar, modificar o visualizar información.

El enumerado `CommandsAdd` define los comandos para añadir géneros, artistas, grupos, canciones o albumes.

El enumerado `CommandsRemove` define los comandos para eliminar géneros, artistas, grupos, canciones o albumes.

El enumerado `CommandsModify` define los comandos para modificar géneros, artistas, grupos, canciones o albumes.

El enumerado `CommandsVisualizer` define los comandos para visualizar información asociada a un artista o grupo y poder filtrar dicha información.

### **<u>Getters</u>**

La función `getArray` recoge por línea comando un array de strings usando el `prompt`. Recoge un string completo y luego lo divide por comas convirtiendolo en un array de strings.

La función `getString` recoge por línea comando un string usando el `prompt`.

La función `getNumber` recoge por línea comando un número usando el `prompt`.

La función `getBoolean` reocge por línea de comando un boolean usando el `prompt`.

### **<u>Prompt</u>**

La función `promptUser` muestra por pantalla en menú principal donde se puede elegir una opción de `Commands`, se filtra la opción con un switch y se ejecuta.

La función `promptAddInformation` muetra por pantalla las opciones del `CommandsAdd`, se filtra la opción elegida con un switch y se ejecuta dicho comando.

La función `promptRemoveInformation` muestra por pantlla las opciones del `CommandsRemove`, se filtra la opción elegida con un switch y se ejecuta el comando. 

La función `promptVisualizerInformation` muestra por pantalla el menú para visualizar información asociada a un artista o grupo. Selecciona un opción del prompt de tipo `list` y lo filtra con un switch.

La función `funcViewInfo` busca información asociada a un autor o un grupo. Devuelve dos array dentro de un array, el primero contiene las canciones y el segundo los albumes.

### **<u>Sort Methods</u>**

La función `numberReproductionsSort` ordena un array por el número de reproducciones de las canciones.

La función `alphabeticalSort` ordena un array alfabéticamente.

La función `yearPublicactionSort` ordena un array de albumes por el año de publicación.

La función `singleSort` ordena un array de canciones por el atributo single.

### **<u>Modify Methods</u>**

La función `promptModifyInformation` muestra por pantalla el menú para modificar géneros, artistas, grupos, albumes, canciones. Filtra el comando con switch.

La función `funcModifyGenre` modifica los atributos de un género. Limpia la consola, recoge el nombre del género con el `prompt`, muestra toda la información asociada a ese género con `viewGenre`. Mediante un `prompt` de tipo `list` elegimos el atributo que queremos modificar, con el switch filtramos y modificamos el atributo.

La función `funcModifyArtist` modifica los atributos de un artista. Limpia la consola, recoge el nombre del artista con el `prompt`, muestra toda la información asociada a ese artista con `viewArtist`. Mediante un `prompt` de tipo `list` elegimos el atributo que queremos modificar, con el switch filtramos y modificamos el atributo.

La función `funcModifyGroup` modifica los atributos de un grupo. Limpia la consola, recoge el nombre del grupo con el `prompt`, muestra toda la información asociada a ese grupo con `viewGroup`. Mediante un `prompt` de tipo `list` elegimos el atributo que queremos modificar, con el switch filtramos y modificamos el atributo.

La función `funcModifyAlbum` modifica los atributos de un album. Limpia la consola, recoge el nombre del album con el `prompt`, muestra toda la información asociada a ese album con `viewAlbum`. Mediante un `prompt` de tipo `list` elegimos el atributo que queremos modificar, con el switch filtramos y modificamos el atributo.

La función `funcModifySong` modifica los atributos de una canción. Limpia la consola, recoge el nombre de la canción con el `prompt`, muestra toda la información asociada a esa canción con `viewSong`. Mediante un `prompt` de tipo `list` elegimos el atributo que queremos modificar, con el switch filtramos y modificamos el atributo.

## Métodos de inserción de objetos en la base de datos

Hemos optado por crear una jerarquía de dependencias a la hora de insertar un objeto en la playlist. De tal manera que cuando se inserte un objeto nuevo, es posible
que los demás cambien con dicha inserción.

### <u>**Add Genre**</u>
Este es el objeto más sencillo de añadir, ya que no depende de ningún otro objeto y se puede instanciar con los atributos vacíos (a excepción del nombre del género).
Primer se invoca al `prompt` para pedirle al usuario el nombre del género. En caso de que no exista, lo crea y en caso contrario le indica por mensaje que ya existe.

### <u>**Add Artist**</u>
Primera etapa de inserción de un artista. Todos los datos que se le pidan al usuario se solicitarán haciendo uso del `prompt`. Primero se solicita el <u>nombre</u> del 
artista, se comprueba que el artista no existe y a continuación se pide el <u>género</u> (Si el género no existe, se crea). Después de esto, se le pregunta al usuario si desea 
añadir más géneros al artista, en caso afirmativo se repetiría el proceso anterior. El siguiente paso es solicitar al usuario el número de oyentes de dicho artista. 
Con este último requisito, termina la obtención de datos del artista. 

En la segunda etapa crearemos al artista y procederemos a la expansión de los objetos dependientes. En este caso, únicamente expanderíamos al objeto `Genre`, de tal manera que
en el array de artistas de los géneros introducidos se añadirá el nuevo artista.

### <u>**Add Group**</u>
Primera etapa de inserción de un grupo. Todos los datos que se le pidan al usuario se solicitarán haciendo uso del `prompt`. Primero se solicita el 
<u>nombre</u> del grupo y se comprueba que el grupo no existe. A continuación se pide el <u>año</u> de creación del grupo y los géneros de las canciones 
que producen (Si el género no existe, se crea). Después de esto, se le pregunta al usuario si desea añadir más géneros al grupo, en caso afirmativo se 
repetiría el proceso anterior. Lo siguiente que se solicita es el nombre de los <u>artistas</u> del grupo. Si alguno de los artistas introducidos no existe 
se indicará. Por último se pedirá los <u>oyentes mensuales</u> del grupo.

En la segunda etapa crearemos el grupo y haremos la expansión a los artistas, de tal manera que los objetos `Artist` se les añadirá el grupo al que ahora 
pertenecen y los géneros del nuevo grupo. También se sumarán los oyentes mensuales del grupo a los oyentes mensuales del artista. Por último haremos 
expansión a los objetos `Genre`, de tal manera que en el array de grupos de los géneros introducidos se añadirá el nuevo grupo.

### <u>**Add Album**</u>
Primera etapa de inserción de un álbum. Todos los datos que se le pidan al usuario se solicitarán haciendo uso del `prompt`. Primero se solicita el 
<u>nombre</u> del álbum y se comprueba que el álbum no existe. Después solicitará al usuario el <u>año</u> de publicación del álbum y el 
<u>autor</u> del álbum. Si el autor no es ningún artista o grupo registrado se indicará al usuario. Por último, le pide al usuario la cantidad de canciones
que almacena el álbum y después le pregunta el nombre de las <u>canciones</u>.
Si alguna de las canciones no existe, se indicará y preguntará de nuevo.

En la segunda etapa creaaremos el álbum y haremos expansión al autor (que puede ser tanto un objeto `Artist` como un objeto `Genre`), de tal manera que 
en el array de albumes del autor se añadirá el nuevo album. Además se expandirá al objeto `Genre`, de tal manera que al array de álbumes del género introducido
se le añadirá el nuevo álbum.

### <u>**Add Song**</u>
Primera etapa de inserción de una canción. Todos los datos que se le pidan al usuario se solicitarán haciendo uso del `prompt`. Primero se solicita el <u>nombre</u> de la canción y se comprueba que no existe. A continuación, se pide introducir el nombre del <u>autor</u>, comprobando si un artista o grupo coincide y por lo tanto existe. Desupués, se solicita la <u>duración</u> de la canción, en su formato decimal, en el que la parte entera corresponde a los minutos y la decimal a los segundos. Tras esto, se solicitan los <u>géneros</u>; la confirmación con yes or no sobre si la canción fue publicada como un <u>single</u>; y el <u>número de reproducciones</u>. 

En la segunda etapa crearemos la canción y haremos la expansión tanto del autor como de los géneros. Para la <u>expansión del autor</u>, se determina si es un artista o un grupo, variando el comportamiendo en ambos casos. Para la <u>expansión en un artista</u>, actualizaremos sus géneros, añadiendo los posibles nuevos géneros de la canción al artista, y al mismo tiempo, actualizar los artistas del género; y le añadiremos el nombre de la nueva canción a su lista de canciones. Por el otro lado, en la <u>expansión de un grupo</u>, solo tendremos que actualizar sus géneros. Por último, en la <u>expansión de géneros</u>, le añadimos a los géneros de la canción, el nombre de la misma en su lista de canciones. 

### <u>**Esquema de inserción**</u>
En el siguiente diagrama podemos observar las dependencias entre objetos a la hora de insertarlos. Cada objeto es representado por un color, los atributos que contienen una línea
de color, indican que la inserción del objeto representado por dicho color actualizará el atributo mencionado.

![](https://gyazo.com/81190215e44d53c4bb573e7e15b61dad.png)

## Métodos de eliminación de objetos en la base de datos

La eliminación de objetos sigue el mismo esquema y métodología que la inserción, pero a la inversa. De forma que la eliminación más básica sería la
de un álbum, en la que solo se elimina extrictamente el nombre del álbum en los objetos en los que aparece. Cuando se va avanzando en la jerarquía hasta la 
eliminación del género realizando varias expansiones de elimniación de forma que cualquier rastro del género u otro objeto que se quiera eliminar 
desaparezca completamente de la base de datos.

En el siguiente esquema se puede observar la jerarquía de eliminación, que se asemeja bastante a la de inserción como se ha mencionado anteriormente.
Las líneas de colores indican que en caso de eliminación del objeto que representa dicho color, el objeto no se eliminaría. En caso de tener una "X" en vez de una línea, el objeto podría ser eliminado.

![](https://gyazo.com/52b399e622a31d18b9a0958f484924b8.png)

## Ejemplo de uso Gestor<a name="id5"></a>

Del menú seleccionaremos la opción `Gestor`.

![](https://gyazo.com/cf7360517d625be5d6fd005a47235cbd.png)

Se abrirá un menú con todas las playlists existentes y con información general.

![](https://gyazo.com/f8d6af50914f4f3fcfbe8e75ced5fd08.png)

Selecionaremos por ejemplo la opción `Select Playlist` y pondremos el nombre de la playlist que queremos seleccionar, por ejemplo la Playlist N1.

![](https://gyazo.com/a84cf04ef2ffb044bf197e99e0b8585e.png)

Se nos abrirá la playlist con toda la información asociada al mismo como duración de la playlist, canciones con sus atributos, etc.

![](https://gyazo.com/f8ffbeb0b97b0f15c99ae977e89016dd.png)

## Ejemplo de uso DataBaseManipulator<a name="id6"></a>

Del menú seleccionaremos la opción `DataBaseManipulator`.

![](https://gyazo.com/cf7360517d625be5d6fd005a47235cbd.png)

Se abrirá un menú con las opciones para manipular la base de datos como añadir nuevos objetos, eliminar objetos existentes, modificar objetos y visualizar objetos.

![](https://gyazo.com/a60df934e1c8e7537e1db43e74c4c515.png)

Y seleccionaremos la opción `Visualize informtation about an author` y nos aparacerá un menú como el siguiente.

![](https://gyazo.com/c3d60ac034943ee2f76a1ec08d9aa4e3.png)

Por ejemplo, si queremos buscar información sobre Bruno Mars seleccionaremos `View info about an author` e introduciremos el nombre.

![](https://gyazo.com/b44d36232f872a5952cd592323313a15.png)

Y nos aparecerá las cacniones de Bruno Mars y los albumes en los que ha participado.

![](https://gyazo.com/167f2d4ed21be6672fdcc54465910b33.png)

También podemos ordenar dicha información, como por ejemplo ordenarlo alfabéticamente con la opción

