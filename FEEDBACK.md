# Feedback del Trabajo Práctico (TP2 — MongoDB)

## Integrantes

A partir de los commits del repositorio:

- **Cris Ramírez**
- **Lucas Carrasco**
- **Nicolás Blanco**
- **Nicolás Dondero** (`NicolasDondero`)
- **Marcos**

> Trabajo repartido entre los integrantes del equipo. 👏

---

## Resumen General

¡Buen trabajo! 🎉 La entrega cumple el MVP con un modelado documental **referenciado**, validación con **Joi**, middlewares genéricos para `ObjectId`/existencia, y la **regla de los comentarios antiguos resuelta de forma automática y configurable**. Sumaron además el bonus de **caché con Redis** (con invalidación) y configuración de CORS.

Los puntos a completar son de documentación (falta Swagger y la colección de prueba) y un par de ajustes de diseño en torno a los comentarios.

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capas claras + middlewares genéricos y por entidad. |
| Modelado        |   ✅   | Referenciado; `nickname` único; virtual `antiguedadMes`. |
| Validaciones    |   ✅   | Joi (lo recomendado) + validación de `ObjectId`. |
| Middlewares     |   ✅   | `validateObjectId(Model, campo)` y `validateSchema` genéricos. |
| API REST        |   ✅   | CRUD + relaciones; caché con invalidación. |
| Configuración   |   ⚠️   | Todo por `.env`, pero sin `.env.example` (Obs. 3). |
| Documentación   |   ❌   | Falta Swagger y colección de prueba (Obs. 1). |

---

## Fortalezas

### 1. Regla de comentarios antiguos automática y configurable ⏳
**Ubicación:** `src/controllers/commentController.js`, `src/models/Comment.js`

El comentario tiene un virtual `antiguedadMes` (bien calculado con aritmética de meses) y al listar los comentarios de un post se filtra por ese valor contra el umbral del entorno:

```js
const limitMonths = parseInt(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
const filteredComments = comments.filter(c => c.antiguedadMes < limitMonths);
```

Es **automático** (no depende de ningún paso manual) y **configurable**. 🎯

### 2. Middlewares genéricos con validación de `ObjectId` ♻️
**Ubicación:** `src/middlewares/generic.middleware.js`

`validateObjectId(Model, paramName)` valida el formato del id **y** la existencia para cualquier modelo, y `validateSchema(Schema)` aplica Joi de forma genérica. Es el patrón que la materia valora.

### 3. Modelado referenciado y validación con Joi 🗃️🛡️
**Ubicación:** `src/models/`, `src/schemas/`

Entidades separadas con referencias (`user`, `post`, `tags`), `nickname` único, y validación de los cuerpos con **Joi** (lo recomendado, porque corta el dato inválido antes de tocar Mongo).

### 4. Caché con Redis e invalidación 🚀
**Ubicación:** `src/middlewares/cache.middleware.js`, `src/controllers/postController.js`

Cachean las lecturas de posts y las invalidan en cada cambio (`invalidatePostsCache`). Bonus bien resuelto.

---

## Observaciones

### 1. Falta la documentación de la API y la colección de prueba

**Estado:** ❌  **Severidad:** 🟠 Importante
**Ubicación:** raíz del proyecto

**Descripción:**
El enunciado pide **Swagger (YAML)** documentando los endpoints y una **colección de prueba** (Postman o JSON). No encontramos ninguno de los dos en la entrega.

**Impacto:**
Son entregables explícitos del TP; sin ellos, quien quiera probar la API tiene que deducir las rutas leyendo el código.

**Recomendación:**
Agregar un `swagger.yaml` (servido con `swagger-ui-express`) y exportar una colección de Postman con ejemplos de cada endpoint.

---

### 2. Los posts no incluyen sus comentarios, y el flag `visible` quedó redundante

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** `src/controllers/postController.js`, `src/controllers/commentController.js`

**Descripción:**
`getPosts` / `getOnePostByUser` traen el post con `user` y `tags`, pero **no** incluyen los comentarios; para verlos hay que llamar al endpoint de comentarios. Además, conviven el filtro automático por `antiguedadMes` (correcto) con un flag `visible` y un endpoint manual `updateVisibilityByMonth` que terminan siendo redundantes.

**Impacto:**
La regla funciona, pero la “visualización del post con sus comentarios visibles” queda en dos llamadas, y el mecanismo manual agrega complejidad que el filtro automático ya cubre.

**Recomendación:**
Incluir los comentarios (ya filtrados por antigüedad) al traer el detalle del post —por ejemplo con un `populate` y `match`, o reusando el filtro existente— y simplificar quitando el flag/endpoint manual de visibilidad.

---

### 3. No hay `.env.example` que documente las variables

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** raíz del proyecto

**Descripción:**
La configuración se toma correctamente del entorno (`MONGO_URL`, `PORT`, `COMMENT_VISIBILITY_MONTHS`, `REDIS_URL`, etc.), pero no se incluye un `.env.example` con esas claves.

**Impacto:**
Quien clone el proyecto no sabe qué variables definir para levantarlo.

**Recomendación:**
Agregar un `.env.example` con todas las variables y un breve apartado en el README para la puesta en marcha.

---

## Conclusión

Es una entrega sólida: modelado referenciado, validación con Joi, middlewares genéricos con verificación de `ObjectId`, la regla de negocio resuelta de forma automática y configurable, y caché con Redis. 🌟

Lo principal para redondearla es sumar la documentación (Swagger + colección) e incluir los comentarios al ver el post. Son ajustes acotados sobre una buena base. ¡Felicitaciones por el trabajo del equipo! 🚀
