# 🎨 Guía de Colores - Vexum MX

Este documento explica **de dónde vienen todos los colores** utilizados en la página y **cómo modificarlos**.

---

## 📍 Ubicación Principal de Colores

### 1. **Variables CSS en `globals.css`** (Líneas 8-38)

Archivo: `/workspace/src/app/globals.css`

```css
:root {
  /* Colors - Neon Palette */
  --neon-primary: #D946EF;      /* Púrpura principal */
  --neon-secondary: #f9168f;    /* Naranja rosado secundario */
  
  /* Dark Backgrounds */
  --dark-900: #05050A;          /* Fondo principal (negro espacial) */
  --dark-800: #0a0a0f;
  --dark-700: #1a1a25;
  --dark-600: #252532;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, var(--neon-primary), var(--neon-secondary));
  --gradient-secondary: linear-gradient(135deg, var(--neon-secondary), var(--neon-primary));
  
  /* Shadows con glow neón */
  --shadow-neon-primary: 0 0 10px rgba(217, 70, 239, 0.5), 0 0 20px rgba(217, 70, 239, 0.3);
}
```

**✅ Para cambiar los colores principales del sitio, modifica estas variables.**

---

### 2. **Tailwind Config - `tailwind.config.ts`** (Líneas 14-30)

Archivo: `/workspace/tailwind.config.ts`

```typescript
colors: {
  neon: {
    primary: '#D946EF',      // Debe coincidir con --neon-primary
    secondary: '#F97316',    // ⚠️ ¡CUIDADO! Este es diferente al de globals.css
    blue: '#00f3ff',
    purple: '#bc13fe',
    pink: '#ff00ff',
    green: '#00ff87',
    yellow: '#ffe600',
    orange: '#ff5e00',
  },
  dark: {
    900: '#05050A',
    800: '#0a0a0f',
    700: '#1a1a25',
    600: '#252532',
  },
}
```

**⚠️ IMPORTANTE:** Hay una **inconsistencia** entre `globals.css` y `tailwind.config.ts`:
- `globals.css`: `--neon-secondary: #f9168f` (rosa intenso)
- `tailwind.config.ts`: `neon.secondary: '#F97316'` (naranja)

**🔧 Solución:** Unifica ambos archivos usando el mismo valor.

---

## 🗺️ Mapa de Uso de Colores por Componente

### **Navbar** (`/workspace/src/components/layout/Navbar.tsx`)

| Elemento | Clase/Color | Origen |
|----------|-------------|--------|
| Fondo glass | `bg-dark-900/60` + blur | tailwind.config + inline style |
| Borde inferior | `rgba(255, 255, 255, 0.1)` | Inline style |
| Texto links | `text-gray-300` → `hover:text-neon-primary` | Tailwind + CSS vars |
| Logo gradient | `from-neon-primary to-neon-secondary` | Tailwind config |
| Hover underline | `bg-gradient-to-r from-neon-primary to-neon-secondary` | Tailwind config |

---

### **Hero Section / Icosaedro** (`/workspace/src/app/page.tsx`)

| Elemento | Clase/Color | Origen |
|----------|-------------|--------|
| Background gradient | `from-neon-primary/10 via-purple-500/10 to-neon-secondary/10` | Tailwind |
| Blur orbs | `bg-neon-primary/20`, `bg-neon-secondary/20` | Tailwind config |
| Título gradient | `from-neon-primary via-purple-500 to-neon-secondary` | Tailwind |
| Botón primario | `btn-neon-filled` (usa `--gradient-primary`) | globals.css línea 217 |
| Botón secundario | `bg-slate-800/50` + `border-neon-primary/30` | Tailwind + CSS vars |

---

### **Icosaedro 3D** (`/workspace/src/components/ui/GlassIcosahedron.tsx`)

| Elemento | Color Hex | Línea |
|----------|-----------|-------|
| Aristas neón | `#D946EF` (neon-primary) | Línea 18, 61 |
| Capa glow media | `#f9168f` | Línea 71 |
| Caras glass | `#1a1a2e` (casi transparente, opacity 0.08) | Línea 31 |
| Core interior | `#D946EF` con opacity 0.4 | Línea 88 |

**🔧 Para cambiar el color del icosaedro**, edita directamente los valores hex en este archivo.

---

### **Testimonios** (`/workspace/src/components/ui/TestimonialCarousel.tsx`)

| Elemento | Clase/Color | Origen |
|----------|-------------|--------|
| Card fondo | `glass-heavy` | globals.css línea 166-171 |
| Borde card central | `border-neon-primary/50` | CSS vars |
| Shadow card central | `shadow-neon-primary` | globals.css línea 25 |
| Avatar border | `border-neon-primary/30` | CSS vars |
| Estrellas | `text-yellow-400` | Tailwind default |
| Dots navegación | `bg-neon-primary` / `bg-gray-600` | Tailwind config |

---

### **Servicios Carousel** (`/workspace/src/components/ui/ServiceCarousel.tsx`)

