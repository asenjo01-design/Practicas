# 📘 Configuración de Firebase para el Álbum Mundial 2026

## 🔥 ¿Qué es Firebase?

Firebase es una plataforma de Google que permite guardar datos en la nube de forma gratuita. La usamos para guardar el progreso del álbum de estampillas.

---

## 📋 Pasos para configurar Firebase

### 1️⃣ Crear un proyecto en Firebase

1. Ve a [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Agregar proyecto"**
4. Nombre del proyecto: `album-mundial-2026` (o el que prefieras)
5. Desactiva Google Analytics (no es necesario para este proyecto)
6. Haz clic en **"Crear proyecto"**

---

### 2️⃣ Crear una aplicación web

1. En el panel de Firebase, haz clic en el ícono **</> (Web)**
2. Nombre de la aplicación: `Mi Álbum Mundial`
3. **NO marques** "También configurar Firebase Hosting"
4. Haz clic en **"Registrar app"**

---

### 3️⃣ Copiar la configuración

Verás un código similar a este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "album-mundial-2026.firebaseapp.com",
  projectId: "album-mundial-2026",
  storageBucket: "album-mundial-2026.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**Copia estos valores** (los necesitarás en el siguiente paso)

---

### 4️⃣ Configurar Firestore Database

1. En el menú lateral, ve a **"Compilación" → "Firestore Database"**
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Iniciar en modo de prueba"**
4. Elige la ubicación: **"us-central"** (o la más cercana)
5. Haz clic en **"Habilitar"**

---

### 5️⃣ Configurar reglas de seguridad

1. En Firestore, ve a la pestaña **"Reglas"**
2. Reemplaza las reglas con esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /stickerAlbums/{userId} {
      allow read, write: if true;
    }
  }
}
```

3. Haz clic en **"Publicar"**

⚠️ **Nota:** Estas reglas son para desarrollo. En producción deberías usar autenticación.

---

### 6️⃣ Actualizar el código

Abre el archivo: `src/app/firebase/config.ts`

Reemplaza los valores con los de tu proyecto:

```typescript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",           // ← Reemplaza con tu apiKey
  authDomain: "tu-proyecto.firebaseapp.com",   // ← Reemplaza
  projectId: "tu-proyecto-id",          // ← Reemplaza
  storageBucket: "tu-proyecto.appspot.com",    // ← Reemplaza
  messagingSenderId: "123456789",       // ← Reemplaza
  appId: "tu-app-id"                    // ← Reemplaza
};
```

---

## ✅ Verificar que funciona

1. **Reinicia el servidor de desarrollo:**
   ```bash
   # Detén el servidor (Ctrl+C)
   pnpm run dev
   ```

2. **Abre la aplicación** y haz clic en el botón **"Álbum ⚽"**

3. **Ingresa tu nombre** cuando te lo pida

4. **Selecciona algunas estampillas**

5. **Cierra sesión y vuelve a entrar** con el mismo nombre
   - Deberías ver tus estampillas guardadas ✅

---

## 🔍 Ver los datos en Firebase

1. Ve a Firebase Console
2. Abre **"Firestore Database"**
3. Verás una colección llamada `stickerAlbums`
4. Dentro verás los documentos con los nombres de usuario
5. Cada documento tiene:
   - `userName`: Nombre del usuario
   - `collected`: Array con IDs de estampillas coleccionadas
   - `lastUpdated`: Fecha de última actualización

---

## 🐛 Solución de problemas

### Error: "Failed to get document"
- Verifica que las reglas de Firestore estén configuradas correctamente
- Asegúrate de haber habilitado Firestore Database

### Error: "Firebase: Firebase App named '[DEFAULT]' already exists"
- Recarga la página
- Si persiste, borra la caché del navegador

### No se guardan los cambios
- Verifica tu conexión a internet
- Revisa la consola del navegador (F12) para ver errores
- Verifica que el archivo `config.ts` tenga la configuración correcta

---

## 💡 Consejos

### Múltiples usuarios
- Cada persona puede tener su propio álbum usando nombres diferentes
- Los datos se guardan por nombre de usuario
- No hay límite de usuarios (en el plan gratuito de Firebase)

### Respaldo
- Los datos están en la nube de Firebase
- Puedes exportar los datos desde Firebase Console
- Ve a Firestore Database → Exportar datos

### Modo offline
- Por ahora la app requiere conexión a internet
- En el futuro se puede agregar modo offline con Firebase

---

## 📊 Límites del plan gratuito de Firebase

- **Almacenamiento:** 1 GB (más que suficiente para este proyecto)
- **Lecturas/día:** 50,000 (muchísimas para uso personal)
- **Escrituras/día:** 20,000 (más que suficiente)

No te preocupes por los límites, este proyecto no los alcanzará. 😊

---

## 🆘 ¿Necesitas ayuda?

Si tienes problemas con la configuración:
1. Revisa que todos los pasos estén completos
2. Verifica la consola del navegador (F12) para ver errores
3. Asegúrate de que Firebase esté habilitado correctamente

---

¡Tu álbum ya está listo para funcionar! ⚽🏆
