# ⚽ Álbum Panini Mundial 2026

## 📖 Descripción

Nueva sección agregada a la aplicación que permite llevar el control de tu colección de estampillas del Álbum Panini Mundial 2026.

---

## 🎯 Características

### ✅ Sistema de Usuario
- **Login con nombre de usuario** (sin contraseña)
- Cada usuario tiene su propio progreso
- Los datos se guardan automáticamente en Firebase
- Puedes cerrar sesión y volver cuando quieras

### 🔍 Filtros Avanzados
Filtra las estampillas por:
- **Número:** Busca una estampilla específica (ej: "23")
- **Sección:** Introducción, Grupo A, Grupo B, Grupo C, etc.
- **País:** México, Argentina, Brasil, Francia, etc.
- **Grupo:** A, B, C, D (grupos del mundial)

### 📊 Seguimiento de Progreso
- Barra de progreso visual
- Contador: "X / Total" estampillas
- Porcentaje completado

### ✅ Selección de Estampillas
- **Click para seleccionar** una estampilla
- Las estampillas seleccionadas muestran un ✓ verde
- **Confirmación al deseleccionar** (para evitar errores)
- Guardado automático en Firebase

### 🎨 Tipos de Estampillas
Cada tipo tiene su color distintivo:
- 🛡️ **Escudo** (rojo-naranja)
- 👥 **Equipo** (azul-cyan)
- ⚽ **Jugador** (morado-rosa)
- 🏟️ **Estadio** (verde-teal)
- 🏆 **Especial** (amarillo-naranja)

---

## 📱 Cómo usar

### 1️⃣ Acceder al Álbum
1. En el header principal, haz clic en el botón **"Álbum ⚽"** (verde-azul)
2. Se abrirá la interfaz del álbum

### 2️⃣ Iniciar Sesión
1. Ingresa tu nombre de usuario
2. Si es la primera vez, se creará un álbum nuevo
3. Si ya tienes un álbum, se cargará tu progreso

### 3️⃣ Coleccionar Estampillas
1. Navega por las estampillas o usa los filtros
2. Haz **click en una estampilla** para marcarla como coleccionada
3. Verás un ✓ verde en la esquina superior derecha
4. El progreso se guarda automáticamente

### 4️⃣ Deseleccionar
1. Haz click en una estampilla ya seleccionada
2. Aparecerá un mensaje de confirmación
3. Confirma si realmente quieres deseleccionarla

### 5️⃣ Filtrar
Usa los filtros para encontrar estampillas específicas:
- **Número:** Escribe "23" para ver solo la #23
- **Sección:** Selecciona "Grupo A" para ver solo ese grupo
- **País:** Selecciona "México" para ver solo estampillas de México
- **Grupo:** Selecciona "A" para ver todos los equipos del Grupo A

### 6️⃣ Volver
- Haz clic en el botón **"← Volver"** (arriba a la izquierda)
- Regresarás a la página principal
- Tu progreso está guardado

---

## 🗂️ Estructura de Datos

### Estampillas incluidas (87 total)

#### Introducción (2)
- 00: Logo Mundial 2026
- 0: Copa del Mundo

#### Grupo A (20 estampillas)
- **México:** Escudo, Equipo, 3 Jugadores
- **Uruguay:** Escudo, Equipo, 3 Jugadores  
- **Francia:** Escudo, Equipo, 3 Jugadores
- **Senegal:** Escudo, Equipo, 3 Jugadores

#### Grupo B (20 estampillas)
- **Argentina:** Escudo, Equipo, 3 Jugadores
- **España:** Escudo, Equipo, 3 Jugadores
- **Marruecos:** Escudo, Equipo, 3 Jugadores
- **Croacia:** Escudo, Equipo, 3 Jugadores

#### Grupo C (20 estampillas)
- **Brasil:** Escudo, Equipo, 3 Jugadores
- **Inglaterra:** Escudo, Equipo, 3 Jugadores
- **Serbia:** Escudo, Equipo, 3 Jugadores
- **Japón:** Escudo, Equipo, 3 Jugadores

