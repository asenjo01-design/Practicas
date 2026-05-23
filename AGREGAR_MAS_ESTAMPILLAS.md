# 📝 Cómo agregar más estampillas

Si quieres agregar más estampillas al álbum, sigue estos pasos:

---

## 📍 Ubicación del archivo

El archivo con las estampillas está en:
```
src/app/data/stickers.ts
```

---

## ✏️ Formato de una estampilla

Cada estampilla tiene este formato:

```typescript
{
  id: number,              // ID único (incrementar desde el último)
  number: string,          // Número de la estampilla (ej: "86", "FWC1")
  section: string,         // Sección (ej: "Grupo E", "Estadios")
  country: string,         // País (ej: "Italia", "Mundial")
  group: string,           // Grupo (ej: "E", "") - vacío si no aplica
  type: 'escudo' | 'equipo' | 'jugador' | 'estadio' | 'especial',
  description: string      // Descripción (ej: "Escudo Italia", "Gianluigi Donnarumma")
}
```

---

## 📋 Ejemplo: Agregar Grupo E

Abre `src/app/data/stickers.ts` y agrega al final del array `stickersData`:

```typescript
  // Grupo E
  { id: 88, number: '86', section: 'Grupo E', country: 'Italia', group: 'E', type: 'escudo', description: 'Escudo Italia' },
  { id: 89, number: '87', section: 'Grupo E', country: 'Italia', group: 'E', type: 'equipo', description: 'Equipo Italia' },
  { id: 90, number: '88', section: 'Grupo E', country: 'Italia', group: 'E', type: 'jugador', description: 'Gianluigi Donnarumma' },
  { id: 91, number: '89', section: 'Grupo E', country: 'Italia', group: 'E', type: 'jugador', description: 'Federico Chiesa' },
  { id: 92, number: '90', section: 'Grupo E', country: 'Italia', group: 'E', type: 'jugador', description: 'Nicolò Barella' },

  { id: 93, number: '91', section: 'Grupo E', country: 'Países Bajos', group: 'E', type: 'escudo', description: 'Escudo Países Bajos' },
  { id: 94, number: '92', section: 'Grupo E', country: 'Países Bajos', group: 'E', type: 'equipo', description: 'Equipo Países Bajos' },
  { id: 95, number: '93', section: 'Grupo E', country: 'Países Bajos', group: 'E', type: 'jugador', description: 'Virgil van Dijk' },
  { id: 96, number: '94', section: 'Grupo E', country: 'Países Bajos', group: 'E', type: 'jugador', description: 'Frenkie de Jong' },
  { id: 97, number: '95', section: 'Grupo E', country: 'Países Bajos', group: 'E', type: 'jugador', description: 'Cody Gakpo' },

  // ... continuar con otros equipos del Grupo E
```

---

## 🎯 Ejemplo: Agregar Estampillas Especiales

```typescript
  // Especiales
  { id: 200, number: 'FWC1', section: 'Especiales', country: 'Mundial', group: '', type: 'especial', description: 'Mascota Oficial' },
  { id: 201, number: 'FWC2', section: 'Especiales', country: 'Mundial', group: '', type: 'especial', description: 'Balón Oficial' },
  { id: 202, number: 'FWC3', section: 'Especiales', country: 'Mundial', group: '', type: 'especial', description: 'Póster Oficial' },
```

---

## 🏟️ Ejemplo: Agregar Estadios

```typescript
  // Estadios
  { id: 300, number: 'ST1', section: 'Estadios', country: 'Mundial', group: '', type: 'estadio', description: 'Rose Bowl - USA' },
  { id: 301, number: 'ST2', section: 'Estadios', country: 'Mundial', group: '', type: 'estadio', description: 'Estadio BBVA - México' },
  { id: 302, number: 'ST3', section: 'Estadios', country: 'Mundial', group: '', type: 'estadio', description: 'BMO Field - Canadá' },
```

---

## ⚠️ Reglas Importantes

### 1. IDs únicos
- **Cada estampilla DEBE tener un ID único**
- Empieza desde el último ID + 1
- Ejemplo: Si el último es 87, el siguiente es 88

### 2. Números de estampilla
- Pueden ser numéricos: `"1"`, `"23"`, `"456"`
- O alfanuméricos: `"FWC1"`, `"ST2"`, `"A1"`
- Deben ser únicos (no repetir números)

### 3. Secciones
- Mantén consistencia en los nombres
- Ejemplos: `"Grupo A"`, `"Grupo B"`, `"Estadios"`, `"Especiales"`

### 4. Grupos
- Solo para equipos que pertenecen a un grupo
- Valores válidos: `"A"`, `"B"`, `"C"`, `"D"`, `"E"`, `"F"`, `"G"`, `"H"`
- Para estadios y especiales: `""` (vacío)

