# 📄 Formulario Base: HTML + JavaScript + Sass

Este repositorio contiene un formulario web completo, validado en frontend utilizando JavaScript moderno, con estructura modular, estilos en Sass, pruebas con Jest, protección básica contra ataques XSS y un enfoque escalable. Es ideal como plantilla base para nuevos proyectos, para tu portafolio o como punto de partida para aplicaciones reales.

---

## 🌐 Demo en vivo

📎 [Ver formulario en GitHub Pages](https://hectorjaviermorenoh.github.io/formulario-base-html-js-sass/formulario.html)

---

## 🚀 Características principales

- ✅ HTML semántico y accesible (`aria-*`, `role="alert"`, `aria-live`)
- 🧪 Validación de campos en `blur` y `input`
- 🔐 Prevención de XSS (`sanitizeHTML()`)
- 🧼 Normalización de texto (`normalizeText()`)
- 🎨 Estilos Sass (SCSS) con estructura modular
- 📱 Totalmente responsive y adaptativo a cualquier tamaño de pantalla (mobile-first)
- 🧪 Testing con Jest (funciones puras)
- 📁 Estructura profesional de carpetas y código
- 💬 Comentarios técnicos en inglés

---

## 📁 Estructura del proyecto

```bash
formulario-base-html-js-sass/
├── assets/                  # Recursos estáticos (opcional)
│   └── images/              # Imágenes si se usan
├── dist/                    # CSS compilado automáticamente desde Sass
│   └── style.css
├── js/                      # Archivos JavaScript
│   ├── formulario.js        # Lógica principal del formulario
│   └── validations.js       # Funciones puras para sanitización y normalización
├── styles/                  # Sass modular
│   ├── _variables.scss
│   ├── _reset.scss
│   ├── _formulario.scss
│   ├── _darkmode.scss
│   ├── _components.scss
│   ├── _grid.scss
│   ├── _breakpoints.scss
│   └── base.scss            # Archivo principal que importa los demás
├── test/                    # Pruebas unitarias con Jest
│   └── validations.test.js
├── formulario.html          # Formulario principal
├── index.html               # Entrada alternativa
├── package.json             # Configuración del proyecto y dependencias
├── jest.config.js           # Configuración de Jest
├── .gitignore               # Archivos ignorados por Git
└── README.md                # Documentación del proyecto
```

---

## 🛠️ Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/hectorjaviermorenoh/formulario-base-html-js-sass.git
cd formulario-base-html-js-sass
```

### 2. Instalar las dependencias

Este proyecto requiere [Node.js](https://nodejs.org/) instalado. Luego ejecutá:

```bash
npm install
```

Esto instalará:

- [`jest`](https://jestjs.io/) para ejecutar pruebas unitarias
- [`sass`](https://sass-lang.com/) para compilar SCSS
- [`@jest/globals`](https://jestjs.io/docs/api) para usar funciones sin require/import manual

---

### 3. Compilar estilos Sass

```bash
npm run sass
```

> Este comando observa los cambios en `/styles/` y actualiza `dist/style.css` automáticamente.

---

### 4. Ejecutar pruebas con Jest

```bash
npm test
```

> Corre los tests definidos en `test/validations.test.js`, incluyendo validaciones como `sanitizeHTML` y `normalizeText`.

---

## 🔍 Validaciones incluidas

- ✏️ Nombre y Apellido: no vacíos, solo letras y tildes permitidas, normalizados
- 📧 Email: formato correcto, obligatorio
- 📱 Teléfono: solo números, mínimo 10 dígitos, sin iniciar en cero
- 🔒 Contraseña: mínimo 8 caracteres, con mayúsculas, minúsculas, números y símbolos
- 🌎 País: selección válida de entre los permitidos
- 💬 Descripción: mínimo 20 caracteres o vacía, sin texto repetitivo, sanitizada contra XSS
- ✅ Checkbox de hobbies: entre 1 y 4 permitidos

---

## 🧾 Licencia

MIT. Libre para usar, modificar y compartir.

---

## ✍️ Autor

**Héctor Javier Moreno**
🔗 [@hectorjaviermorenoh](https://github.com/hectorjaviermorenoh)
