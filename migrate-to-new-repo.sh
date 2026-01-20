#!/bin/bash

echo "🚀 Migrando CheckBrice a nuevo repositorio privado..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Paso 1: Verificando que estamos en el directorio correcto...${NC}"
if [ ! -d ".git" ]; then
    echo "❌ Error: No estás en un repositorio git"
    exit 1
fi
echo -e "${GREEN}✓ Directorio correcto${NC}"
echo ""

echo -e "${BLUE}Paso 2: Guardando cambios actuales...${NC}"
git add -A
git commit -m "feat: preparar para migración a repositorio privado" || echo "No hay cambios nuevos"
echo -e "${GREEN}✓ Cambios guardados${NC}"
echo ""

echo -e "${YELLOW}Paso 3: Ahora necesitas crear el nuevo repositorio en GitHub${NC}"
echo ""
echo "Ve a: https://github.com/new"
echo ""
echo "Configúralo así:"
echo "  - Repository name: checkbrice"
echo "  - Private: ✅ SÍ"
echo "  - NO agregues README, .gitignore, ni license"
echo ""
read -p "Presiona ENTER cuando hayas creado el repositorio en GitHub..."
echo ""

echo -e "${BLUE}Paso 4: ¿Cuál es tu nombre de usuario de GitHub?${NC}"
read -p "Usuario de GitHub: " GITHUB_USER
echo ""

NEW_REPO_URL="https://github.com/${GITHUB_USER}/checkbrice.git"

echo -e "${BLUE}Paso 5: Cambiando remote a nuevo repositorio...${NC}"
echo "Nuevo repositorio: ${NEW_REPO_URL}"
echo ""

# Rename old remote
git remote rename origin old-origin

# Add new remote
git remote add origin ${NEW_REPO_URL}

echo -e "${GREEN}✓ Remote actualizado${NC}"
echo ""

echo -e "${BLUE}Paso 6: Pusheando código al nuevo repositorio privado...${NC}"
git push -u origin claude/solana-prediction-market-WyLPy

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ ¡Migración completada exitosamente!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Tu nuevo repositorio privado está en:"
echo "  ${NEW_REPO_URL}"
echo ""
echo "Próximos pasos:"
echo "  1. Ve a https://github.com/${GITHUB_USER}/checkbrice"
echo "  2. Verifica que el código esté ahí"
echo "  3. Continúa con el deploy a Vercel"
echo ""
