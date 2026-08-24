# Instructivo de edición de contenido web

La web utiliza dos archivos principales para administrar su contenido:

* `Services.json` → catálogo completo de servicios.
* `HomeContent.json` → contenido general de la página de inicio.

No es necesario modificar código, componentes React ni estilos para cambiar textos o agregar contenido.

---

# 1. Services.json

## ¿Para qué sirve?

Este archivo controla el catálogo completo de servicios de SKN IT.

Cualquier modificación realizada aquí puede reflejarse automáticamente en:

* Página general de Servicios.
* Página individual de cada servicio.
* Sección Servicios de la Home.
* Menús o enlaces que utilicen el catálogo.
* Servicios relacionados.

Por este motivo, **un servicio debe editarse únicamente en `Services.json`**.

No debe copiarse ni mantenerse una segunda versión del servicio en `HomeContent.json`.

---

## Categorías

Cada categoría tiene una estructura similar a:

```json
{
  "id": "support",
  "title": "Soporte y Operación IT",
  "slug": "soporte-it",
  "description": "Mantenemos tu infraestructura en funcionamiento, con menos incidentes y más previsibilidad."
}
```

### `id`

Identificador interno.

Ejemplo:

```json
"id": "support"
```

Se recomienda **no modificarlo** una vez publicado, porque los servicios utilizan este valor para indicar a qué categoría pertenecen.

---

### `title`

Nombre visible de la categoría.

```json
"title": "Soporte y Operación IT"
```

Puede modificarse libremente.

---

### `slug`

Identificador utilizado para URLs o navegación.

```json
"slug": "soporte-it"
```

Debe escribirse:

```text
en minúsculas
sin espacios
sin tildes
separando palabras con -
```

Ejemplo correcto:

```text
infraestructura-y-redes
```

Se recomienda no cambiarlo si la página ya está publicada.

---

### `description`

Descripción de la categoría.

```json
"description": "Mantenemos tu infraestructura en funcionamiento..."
```

Puede modificarse libremente.

---

# Servicios

Cada servicio tiene una estructura similar a:

```json
{
  "id": "mantenimiento-it",
  "title": "Mantenimiento IT",
  "slug": "mantenimiento-it",
  "category": "support",

  "shortDescription": "Descripción resumida.",

  "heroDescription": "Descripción principal del servicio.",

  "highlights": [
    "Menos fallos",
    "Mayor disponibilidad",
    "Soporte profesional"
  ],

  "info": {
    "intro": "Introducción del servicio.",

    "includes": [
      "Elemento incluido 1",
      "Elemento incluido 2"
    ],

    "problemsSolved": [
      "Problema 1",
      "Problema 2"
    ],

    "process": [
      "Paso 1",
      "Paso 2"
    ],

    "idealFor": [
      "Tipo de empresa 1",
      "Tipo de empresa 2"
    ],

    "benefits": [
      "Beneficio 1",
      "Beneficio 2"
    ],

    "results": [
      "Resultado 1",
      "Resultado 2"
    ]
  },

  "cards": [
    {
      "title": "Aspecto destacado",
      "description": "Descripción del aspecto."
    }
  ],

  "relatedServices": [
    "otro-servicio"
  ],

  "contact": {
    "title": "Consultá por este servicio",
    "description": "Contanos qué necesitás."
  }
}
```

---

## Campos principales

### `id`

Identificador técnico único.

```json
"id": "mantenimiento-it"
```

No debe repetirse entre servicios.

Se recomienda no modificarlo una vez publicado.

---

### `title`

Nombre visible del servicio.

```json
"title": "Mantenimiento IT"
```

Puede modificarse libremente.

---

### `slug`

Dirección de la página.

```json
"slug": "mantenimiento-it"
```

Genera una URL similar a:

```text
/servicios/mantenimiento-it
```

Modificarlo cambia la URL pública del servicio.

---

### `category`

