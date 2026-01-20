# 🚀 Deploy CheckBrice a checkbrice.com

## 📋 Pre-requisitos

1. ✅ Repositorio renombrado a `checkbrice` (o tu nombre elegido)
2. ✅ Repositorio configurado como **privado**
3. ✅ Tienes acceso al DNS de checkbrice.com
4. ✅ Cuenta en Vercel (gratis): https://vercel.com

---

## 🎯 Paso 1: Conectar GitHub con Vercel

1. Ve a: https://vercel.com/new
2. Click en **Continue with GitHub**
3. Autoriza a Vercel
4. Selecciona tu repositorio **checkbrice** (o como lo hayas nombrado)

---

## ⚙️ Paso 2: Configurar el proyecto en Vercel

### Framework Preset:
- Selecciona: **Next.js**

### Root Directory:
- Pon: `frontend`

### Build Command:
```bash
npm install && npm run build
```

### Output Directory:
```bash
.next
```

### Install Command:
```bash
npm install --legacy-peer-deps
```

---

## 🔐 Paso 3: Variables de Entorno

En Vercel, agrega estas variables:

### Frontend Environment Variables:
```
NEXT_PUBLIC_API_URL=https://checkbrice.com/api
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

### Backend Environment Variables (si usas MongoDB):
```
MONGODB_URI=tu_mongodb_connection_string
SOLANA_RPC_URL=https://api.devnet.solana.com
PORT=5000
```

---

## 🌐 Paso 4: Configurar Dominio checkbrice.com

### En Vercel:
1. Una vez deployado, ve a **Settings → Domains**
2. Click en **Add Domain**
3. Escribe: `checkbrice.com`
4. Vercel te dará instrucciones DNS

### En tu proveedor de DNS (donde compraste checkbrice.com):

Agrega estos registros:

**Tipo A:**
```
Name: @
Value: 76.76.21.21
```

**Tipo CNAME:**
```
Name: www
Value: cname.vercel-dns.com
```

**O si te da otra configuración:**
Vercel te mostrará los DNS específicos, síguelos exactamente.

---

## ⚡ Paso 5: Deploy del Backend (API)

Para el backend, tienes 2 opciones:

### Opción A: Vercel Serverless Functions (Recomendado)

El backend ya está configurado para correr como serverless.

### Opción B: Railway / Render (Backend separado)

Si prefieres backend separado:

1. Ve a https://railway.app
2. Click **New Project → Deploy from GitHub**
3. Selecciona tu repo
4. Root directory: `backend`
5. Start command: `npm run dev`
6. Agrega las env variables

---

## 🎉 Paso 6: Verificar Deploy

Una vez que Vercel termine:

1. Ve a: `https://checkbrice.com`
2. Deberías ver la página con:
   - Fondo navy
   - Logo CheckBrice en naranja
   - Mercados de Bitcoin

---

## 🐛 Troubleshooting

### Error: "Module not found"
- Verifica que las rutas en imports sean correctas
- Revisa que `frontend/` sea el root directory

### Error: "API not responding"
- Verifica que las env variables estén configuradas
- Checa los logs en Vercel Dashboard

### Error: "Domain not configured"
- Espera 24-48 hrs para propagación DNS
- Verifica los registros DNS en tu proveedor

---

## 📊 Monitoreo

Una vez live, puedes ver:
- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Deployments → View Logs
- **Performance**: Vercel Speed Insights

---

## 🔄 Actualizaciones Automáticas

Cada vez que hagas `git push`, Vercel desplegará automáticamente:
- ✅ Builds automáticos
- ✅ Preview deployments en PRs
- ✅ Rollback fácil si algo falla

---

## 💰 Costos

- **Vercel Free Tier**: Suficiente para empezar
- **Dominio checkbrice.com**: Ya lo tienes
- **MongoDB Atlas**: Free tier (512MB)
- **Solana RPC**: Usar Helius free tier

**Total: $0/mes** para empezar 🎉

---

## ✅ Checklist Final

- [ ] Repo renombrado y privado
- [ ] Proyecto creado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Dominio checkbrice.com conectado
- [ ] DNS configurado
- [ ] Primera deploy exitosa
- [ ] Sitio accesible en checkbrice.com
- [ ] API funcionando correctamente

---

¡Listo para el mundo! 🚀
