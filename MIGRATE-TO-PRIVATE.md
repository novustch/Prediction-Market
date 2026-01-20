# 🔐 Migrar a Repositorio Privado

## ⚠️ Problema
GitHub no permite hacer privados los repositorios que son forks (copias de otros repos).

## ✅ Solución
Crear un **repositorio completamente nuevo y privado** desde cero.

---

## 📋 PASOS (10 minutos)

### **PASO 1: Crear nuevo repositorio en GitHub** ⭐

1. **Ve a:** https://github.com/new

2. **Llena así:**
   ```
   Repository name: checkbrice
   Description: Simple Bitcoin prediction markets on Solana

   ✅ Marcar: Private
   ❌ NO marcar: Add a README file
   ❌ NO marcar: Add .gitignore
   ❌ NO marcar: Choose a license
   ```

3. **Click:** "Create repository"

4. **NO copies los comandos que GitHub te muestra** (aún)

---

### **PASO 2: Ejecutar script de migración** 🚀

El script automático hará todo por ti.

**En tu terminal (en tu Mac):**

```bash
# 1. Ir a la carpeta del proyecto
cd ~/Desktop/Prediction-Marketcopy
# (o donde tengas el proyecto)

# 2. Descargar los últimos cambios
git pull origin claude/solana-prediction-market-WyLPy

# 3. Ejecutar el script de migración
./migrate-to-new-repo.sh
```

El script te preguntará:
1. ✅ Confirmar que creaste el repo en GitHub
2. ✅ Tu nombre de usuario de GitHub
3. ✅ Luego migrará todo automáticamente

---

### **PASO 3: Verificar que funcionó** ✅

1. Ve a: `https://github.com/TU-USUARIO/checkbrice`
2. Deberías ver:
   - ✅ Todo tu código
   - ✅ Todos los commits
   - ✅ Un candado 🔒 (indica que es privado)

---

## 🎯 ¿Qué hace el script?

1. ✅ Guarda todos tus cambios actuales
2. ✅ Cambia el "remote" (destino) del git
3. ✅ Sube todo el código al nuevo repositorio privado
4. ✅ Mantiene todo el historial de commits
5. ✅ Conserva todas las ramas

---

## 🔄 Alternativa Manual (si el script no funciona)

Si prefieres hacerlo manual:

```bash
# 1. Guardar cambios
git add -A
git commit -m "Preparar migración"

# 2. Renombrar remote viejo
git remote rename origin old-origin

# 3. Agregar nuevo remote (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/checkbrice.git

# 4. Push al nuevo repo
git push -u origin claude/solana-prediction-market-WyLPy

# 5. Push todas las ramas (opcional)
git push -u origin --all
```

---

## 🚀 Después de migrar

Una vez que el código esté en el **nuevo repositorio privado**:

1. ✅ El viejo fork se puede eliminar (opcional)
2. ✅ Continuar con el deploy a Vercel usando el **nuevo repo**
3. ✅ Todos los futuros cambios van al nuevo repo

---

## ❓ FAQ

**P: ¿Perderé mi código?**
R: No, todo se copia al nuevo repo.

**P: ¿Se pierde el historial?**
R: No, todos los commits se conservan.

**P: ¿Qué pasa con el viejo fork?**
R: Sigue ahí, puedes eliminarlo después si quieres.

**P: ¿Tendré que cambiar algo en Vercel?**
R: Sí, seleccionarás el nuevo repo `checkbrice` en vez del viejo.

---

## ✅ Checklist

- [ ] Nuevo repositorio `checkbrice` creado en GitHub
- [ ] Repositorio marcado como **Private** 🔒
- [ ] Script de migración ejecutado
- [ ] Código visible en `github.com/TU-USUARIO/checkbrice`
- [ ] Candado 🔒 visible en el repo (confirma que es privado)

---

## 💬 ¿Listo?

Cuando hayas completado los 3 pasos, avísame:

```
✅ Nuevo repo creado: github.com/TU-USUARIO/checkbrice
✅ Es privado (tiene candado)
✅ Código migrado exitosamente
```

Y continuamos con el deploy a checkbrice.com 🚀