#### Grupo D (20 estampillas)
- **Portugal:** Escudo, Equipo, 3 Jugadores
- **Alemania:** Escudo, Equipo, 3 Jugadores
- **USA:** Escudo, Equipo, 3 Jugadores
- **Ecuador:** Escudo, Equipo, 3 Jugadores

#### Estadios (5)
- Estadio Azteca - México
- MetLife Stadium - USA
- BC Place - Canadá
- SoFi Stadium - USA
- AT&T Stadium - USA

---

## 🔧 Archivos Técnicos

### Componentes
- `src/app/components/StickerAlbum.tsx` - Componente principal del álbum

### Datos
- `src/app/data/stickers.ts` - Base de datos de estampillas

### Firebase
- `src/app/firebase/config.ts` - Configuración de Firebase
- **Colección Firestore:** `stickerAlbums`
- **Estructura del documento:**
  ```javascript
  {
    userName: "string",
    collected: [1, 5, 23, 45, ...],  // IDs de estampillas
    lastUpdated: "2026-05-23T..."
  }
  ```

---

## 🎨 Diseño

### Colores
- **Header:** Gradiente verde-azul
- **Barra de progreso:** Verde-azul
- **Escudos:** Rojo-naranja
- **Equipos:** Azul-cyan
- **Jugadores:** Morado-rosa
- **Estadios:** Verde-teal
- **Especiales:** Amarillo-naranja

### Responsive
- ✅ Móvil: 2 columnas
- ✅ Tablet: 3-4 columnas
- ✅ Desktop: 5-6 columnas

---

## 📌 Datos Guardados

### LocalStorage
- `stickerAlbumUser` - Nombre del usuario (para login automático)

### Firebase Firestore
- **Colección:** `stickerAlbums`
- **Documento:** Nombre de usuario
- **Campos:**
  - `userName`: Nombre del usuario
  - `collected`: Array de IDs de estampillas coleccionadas
  - `lastUpdated`: Timestamp de última actualización

---

## 🚀 Próximas Mejoras (Opcionales)

1. **Más grupos:** Agregar Grupos E, F, G, H (completar los 48 equipos)
2. **Estadísticas:** Gráficos de progreso por grupo/país
3. **Compartir:** Generar enlace para compartir tu progreso
4. **Intercambio:** Sistema para marcar estampillas "repetidas"
5. **Modo offline:** Funcionar sin internet y sincronizar después
6. **Imágenes reales:** Agregar imágenes de las estampillas reales

---

## 🐛 Solución de Problemas

### No se guardan mis estampillas
1. Verifica que Firebase esté configurado correctamente
2. Revisa `CONFIGURACION_FIREBASE.md`
3. Abre la consola del navegador (F12) y busca errores

### No puedo iniciar sesión
- Simplemente ingresa cualquier nombre (no necesita contraseña)
- El nombre distingue mayúsculas/minúsculas
- Usa el mismo nombre para recuperar tu progreso

### Los filtros no funcionan
- Haz clic en "Limpiar filtros" y vuelve a intentar
- Recarga la página

### Error de Firebase
- Asegúrate de haber configurado Firebase correctamente
- Consulta `CONFIGURACION_FIREBASE.md`
- Verifica tu conexión a internet

---

## 💾 Respaldo Manual

Si quieres hacer respaldo de tu progreso:

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Application" → "Local Storage"
3. Copia el valor de `stickerAlbumUser`
4. En Firebase Console, exporta los datos de Firestore

---

## 📊 Estadísticas del Álbum

- **Total de estampillas:** 87
- **Países incluidos:** 16
- **Grupos:** 4 (A, B, C, D)
- **Estadios:** 5
- **Tipos de estampillas:** 5

---

¡Disfruta coleccionando tus estampillas del Mundial 2026! ⚽🏆
