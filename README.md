# Static Noise para Visual Studio Code

**Static Noise** es un tema oscuro para Visual Studio Code creado a partir de la paleta de [static-noise](https://github.com/hcastillaq/static-noise). Combina un fondo azul carbón con acentos fríos y colores de sintaxis suaves para mantener una jerarquía visual clara sin llenar el editor de contrastes agresivos.

El tema cubre tanto la interfaz de VS Code como el resaltado de código y la terminal integrada. Está pensado para quienes prefieren una apariencia oscura, sobria y con pequeños acentos de color que ayuden a identificar cada elemento rápidamente.

## Características

- Interfaz oscura consistente en el editor, barra lateral, pestañas, barra de estado y terminal.
- Cursor y elementos activos en cian para que el foco sea fácil de localizar.
- Colores diferenciados para funciones, palabras clave, cadenas, tipos, constantes, etiquetas y atributos.
- Comentarios en cursiva y con menor contraste para reducir el ruido visual.
- Compatibilidad con resaltado semántico de VS Code.
- Paleta ANSI incluida para mantener la identidad del tema en la terminal integrada.

## Paleta principal

| Uso | Color |
| --- | --- |
| Fondo del editor | `#141720` |
| Superficies oscuras | `#0F1117` |
| Texto principal | `#E6E2D6` |
| Cursor, etiquetas y acentos | `#72EAD5` |
| Funciones y atributos | `#83BFFF` |
| Palabras clave | `#C2A7FF` |
| Cadenas | `#A3D98B` |
| Tipos y clases | `#EDD071` |
| Constantes y números | `#F3A261` |
| Rojo de terminal | `#EF7785` |

## Requisitos

- Visual Studio Code `1.85.0` o una versión posterior.
- Un archivo de instalación `static-noise-*.vsix`.

Actualmente, la extensión no está publicada en Visual Studio Marketplace ni en Open VSX.

## Instalación manual

1. Descarga u obtén el archivo `static-noise-*.vsix` más reciente.
2. Abre la vista **Extensiones** en VS Code.
3. Selecciona el menú **…** de la vista de extensiones.
4. Elige **Instalar desde VSIX…**.
5. Selecciona el archivo descargado.
6. Abre la paleta de comandos con `Ctrl/Cmd + Shift + P`.
7. Ejecuta **Preferencias: Tema de color** y selecciona **Static Noise**.

También puedes instalarlo desde la terminal:

```sh
code --install-extension ./static-noise-0.0.1.vsix
```

Cambia la ruta y la versión del ejemplo por las del archivo que tengas disponible.

## Fuentes tipográficas recomendadas

La tipografía no está incluida en la extensión y debe instalarse por separado. Estas fuentes combinan bien con la paleta y mantienen una lectura clara en tamaños pequeños:

- [JetBrains Mono](https://www.jetbrains.com/lp/mono/): formas amplias, excelente diferenciación de caracteres y ligaduras opcionales.
- [Cascadia Code](https://github.com/microsoft/cascadia-code): una opción moderna de Microsoft con buenas ligaduras y gran integración en Windows.
- [Fira Code](https://github.com/tonsky/FiraCode): recomendada si prefieres ligaduras visibles para operadores y símbolos.
- [IBM Plex Mono](https://www.ibm.com/plex/): una alternativa sobria y técnica si prefieres trabajar sin ligaduras.

Después de instalar una fuente, puedes aplicar una configuración base como esta en tu `settings.json`:

```json
{
  "workbench.colorTheme": "Static Noise",
  "editor.fontFamily": "JetBrains Mono, monospace",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "editor.lineHeight": 22,
  "editor.semanticHighlighting.enabled": true,
  "terminal.integrated.fontFamily": "JetBrains Mono"
}
```

Sustituye `JetBrains Mono` por la fuente que elijas. Si usas IBM Plex Mono y no quieres ligaduras, cambia `editor.fontLigatures` a `false`.

## Actualización

Para actualizar el tema, instala un archivo VSIX con una versión superior siguiendo el mismo proceso de **Instalar desde VSIX…**. Si VS Code no conserva la selección después de la actualización, vuelve a elegir **Static Noise** desde **Preferencias: Tema de color**.

## Desarrollo y empaquetado

Instala las dependencias y ejecuta las validaciones:

```sh
npm ci
npm test
```

Para generar un paquete instalable:

```sh
npm run package
```

El archivo VSIX se escribe en `dist/`. También puedes validar únicamente la estructura y los colores del tema con:

```sh
npm run validate-theme
```

## Origen del tema

El archivo [`themes/static-noise-color-theme.json`](themes/static-noise-color-theme.json) se sincroniza desde una versión etiquetada del proyecto original. [`UPSTREAM.md`](UPSTREAM.md) registra la versión, el commit inmutable y la ruta de origen usados para generar esta extensión.

Las actualizaciones se realizan mediante GitHub Actions, que abre un pull request con la nueva versión y el SHA de origen. El archivo del tema no debe modificarse manualmente en este repositorio.

## Licencia

Distribuido bajo la licencia [MIT](LICENSE).
