Catálogo de servicios SKN IT

Archivo que edita el cliente

El único archivo de contenido es Services.json.

El cliente puede:

editar textos;

agregar o eliminar elementos de las listas;

agregar servicios;

eliminar servicios;

mover un servicio a otra categoría cambiando sólo category;

agregar o eliminar categorías;

cambiar servicios relacionados.

No necesita modificar React, TypeScript ni CSS.

Regla principal

Cada servicio declara su categoría una sola vez:

"category": "support"

Ya no existe categories[].services.

Agregar un servicio

Copiar un objeto existente dentro de services.

Crear un id único.

Crear un slug único.

Elegir una categoría existente mediante category.

Reemplazar los textos.

Quitar las secciones opcionales que no correspondan.

Ejecutar:

npm run validate:services

Mover un servicio

Cambiar solamente:

"category": "security"

No hay que actualizar ninguna otra lista.

Eliminar un servicio

Eliminar su objeto completo dentro de services.

Si otro servicio lo menciona en relatedServices, el validador indicará exactamente qué referencia debe eliminarse.

Secciones opcionales

Estas propiedades pueden omitirse o quedar como arrays vacíos:

highlights

info

info.intro

info.includes

info.problemsSolved

info.process

info.idealFor

info.benefits

info.results

info.brands

info.useCases

cards

relatedServices

La web simplemente no renderiza la sección correspondiente.

Campos mínimos de un servicio

id

title

slug

category

shortDescription

heroDescription

contact.title

contact.description

Validación automática

npm run validate:services controla:

sintaxis JSON;

IDs repetidos;

slugs repetidos;

formato de IDs y slugs;

categorías inexistentes;

servicios relacionados inexistentes;

autorreferencias;

arrays y cards mal formados;

campos mínimos faltantes.

Se recomienda ejecutar el validador automáticamente antes de dev y build mediante predev y prebuild.