Indica a qué categoría pertenece el servicio.

```json
"category": "support"
```

El valor debe coincidir exactamente con el `id` de una categoría existente.

Por ejemplo:

```json
{
  "id": "security",
  "title": "Seguridad IT"
}
```

permite utilizar:

```json
"category": "security"
```

Para mover un servicio de categoría solamente debe cambiarse este valor.

---

## Descripciones

### `shortDescription`

Descripción resumida.

Se utiliza principalmente en tarjetas, listados y referencias al servicio.

```json
"shortDescription": "Gestión proactiva de la infraestructura tecnológica."
```

Recomendación: una o dos oraciones.

---

### `heroDescription`

Descripción principal de la página del servicio.

```json
"heroDescription": "El mantenimiento preventivo permite..."
```

Puede ser más extensa que `shortDescription`.

---

## Highlights

```json
"highlights": [
  "Menos fallos",
  "Mayor disponibilidad",
  "Soporte profesional"
]
```

Son conceptos breves y destacados.

Recomendación: entre 2 y 4.

---

# Información detallada

## Introducción

```json
"intro": "Nuestro enfoque no es reactivo..."
```

Presentación general del servicio.

---

## Qué incluye

```json
"includes": [
  "Mantenimiento preventivo",
  "Actualización de sistemas",
  "Monitoreo"
]
```

Cada elemento aparece como un alcance concreto del servicio.

Se pueden agregar o quitar elementos libremente.

---

## Problemas que resuelve

```json
"problemsSolved": [
  "Fallas recurrentes",
  "Tiempos de inactividad"
]
```

Describe situaciones que el servicio ayuda a solucionar.

---

## Proceso

```json
"process": [
  "Relevamiento inicial",
  "Planificación",
  "Implementación",
  "Seguimiento"
]
```

El orden del array es el orden en el que se muestran los pasos.

---

## Ideal para

```json
"idealFor": [
  "PyMEs",
  "Empresas con múltiples sucursales"
]
```

Describe los perfiles o situaciones para los que se recomienda el servicio.

---

## Beneficios

```json
"benefits": [
  "Mayor estabilidad",
  "Menos incidentes"
]
```

Describe qué obtiene el cliente.

---

## Resultados

```json
"results": [
  "Infraestructura más estable",
  "Menos interrupciones"
]
```

Describe resultados concretos esperables.

---

# Marcas y casos de uso

Algunos servicios pueden incluir:

```json
"brands": [
  "Cisco",
  "MikroTik",
  "Ubiquiti"
]
```

o:

```json
"useCases": [
  "Dashboard de ventas",
  "Control de inventario"
]
```

Son campos opcionales.

Si no aplican, pueden omitirse o dejarse vacíos.

---

# Aspectos clave

```json
"cards": [
  {
    "title": "Prevención real",
    "description": "Detectamos problemas antes de que afecten la operación."
  }
]
```

Se pueden agregar o eliminar tarjetas.

---

# Servicios relacionados

```json
"relatedServices": [
  "mantenimiento-it",
  "administracion-de-redes"
]
```

Los valores deben coincidir exactamente con el `id` de otros servicios existentes.

Nunca debe escribirse aquí el nombre visible del servicio.

Incorrecto:

```json
"relatedServices": [
  "Mantenimiento IT"
]
```

Correcto:

```json
"relatedServices": [
  "mantenimiento-it"
]
```

---

# Contacto del servicio

```json
"contact": {
  "title": "Solicitá asesoramiento",
  "description": "Contanos tu situación y analizamos la mejor alternativa."
}
```

Estos textos aparecen al final de la página del servicio.

---

# Crear un servicio nuevo

La forma más segura es copiar un servicio existente completo y utilizarlo como plantilla.

Luego:

1. Crear un `id` nuevo y único.
2. Crear un `slug` nuevo y único.
3. Indicar una `category` existente.
4. Cambiar título y descripciones.
5. Modificar las diferentes listas.
6. Revisar `relatedServices`.
7. Guardar el archivo.
8. Ejecutar el validador.

