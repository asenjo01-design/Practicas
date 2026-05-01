# 🎁 Funcionalidad de Códigos de Premio

## Descripción
Se ha agregado un sistema de códigos promocionales que permite a los usuarios ingresar códigos especiales para ganar premios.

## Ubicación
- **Botón "Premios"**: Ubicado en el header, al lado izquierdo del carrito de compras
- **Color**: Gradiente amarillo-naranja (🟡🟠)
- **Icono**: Regalo/Premio

## ¿Cómo funciona?

### 1. Acceso al Panel
- El usuario hace clic en el botón "Premios" en el header
- Se abre un modal con un formulario para ingresar códigos

### 2. Códigos Válidos
Los códigos promocionales válidos son:
- **FELIZCUMPLE** ✅
- **EXTRA** ✅

**Nota:** Los códigos NO son sensibles a mayúsculas/minúsculas. El sistema convierte automáticamente a mayúsculas.

### 3. Validación
- Si el código es válido: Muestra mensaje de felicitaciones con SweetAlert2 🎉
- Si el código es inválido: Muestra mensaje de error ❌

### 4. Mensaje de Éxito
Cuando el código es válido, se muestra:
```
¡Felicitaciones!
🎉 ¡Has ganado un premio! 🎉
Código: [CÓDIGO_INGRESADO]
Te contactaremos pronto para hacerte entrega de tu premio.
```

## Características Técnicas

### Estados React
```tsx
const [showPromoPanel, setShowPromoPanel] = useState(false);
const [promoCode, setPromoCode] = useState('');
```

### Función de Validación
```tsx
handlePromoCodeSubmit(e: React.FormEvent)
```
- Convierte el código a mayúsculas
- Elimina espacios en blanco
- Compara con códigos válidos
- Muestra mensaje correspondiente

### Estilos
- **Panel**: Modal centrado, fondo blanco, sombra
- **Header**: Gradiente amarillo-naranja
- **Botón**: Efecto hover con escala y sombra
- **Input**: Borde resaltado, texto centrado en mayúsculas

## Agregar Nuevos Códigos

Para agregar más códigos promocionales, edita la función `handlePromoCodeSubmit` en `App.tsx`:

```tsx
if (upperCode === 'FELIZCUMPLE' || upperCode === 'EXTRA' || upperCode === 'NUEVOCODIGO') {
  // Mensaje de éxito
}
```

## Personalización

### Cambiar Colores del Botón
Busca en el header:
```tsx
className="... from-yellow-500 to-orange-500 ..."
```

### Modificar Mensaje de Éxito
Edita el contenido HTML dentro de `Swal.fire()` en la función `handlePromoCodeSubmit`.

### Cambiar Icono
Reemplaza el SVG path en el botón del header o en el panel.

## Integración con SweetAlert2

La funcionalidad utiliza SweetAlert2 para mostrar mensajes elegantes:
- ✅ Mensajes de éxito con icono verde
- ❌ Mensajes de error con icono rojo
- Animaciones suaves
- Diseño consistente con la aplicación

## Notas Importantes

⚠️ **Recordatorio sobre SweetAlert2:**
Si ves el error `Failed to resolve import "sweetalert2"`, reinicia el servidor de desarrollo:
```bash
rm -rf node_modules/.vite
pnpm run dev
```

Consulta `SOLUCION_SWEETALERT2.md` para más detalles.

## Capturas de Funcionalidad

1. **Botón en Header**: Botón amarillo-naranja "Premios" junto al carrito
2. **Panel de Códigos**: Modal con formulario de ingreso
3. **Mensaje de Éxito**: SweetAlert2 con animación de celebración
4. **Mensaje de Error**: SweetAlert2 indicando código inválido

---

¡La funcionalidad está lista para usar! 🎉