*(Revisar archivo para detalles específicos)*

---

### **About Section** (`/workspace/src/app/page.tsx` líneas 100-162)

| Elemento | Clase/Color | Origen |
|----------|-------------|--------|
| Background section | `bg-slate-900/30` | Tailwind default |
| Stats numbers gradient | `from-neon-primary to-purple-500` | Tailwind |
| Cards glass | `glass-medium` + `border-neon-primary/20` | globals.css línea 159-164 |
| Blur decorativo | `from-neon-primary/20 to-neon-secondary/20` | Tailwind |

---

### **CTA Section** (`/workspace/src/app/page.tsx` líneas 213-232)

| Elemento | Clase/Color | Origen |
|----------|-------------|--------|
| Card fondo | `glass-medium` + `border-neon-primary/20` | globals.css |
| Botón | `btn-neon-filled` | globals.css línea 215-227 |

---

## 🛠️ Cómo Cambiar un Color en Toda la Página

### **Opción A: Cambiar el color primario (púrpura)**

1. **Edita `globals.css`** (línea 10):
   ```css
   --neon-primary: #TU_NUEVO_COLOR;
   ```

2. **Edita `tailwind.config.ts`** (línea 16):
   ```typescript
   neon: {
     primary: '#TU_NUEVO_COLOR',
   }
   ```

3. **Edita el icosaedro** si usa el color hardcoded (líneas 18, 61, 88):
   ```typescript
   color: '#TU_NUEVO_COLOR'
   ```

---

### **Opción B: Cambiar el color secundario (rosa/naranja)**

1. **Edita `globals.css`** (línea 11):
   ```css
   --neon-secondary: #TU_NUEVO_COLOR;
   ```

2. **Edita `tailwind.config.ts`** (línea 17):
   ```typescript
   neon: {
     secondary: '#TU_NUEVO_COLOR',
   }
   ```

3. **Edita el icosaedro** (línea 71):
   ```typescript
   color: "#TU_NUEVO_COLOR"
   ```

---

### **Opción C: Cambiar el fondo oscuro principal**

1. **Edita `globals.css`** (línea 14):
   ```css
   --dark-900: #TU_NUEVO_COLOR;
   ```

2. **Edita `tailwind.config.ts`** (línea 26):
   ```typescript
   dark: {
     900: '#TU_NUEVO_COLOR',
   }
   ```

---

## 🎨 Paleta Actual Completa

| Nombre | Hex | Uso Principal | Archivo |
|--------|-----|---------------|---------|
| Neon Primary | `#D946EF` | Branding, botones, bordes | globals.css:10, tailwind:16 |
| Neon Secondary | `#f9168f` (css) / `#F97316` (tw) | Gradientes, accents | globals.css:11, tailwind:17 |
| Dark 900 | `#05050A` | Fondo principal | globals.css:14, tailwind:26 |
| Dark 800 | `#0a0a0f` | Fondos secundarios | globals.css:15, tailwind:27 |
| Dark 700 | `#1a1a25` | Cards, secciones | globals.css:16, tailwind:28 |
| Dark 600 | `#252532` | Bordes, inputs | globals.css:17, tailwind:29 |
| Purple 500 | `#a855f7` | Gradientes (Tailwind default) | Tailwind default |

---

## ⚠️ Problemas Conocidos

1. **Inconsistencia neon-secondary**: 
   - `globals.css` usa `#f9168f` (rosa)
   - `tailwind.config.ts` usa `#F97316` (naranja)
   - **Solución:** Unificar ambos al mismo valor

2. **Colores hardcoded en componentes 3D**:
   - El icosaedro tiene colores directos en el código
   - **Solución:** Usar variables CSS o props para hacerlo configurable

3. **Glassmorphism classes**:
   - Definidas en `globals.css` pero algunas usan valores inline
   - **Solución:** Migrar todo a clases CSS reutilizables

---

## 📋 Checklist para Cambiar Colores

- [ ] Modificar `--neon-primary` en `globals.css`
- [ ] Modificar `neon.primary` en `tailwind.config.ts`
- [ ] Modificar `--neon-secondary` en `globals.css`
- [ ] Modificar `neon.secondary` en `tailwind.config.ts`
- [ ] Actualizar colores en `GlassIcosahedron.tsx`
- [ ] Revisar que no haya colores hardcoded en otros componentes
- [ ] Probar en modo claro/oscuro si aplica
- [ ] Verificar contraste y accesibilidad

---

## 🔍 Herramientas Útiles

- **Busca en todo el proyecto:** `grep -r "#D946EF" src/` para encontrar usos del color
- **Chrome DevTools:** Inspecciona elementos para ver qué variables CSS se aplican
- **Tailwind IntelliSense:** Extensión de VS Code para ver colores disponibles

---

**Última actualización:** 2025
**Archivos clave:** `globals.css`, `tailwind.config.ts`, `GlassIcosahedron.tsx`