No es necesario crear una nueva página ni modificar código.

---

# Eliminar un servicio

Eliminar el objeto completo correspondiente.

Luego revisar que su `id` no siga apareciendo dentro de `relatedServices` de otros servicios.

El validador también detectará este problema.

---

# Validación de Services.json

Antes de publicar:

```bash
npm run validate:services
```

Si el archivo es correcto aparecerá un mensaje similar a:

```text
✅ Services.json válido: 5 categorías, 16 servicios.
```

Si existen errores, **no publicar el archivo hasta corregirlos**.

---

# 2. HomeContent.json

## ¿Para qué sirve?

Este archivo controla el contenido propio de la página de inicio.

No contiene el catálogo de servicios.

Los servicios que aparecen en la Home siguen obteniéndose automáticamente desde:

```text
Services.json
```

Por lo tanto, si se cambia un servicio, debe modificarse únicamente `Services.json`.

---

# Hero principal

La estructura general es:

```json
"hero": {
  "trustPoints": [
    "SLA y trazabilidad",
    "Seguridad por diseño",
    "Infraestructura escalable"
  ],

  "secondaryCta": {
    "label": "Ver servicios",
    "href": "/servicios"
  },

  "slides": []
}
```

---

## Puntos destacados

```json
"trustPoints": [
  "SLA y trazabilidad",
  "Seguridad por diseño",
  "Infraestructura escalable"
]
```

Son las pequeñas frases que aparecen debajo del contenido principal del Hero.

Pueden modificarse, eliminarse o agregarse.

---

# Slides

Cada slide tiene una estructura similar a:

```json
{
  "id": "networking",

  "title": "Redes diseñadas para escalar.",

  "subtitle": "Diseño, instalación y gestión de infraestructura de red.",

  "theme": "Redes e infraestructura",

  "tone": "violet",

  "cta": {
    "label": "Ver servicios de red",
    "href": "/servicios#networking"
  },

  "image": {
    "dark": "/hero-redes-dark.jpg",
    "light": "/hero-redes-light.jpg",
    "alt": "Rack profesional de networking"
  }
}
```

---

## `id`

Identificador único del slide.

```json
"id": "networking"
```

No debe repetirse.

---

## `title`

Título principal.

Puede modificarse libremente.

---

## `subtitle`

Descripción del slide.

Puede modificarse libremente.

---

## `theme`

Pequeña etiqueta que identifica el tema.

```json
"theme": "Redes e infraestructura"
```

---

## `tone`

Controla la variante visual del Hero.

Valores permitidos:

```text
neutral
violet
cyan
green
```

No utilizar otros valores.

---

# CTA del slide

```json
"cta": {
  "label": "Ver servicios de red",
  "href": "/servicios#networking"
}
```

`label` es el texto visible.

`href` es el destino.

Para páginas internas utilizar:

```text
/servicios
/servicios/mantenimiento-it
/contacto
```

Para secciones de la Home:

```text
#contacto
#about
#faq
```

---

# Imágenes del Hero

```json
"image": {
  "dark": "/hero-dark.jpg",
  "light": "/hero-light.jpg",
  "alt": "Descripción de la imagen"
}
```

`dark` corresponde al tema oscuro.

`light` corresponde al tema claro.

Los archivos deben existir dentro de los recursos públicos de la web.

---

# Quiénes somos

```json
"about": {
  "sectionTitle": "Quiénes somos",

  "title": "15 años construyendo infraestructura tecnológica en Córdoba.",

  "text": [
    "Primer párrafo.",
    "Segundo párrafo.",
    "Tercer párrafo."
  ],

  "differentiators": [
    "Ejecución prolija",
    "Diagnóstico claro",
    "Equipo técnico estable"
  ],

  "stats": [
    {
      "label": "Años de experiencia",
      "value": "+15"
    }
  ]
}
```

