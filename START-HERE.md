# 🚀 CÓMO CORRER CHECKBRICE EN TU MAC

## Paso 1: Abre la Terminal en Mac

Presiona `Cmd + Space` y escribe "Terminal"

---

## Paso 2: Ve a la carpeta del proyecto

```bash
# Si clonaste con git, probablemente está aquí:
cd ~/Desktop/Prediction-Marketcopy

# O puede estar en:
cd ~/Downloads/Prediction-Marketcopy
```

**¿No sabes dónde está?** Corre esto:
```bash
find ~ -name "Prediction-Marketcopy" 2>/dev/null
```

---

## Paso 3: Verifica que estás en el lugar correcto

```bash
ls
```

Deberías ver: `backend`, `frontend`, `contracts`

---

## Paso 4A: Opción FÁCIL (un solo comando)

```bash
./start-local.sh
```

Esto instalará todo y arrancará backend + frontend automáticamente.

---

## Paso 4B: Opción MANUAL (si prefieres control)

### Terminal 1 - Backend:
```bash
cd backend
npm install --legacy-peer-deps
npm run dev
```

### Terminal 2 - Frontend (abre OTRA ventana de terminal):
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

---

## Paso 5: Abre tu navegador

Ve a: **http://localhost:3000**

---

## 🐛 Si tienes errores:

### "Missing script: dev"
Significa que no estás en la carpeta correcta. Asegúrate de estar en `backend/` o `frontend/`

### "command not found: npm"
Necesitas instalar Node.js primero: https://nodejs.org/

### "Port already in use"
Cierra cualquier app que esté usando el puerto 3000 o 5000

---

## ✅ ¿Funcionó?

Deberías ver una página con:
- Fondo azul oscuro (navy)
- Título "CheckBrice" en naranja
- Tarjetas de mercados de Bitcoin

---

## 📞 ¿Necesitas ayuda?

1. Captura pantalla del error
2. Copia el mensaje exacto
3. Compártelo conmigo

¡Listo! 🎉