### 5. Tipos
- Solo usa estos valores:
  - `'escudo'` - Escudos de equipos
  - `'equipo'` - Fotos de equipo completo
  - `'jugador'` - Jugadores individuales
  - `'estadio'` - Estadios
  - `'especial'` - Estampillas especiales (logo, mascota, etc.)

---

## 📐 Plantilla para Equipo Completo

Copia y pega esto para agregar un equipo completo (5 estampillas):

```typescript
  // Grupo X - País
  { id: XXX, number: 'YYY', section: 'Grupo X', country: 'NombrePaís', group: 'X', type: 'escudo', description: 'Escudo NombrePaís' },
  { id: XXX, number: 'YYY', section: 'Grupo X', country: 'NombrePaís', group: 'X', type: 'equipo', description: 'Equipo NombrePaís' },
  { id: XXX, number: 'YYY', section: 'Grupo X', country: 'NombrePaís', group: 'X', type: 'jugador', description: 'Nombre Jugador 1' },
  { id: XXX, number: 'YYY', section: 'Grupo X', country: 'NombrePaís', group: 'X', type: 'jugador', description: 'Nombre Jugador 2' },
  { id: XXX, number: 'YYY', section: 'Grupo X', country: 'NombrePaís', group: 'X', type: 'jugador', description: 'Nombre Jugador 3' },
```

**Reemplaza:**
- `XXX` con IDs consecutivos
- `YYY` con números consecutivos
- `X` con la letra del grupo
- `NombrePaís` con el nombre del país
- `Nombre Jugador 1, 2, 3` con nombres reales

---

## 🔄 Después de agregar estampillas

1. **Guarda el archivo** `stickers.ts`

2. **El navegador recargará automáticamente** (si tienes el servidor corriendo)

3. **Las nuevas estampillas aparecerán** en el álbum

4. **Los usuarios existentes** verán las nuevas estampillas

---

## 💡 Consejos

### Para un Mundial completo (48 equipos)

Un álbum completo tendría aproximadamente:
- **2** Estampillas de introducción
- **240** Estampillas de equipos (48 equipos × 5 estampillas)
- **10-20** Estadios
- **10-20** Especiales
- **Total: ~280-300 estampillas**

### Organización recomendada

```typescript
// Introducción (00-0)
// Grupo A (1-20)
// Grupo B (21-40)
// Grupo C (41-60)
// Grupo D (61-80)
// Grupo E (81-100)
// Grupo F (101-120)
// Grupo G (121-140)
// Grupo H (141-160)
// Estadios (161-180)
// Especiales (FWC1-FWC20)
```

---

## 🧪 Probar los cambios

1. Abre el álbum
2. Ve a los filtros
3. Selecciona la nueva sección/grupo
4. Verifica que aparezcan las nuevas estampillas
5. Prueba seleccionar y deseleccionar

---

## 📊 Ejemplo Completo: Agregar 2 Equipos

```typescript
  // Grupo E
  { id: 88, number: '86', section: 'Grupo E', country: 'Italia', group: 'E', type: 'escudo', description: 'Escudo Italia' },
  { id: 89, number: '87', section: 'Grupo E', country: 'Italia', group: 'E', type: 'equipo', description: 'Equipo Italia' },
  { id: 90, number: '88', section: 'Grupo E', country: 'Italia', group: 'E', type: 'jugador', description: 'Gianluigi Donnarumma' },
  { id: 91, number: '89', section: 'Grupo E', country: 'Italia', group: 'E', type: 'jugador', description: 'Federico Chiesa' },
  { id: 92, number: '90', section: 'Grupo E', country: 'Italia', group: 'E', type: 'jugador', description: 'Nicolò Barella' },

  { id: 93, number: '91', section: 'Grupo E', country: 'Bélgica', group: 'E', type: 'escudo', description: 'Escudo Bélgica' },
  { id: 94, number: '92', section: 'Grupo E', country: 'Bélgica', group: 'E', type: 'equipo', description: 'Equipo Bélgica' },
  { id: 95, number: '93', section: 'Grupo E', country: 'Bélgica', group: 'E', type: 'jugador', description: 'Kevin De Bruyne' },
  { id: 96, number: '94', section: 'Grupo E', country: 'Bélgica', group: 'E', type: 'jugador', description: 'Romelu Lukaku' },
  { id: 97, number: '95', section: 'Grupo E', country: 'Bélgica', group: 'E', type: 'jugador', description: 'Thibaut Courtois' },
```

---

¡Listo! Ahora puedes personalizar tu álbum con todas las estampillas que quieras. ⚽