---

## Textos

Cada elemento de:

```json
"text": []
```

se transforma en un párrafo independiente.

Se pueden agregar o eliminar párrafos.

---

## Diferenciales

```json
"differentiators": [
  "Ejecución prolija y documentada",
  "Diagnóstico claro",
  "SLA definido"
]
```

Se pueden modificar libremente.

---

## Estadísticas

```json
{
  "label": "Clientes activos",
  "value": "+40"
}
```

`value` es el dato destacado.

`label` explica qué representa.

---

# Fondo de la sección About

```json
"background": {
  "light": "/imagen-clara.jpg",
  "dark": "/imagen-oscura.jpg"
}
```

Permite seleccionar una imagen diferente para cada tema visual.

---

# Proceso de trabajo

```json
"process": {
  "title": "Proceso",

  "subtitle": "Una forma de trabajar profesional, repetible y medible.",

  "steps": [
    {
      "title": "Diagnóstico",
      "description": "Relevamos situación actual y definimos prioridades."
    },
    {
      "title": "Plan",
      "description": "Definimos alcance, tiempos y riesgos."
    }
  ]
}
```

Para agregar un paso simplemente se agrega otro objeto.

No escribir:

```text
01
02
03
```

Los números se generan automáticamente según el orden.

---

# Preguntas frecuentes

```json
"faq": {
  "title": "Preguntas frecuentes",

  "subtitle": "Respuestas claras. Cero vueltas.",

  "items": [
    {
      "question": "¿Trabajan con múltiples sucursales?",
      "answer": "Sí..."
    }
  ]
}
```

Se pueden agregar, eliminar o reordenar preguntas.

Cada pregunta debe tener:

```text
question
answer
```

---

# Contacto de Home

```json
"contact": {
  "kicker": "Contacto",

  "title": "Hablemos",

  "description": "Contanos qué necesitás y te devolvemos un diagnóstico con alcance claro.",

  "primaryCtaLabel": "WhatsApp directo",

  "secondaryCtaLabel": "Ver más formas de contacto →"
}
```

Este bloque controla los textos comerciales.

Los datos reales como:

```text
teléfono
email
WhatsApp
dirección
horarios
mapa
```

se administran desde la configuración general del sitio y no deben duplicarse aquí.

---

# Validación de HomeContent.json

Antes de publicar:

```bash
npm run validate:home
```

Resultado esperado:

```text
✅ HomeContent.json válido: 5 slides, 4 pasos y 9 preguntas frecuentes.
```

---

# Validar todo el contenido

También puede validarse todo de una sola vez:

```bash
npm run validate:content
```

Este comando revisa:

```text
Services.json
+
HomeContent.json
```

Si cualquiera de los dos contiene errores, la publicación debe detenerse.

---

# Reglas importantes

1. No utilizar comentarios `//` o `/* */` dentro de los JSON.
2. No borrar nombres de propiedades.
3. Utilizar siempre comillas dobles `"`.
4. Revisar las comas al agregar o eliminar elementos.
5. No repetir `id` o `slug`.
6. No inventar categorías: deben existir en `Services.json`.
7. No inventar IDs dentro de `relatedServices`.
8. No modificar código para cambiar contenido.
9. Ejecutar siempre el validador antes de publicar.
10. Ante un error de contenido que requiera decidir qué quiso decir el cliente, no corregirlo automáticamente: revisar el valor antes de publicar.

---

# Flujo recomendado

```text
Modificar JSON
      ↓
Guardar archivo
      ↓
npm run validate:content
      ↓
   ¿Es válido?
    /      \
  Sí        No
  ↓          ↓
Build      Corregir
  ↓
Deploy
```

Si el validador informa:

```text
✅ válido
```

el contenido está listo para publicación.

Si informa:

```text
❌ error
```

no debe publicarse hasta resolver el problema.
